#!/usr/bin/env node
/**
 * Arvana website scanner
 * ------------------------
 * Crawls arvana.gr with a real Chromium browser (via Playwright), collects the
 * category structure, and extracts product names / brands / prices per category.
 * Output is written to ./output/arvana-scan.json and ./output/arvana-scan.md.
 *
 * Works in two setups:
 *   1) Claude cloud session with Network access = Full
 *        PW_CHROMIUM=/opt/pw-browsers/chromium-<ver>/chrome-linux/chrome  (auto-detected)
 *        Uses HTTPS_PROXY automatically if set.
 *   2) Your local machine
 *        npm install && npx playwright install chromium && node scan-arvana.js
 *
 * Usage:
 *   node scan-arvana.js                # scan default site
 *   START_URL=https://arvana.gr node scan-arvana.js
 *   MAX_CATEGORIES=40 MAX_PRODUCTS=30 node scan-arvana.js
 */

const fs = require('fs');
const path = require('path');

// Prefer full "playwright" (bundles its own browser locally); fall back to
// "playwright-core" + an explicit executable path (cloud VM has one pre-installed).
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require('playwright-core')); }

const START_URL = process.env.START_URL || 'https://arvana.gr/';
const MAX_CATEGORIES = parseInt(process.env.MAX_CATEGORIES || '30', 10);
const MAX_PRODUCTS = parseInt(process.env.MAX_PRODUCTS || '20', 10);
const OUT_DIR = path.join(__dirname, 'output');

function findCloudChromium() {
  if (process.env.PW_CHROMIUM) return process.env.PW_CHROMIUM;
  const base = '/opt/pw-browsers';
  try {
    const dir = fs.readdirSync(base).find(d => d.startsWith('chromium-'));
    if (dir) return path.join(base, dir, 'chrome-linux', 'chrome');
  } catch { /* not a cloud VM */ }
  return null; // let Playwright use its own bundled browser
}

async function launch() {
  const executablePath = findCloudChromium();
  // HEADFUL=1 opens a visible window. Strongly recommended when running locally:
  // Cloudflare's "Just a moment..." challenge usually clears on its own for a
  // real, visible browser on a residential IP, but flags headless ones.
  const headful = process.env.HEADFUL === '1';
  const opts = {
    headless: !headful,
    args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'],
  };
  if (executablePath) opts.executablePath = executablePath;
  if (process.env.HTTPS_PROXY) opts.proxy = { server: process.env.HTTPS_PROXY };
  return chromium.launch(opts);
}

// Waits out a Cloudflare / "Just a moment..." interstitial. Returns true once
// the real page has loaded, false if it never cleared within the timeout.
async function waitForChallenge(page, timeoutMs = 45000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const title = (await page.title().catch(() => '')) || '';
    const bodyLen = await page.evaluate(() => document.body?.innerText?.length || 0).catch(() => 0);
    const blocked = /just a moment|attention required|checking your browser|verifying/i.test(title);
    if (!blocked && bodyLen > 500) return true;
    await page.waitForTimeout(2000);
  }
  return false;
}

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();

async function extractProducts(page) {
  // Generic e-commerce heuristic: find price-looking nodes, read a nearby title.
  return page.evaluate(() => {
    const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
    const priceRe = /(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?)\s*€|€\s*(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?)/;
    const cards = new Map();
    document.querySelectorAll('*').forEach((el) => {
      if (el.children.length) return;                 // leaf nodes only
      const txt = clean(el.textContent);
      if (!txt || txt.length > 20 || !priceRe.test(txt)) return;
      // walk up to a plausible product card
      let card = el;
      for (let i = 0; i < 6 && card.parentElement; i++) {
        card = card.parentElement;
        if (/(product|item|card)/i.test(card.className || '')) break;
      }
      const title =
        clean(card.querySelector('h1,h2,h3,h4,a[title]')?.textContent) ||
        clean(card.querySelector('a')?.getAttribute('title')) ||
        clean(card.querySelector('img')?.getAttribute('alt'));
      if (title && title.length > 2) {
        cards.set(title, { title, price: txt });
      }
    });
    return [...cards.values()];
  });
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await launch();
  const ctx = await browser.newContext({ userAgent: UA, locale: 'el-GR' });
  const page = await ctx.newPage();

  const result = { startUrl: START_URL, scannedAt: new Date().toISOString(), categories: [] };

  console.log('→ Loading homepage:', START_URL);
  await page.goto(START_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);
  const passed = await waitForChallenge(page);
  if (!passed) {
    console.error(
      '\n✗ Blocked by a Cloudflare/bot challenge that did not clear.\n' +
      '  Re-run with a visible browser:  HEADFUL=1 node scan-arvana.js\n' +
      '  and, if a checkbox appears, click it once. This must be run locally\n' +
      '  (not in the cloud sandbox) to get past Cloudflare.'
    );
    await browser.close();
    process.exit(2);
  }
  result.title = await page.title();

  // Collect internal category-ish links from the homepage.
  const origin = new URL(START_URL).origin;
  const links = await page.$$eval('a', (as) =>
    as.map((a) => ({ t: (a.textContent || '').replace(/\s+/g, ' ').trim(), h: a.href }))
  );
  const seen = new Set();
  const categories = [];
  for (const { t, h } of links) {
    if (!t || t.length > 40 || !h.startsWith(origin)) continue;
    if (/(login|account|wishlist|cart|checkout|search|contact|privacy|terms|#)/i.test(h)) continue;
    if (seen.has(h)) continue;
    seen.add(h);
    categories.push({ name: t, url: h });
    if (categories.length >= MAX_CATEGORIES) break;
  }
  console.log(`→ Found ${categories.length} candidate category links`);

  for (const cat of categories) {
    try {
      await page.goto(cat.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(1500);
      const products = (await extractProducts(page)).slice(0, MAX_PRODUCTS);
      result.categories.push({ ...cat, productCount: products.length, products });
      console.log(`   ${cat.name} → ${products.length} products`);
    } catch (e) {
      result.categories.push({ ...cat, error: e.message });
      console.log(`   ${cat.name} → ERROR ${e.message}`);
    }
  }

  await browser.close();

  // Write JSON
  fs.writeFileSync(path.join(OUT_DIR, 'arvana-scan.json'), JSON.stringify(result, null, 2));

  // Write Markdown summary
  const md = [];
  md.push(`# Arvana scan — ${result.title || START_URL}`);
  md.push(`_Scanned: ${result.scannedAt}_\n`);
  for (const c of result.categories) {
    md.push(`## ${c.name}`);
    md.push(`<${c.url}>\n`);
    if (c.error) { md.push(`> error: ${c.error}\n`); continue; }
    if (!c.products?.length) { md.push(`_no products detected_\n`); continue; }
    md.push('| Product | Price |');
    md.push('|---|---|');
    for (const p of c.products) md.push(`| ${norm(p.title)} | ${norm(p.price)} |`);
    md.push('');
  }
  fs.writeFileSync(path.join(OUT_DIR, 'arvana-scan.md'), md.join('\n'));

  console.log(`\n✓ Done. Wrote:\n  ${path.join(OUT_DIR, 'arvana-scan.json')}\n  ${path.join(OUT_DIR, 'arvana-scan.md')}`);
}

main().catch((e) => { console.error('FATAL', e); process.exit(1); });

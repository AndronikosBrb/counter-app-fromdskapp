# Arvana site scanner

Drives a real Chromium browser over **arvana.gr**, walks the category links,
and extracts product titles + prices per category. Output lands in
`output/arvana-scan.json` and `output/arvana-scan.md`. Use it to feed real
product data into Google Ads copy instead of guessing from search snippets.

## Why this exists

The plain URL fetcher gets a `403` from arvana.gr (bot protection), and a
default Claude cloud session is on **Trusted** network access, which blocks
general websites. This script uses a real browser and only needs the network
to be opened up. Pick one of the two setups below.

## Setup A — Claude cloud session (recommended for quick scans)

1. In `claude.ai/code`, open the environment selector (cloud icon above the
   message box) → gear icon → set **Network access = Full** → Save.
2. Start a **new** session on this repo (the change only applies to new
   sessions).
3. Ask Claude to run:

   ```bash
   cd tools/arvana-scan
   npm install --omit=dev            # playwright-core is already present on the VM
   node scan-arvana.js
   ```

   The cloud VM already ships Chromium at `/opt/pw-browsers`, which the script
   auto-detects, and it routes through the session proxy via `HTTPS_PROXY`.

## Setup B — Your own machine (REQUIRED for arvana.gr — beats Cloudflare)

arvana.gr is behind a Cloudflare "Just a moment..." JS challenge. The cloud
sandbox cannot pass it (its browser can't tunnel the security proxy, and
Cloudflare blocks datacenter IPs anyway). Run locally instead — your home IP +
a visible browser clears the challenge automatically.

**1. Install Node.js** (v18+): https://nodejs.org (LTS installer). Verify:

```bash
node -v
```

**2. Get this folder onto your machine.** Either clone the repo:

```bash
git clone https://github.com/AndronikosBrb/counter-app-fromdskapp.git
cd counter-app-fromdskapp
git checkout claude/arvana-search-campaign-copies-4464j7
cd tools/arvana-scan
```

**3. Install and run in visible (headful) mode:**

```bash
npm install
npx playwright install chromium
HEADFUL=1 node scan-arvana.js
```

A Chromium window opens. If a Cloudflare checkbox appears, click it once; the
script waits for the challenge to clear, then crawls. Results land in
`output/arvana-scan.md` and `output/arvana-scan.json`.

> On Windows PowerShell, set the variable like this:
> `$env:HEADFUL=1; node scan-arvana.js`

### Alternative — drive your real Chrome from Claude Code (chrome-devtools-mcp)

If you'd rather have Claude read the pages through the Chrome you already use
(already trusted by Cloudflare), run a local Claude Code session with a browser
MCP:

```bash
npm install -g @anthropic-ai/claude-code
claude          # then /login
claude mcp add --scope project chrome -- npx -y chrome-devtools-mcp@latest
```

Restart `claude`, then ask: "open arvana.gr and read every category and price."

## Options (environment variables)

| Var | Default | Meaning |
|---|---|---|
| `START_URL` | `https://arvana.gr/` | Site to scan |
| `MAX_CATEGORIES` | `30` | Max category links to visit |
| `MAX_PRODUCTS` | `20` | Max products captured per category |
| `PW_CHROMIUM` | auto | Explicit Chromium binary path |
| `HTTPS_PROXY` | from env | Proxy for the browser (set automatically in cloud) |

## Output

- `output/arvana-scan.json` — full structured data
- `output/arvana-scan.md` — human-readable category → product/price tables

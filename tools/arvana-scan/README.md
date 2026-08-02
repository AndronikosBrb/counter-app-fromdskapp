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

## Setup B — Your own machine (uses your real browser stack)

```bash
cd tools/arvana-scan
npm install
npx playwright install chromium
node scan-arvana.js
```

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

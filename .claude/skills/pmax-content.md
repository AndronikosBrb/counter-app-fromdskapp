# PMax Campaign Content Builder

## Trigger
Use this skill whenever the user wants to build, create, or generate PMax (Performance Max) campaign content — including when they mention "PMax", "Performance Max", "campaign content", "Google Ads assets", or ask to build ad copy for a brand or product with creatives.

## Step 1 — Always ask these 4 questions FIRST, before any research or content creation

Ask all 4 in a single message. Do not proceed until all 4 are answered:

1. **URL** — What is the brand/product website URL?
2. **Creatives** — Describe the visual creatives (images/videos) for this campaign. What do they show? What is the visual tone, color palette, setting, models, season, mood? If you have image files, share them.
3. **Language** — What language should the ad content be written in?
4. **Location** — What is the target country/region for this campaign?

Also ask:
- Is the brand excluded from this PMax (brand exclusion)? (yes/no)
- What is the campaign goal? (Sales / Leads / Traffic)
- Who is the target audience? (age range, gender, interests)
- What is the campaign month and year? (MM-YYYY format)
- What is the account identifier/prefix for the campaign name? (e.g. "Eight", "Alpha", client code)

---

## Step 2 — Research

Once answers are received:

1. **Fetch the website** using WebFetch on the provided URL. Extract:
   - Brand tone and voice (adjectives, recurring phrases)
   - Product categories and names (verbatim)
   - Any active promotions or seasonal messaging
   - USPs: shipping, returns, loyalty programs, store count, services
   - Any Greek/local cultural references if relevant
   - Pricing or discount language

2. **Analyze the creatives** provided by the user:
   - Visual mood: luxurious, sporty, minimal, bold, seasonal?
   - Color palette: bright, neutral, earth tones, dark?
   - Setting: urban, Mediterranean, studio, outdoor?
   - Models: age, style, attitude?
   - Text overlays: what does the creative communicate?
   - Map this tone directly into the ad copy register

3. Cross-reference website copy + creative tone to define the exact voice for this campaign.

---

## Step 3 — Campaign & Asset Group Naming

Format strictly as follows:

**Campaign name:** `[AccountPrefix]_[BrandOrCampaignName]-[CampaignType]_[Goal]_[MM-YYYY]`

Example: `Eight_DUR-SummerSales_Sales_08-2026`

**Asset group name:** `[CollectionOrConceptName]_[SeasonYear]`

Example: `LegacyOnCanvas_SS26`

Use the campaign name and asset group name provided/confirmed before writing content.

---

## Step 4 — Deliver all PMax content in the target language

Deliver every section below. Match the creative tone precisely — do not default to generic ad copy.

### 50 Search Themes
- Plain keyword phrases, no numbers, no bullets
- One per line, ready for bulk upload
- Non-brand (unless brand exclusion is NO)
- Cover: product categories, occasions, audience intent, discount/offer terms, fabric/quality signals, online shopping behavior, local market terms

### 15 Headlines
- Max ~30 characters each (Google Ads limit)
- Mix: offer-led, product-led, emotion-led, brand-value-led
- No punctuation at end unless it fits naturally
- Avoid repeating the same value twice across headlines

### 10 Descriptions
- Max ~90 characters each
- Each description should stand alone and highlight a different angle: offer, product quality, occasion, service, USP, lifestyle
- Natural sentence flow, not listy

### Sitelinks (5 sitelinks)
- Title (max 25 chars)
- Description line 1 (max 35 chars)
- Description line 2 (max 35 chars)
- Cover: seasonal collection, top offer/combo, new arrivals, stores/services, loyalty program

### Callouts (10–12 callouts)
- Max 25 characters each
- Short, punchy, factual — no fluff
- Include: shipping, returns, discount %, fabric quality, services, store count, loyalty, delivery speed

### Structured Snippets (3 snippet sets)
- Header type (use Google Ads approved headers: Κατηγορίες / Services / Brands / Styles / Types / Υπηρεσίες / Υφάσματα etc.)
- 4–7 values per header
- Values should be real product categories, services, or materials from the website

---

## Step 5 — Format rules

- All content in the target language (not mixed languages unless creatives use mixed)
- Present each section with a clear bold header
- Search themes: plain list, no numbers, no dashes
- All other content: formatted in code blocks for easy copy-paste
- After delivery, ask: "Θες να κάνω adjustments σε κάποιο section ή να προσθέσω variations;"

---

## Notes for the AI

- Never guess brand content — always fetch the real website first
- The creative images define the emotional register; the website copy provides the factual assets. Combine both.
- If the campaign has a seasonal theme (summer sales, winter collection, etc.), let that drive the tone of every section — not just the headlines.
- Target audience age/gender must inform language register: for men 40–60, use confident, direct, slightly aspirational language — not hype or youth slang.
- Search themes should reflect real user search behavior in the target market, not internal brand jargon.
- Always confirm campaign name and asset group name BEFORE writing content.

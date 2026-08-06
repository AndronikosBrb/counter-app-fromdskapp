# Google Search Campaign Builder — Brand Search

## Trigger
Use this skill whenever the user wants to build a Google Search campaign — including brand search, non-brand search, or competitor search. Trigger on: "search campaign", "brand search", "search ads", "RSA", "keywords για search", "φτιάξε search campaign", or any mention of building Google Search ads.

---

## Step 1 — Ask these questions FIRST. Do not write anything until all are answered.

Ask in a single message:

1. **URL** — What is the brand website?
2. **Campaign type** — Brand Search / Non-Brand / Competitor?
3. **Language** — What language for the content?
4. **Location** — Target country or region?
5. **Bid strategy** — Manual CPC or Target Impression Share?
   *(For brand: Manual CPC if no competitor activity. Target IS Absolute Top if competitors are bidding on brand terms.)*
6. **Tone** — Premium & brand-led OR Promotional & offer-led?
7. **Account prefix** — The naming prefix for this account (e.g. "Eight")
8. **Month & Year** — Launch month in MM-YYYY format

---

## Step 2 — Research

Fetch the website using WebFetch. Extract:
- Exact brand name and any sub-brands
- Product categories (verbatim names)
- Brand USPs: shipping, returns, stores, services, loyalty program
- Brand tone and recurring phrases
- Any active collections or campaigns (use for collection-themed assets)
- If tone = Promotional: note any active discounts or offers

---

## Step 3 — Naming

**Campaign name format:**
```
[AccountPrefix]_[BrandName]-[CampaignType]_[Purpose]_[BidStrategy]
```
Example: `Eight_DUR-BrandSearch_Brand_ManualCPC`
Example: `Eight_DUR-BrandSearch_Brand_TargetIS`

**Ad group name format:**
```
[Concept]_[MonAbbr+YY]
```
Example: `BrandCore_Aug26`

For brand search: one ad group is enough unless volume justifies splitting by product line later.

Confirm both names before writing any assets.

---

## Step 4 — Keywords

Organize into 4 clusters. All keywords include the brand name.

### Core Brand — Exact Match
Pure brand searches. 6–8 terms.
```
[brand]
[brand gr]
[brand.gr]
[brand ρούχα / products]
[brand ανδρικά / audience]
[brand shop]
[brand online]
```

### Brand + Product — Phrase Match
Brand name + specific product category. 8–12 terms.
```
"brand [product category 1]"
"brand [product category 2]"
... (one per main product type from website)
```

### Brand + Purchase Intent — Phrase Match
Brand name + action or offer signal. 8–10 terms.
```
"brand [seasonal term]"
"brand [collection name]"
"brand [offer/sale term]" ← only if tone = Promotional
"brand αγορά online"
"brand νέες παραλαβές"
```

### Brand + Location & Service — Phrase Match
Brand name + local or service terms. 6–8 terms.
```
"brand καταστήματα"
"brand [city 1]"
"brand [city 2]"
"brand [loyalty program name]"
"brand [service name]"
"brand αποστολή"
```

**Rules:**
- Brand search: Exact + Phrase only. Never Broad Match.
- Never use generic category terms without the brand name in a brand campaign.

---

## Step 5 — 15 Headlines

- Max 30 characters each — count precisely, never exceed
- Brand name in every headline
- Mix these angles across the 15:
  - Brand + channel: `DUR | Ανδρικά Ρούχα Online`
  - Brand authority: `DUR — Η Επίσημη Σελίδα`
  - Collection/season: `Νέα Συλλογή DUR SS26`
  - Material/quality: `DUR | Pima Βαμβάκι & Λινό`
  - Service: `DUR | Δωρεάν Αποστολή`
  - Craft: `DUR | Διαχρονικό Tailoring`
  - Aesthetic: `DUR — Καθαρές Γραμμές`
  - Loyalty: `DUR Members Club | Εγγράψου`
  - Personal service: `DUR | Personal Styling`
  - Physical presence: `DUR | 11 Καταστήματα`
  - Brand positioning: `DUR — Σύγχρονη Κομψότητα`
  - Offer (only if Promotional tone): `DUR | Έως -50% Εκπτώσεις`

If tone = Premium: zero discount or offer language in any headline.
If tone = Promotional: replace craft/aesthetic angles with offer-led angles.

---

## Step 6 — 4 Descriptions

- Max 90 characters each — count precisely
- Each description covers a different angle:
  - **Desc 1** — Core product quality + materials
  - **Desc 2** — Collection name + physical/online presence
  - **Desc 3** — Services + loyalty/membership program
  - **Desc 4** — Product range breadth + brand positioning
- Brand name in every description
- Include website URL (brand.gr / brand.com) in at least 2 descriptions — boosts ad relevance
- If tone = Premium: no discounts, no urgency language
- If tone = Promotional: include offer, urgency, and CTA in at least 2 descriptions

---

## Step 7 — Extensions

### Sitelinks (5)
- Title: max 25 chars
- Description 1 + 2: max 35 chars each
- Cover: current collection, key product category, stores/services, loyalty program, online shop

### Callouts (10–12)
- Max 25 chars each
- Include: shipping, returns, store count, materials, services, loyalty, delivery speed
- If Promotional tone: add offer callouts (e.g. "Έως -50% Εκπτώσεις")
- If Premium tone: quality and service callouts only

### Structured Snippets (3 sets)
- Use approved Google Ads header types
- Values pulled verbatim from the website
- Suggested headers: product categories / services / materials or styles

---

## Step 8 — Format rules

- Each section delivered under a clear bold header
- Keywords: plain list organized by cluster label, one per line, brackets/quotes applied
- Headlines: code block, one per line
- Descriptions: code block, one per line, char count noted in parentheses
- Extensions: labeled blocks, ready to copy-paste
- After delivery ask: "Θες variations, επιπλέον ad groups ή να αλλάξω tone σε κάποιο section;"

---

## Notes for the AI

- Character limits are hard Google limits. Count every character before committing. Greek characters each count as 1.
- Brand search = brand name in every single asset. No exceptions.
- Premium tone and promotional tone are mutually exclusive. Pick one per campaign and hold it across all 19+ assets.
- The bid strategy (Manual CPC vs Target IS) belongs in the campaign name — this makes it instantly visible without opening settings.
- If the user hasn't checked Auction Insights yet, remind them: Manual CPC first, switch to Target IS only if competitors appear on brand terms.
- Always confirm campaign name and ad group name before writing headlines.

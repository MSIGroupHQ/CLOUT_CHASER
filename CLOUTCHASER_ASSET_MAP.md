# CloutChaser Asset Map — Master Index
**Updated:** 2026-08-04  
**Companion:** `CLOUT_VISION_LOCK.md` · `ONLYCLOUT_X1000_PLAN.md` · `ONLYCLOUT_PROMO_PACK.md`

This document pulls together **GitHub**, **local Downloads**, **OnlyClout**, **doctrine**, and **Antigravity** so nothing is “somewhere on the machine” without a role.

---

## 0. Sources of truth (priority order)

| Priority | Source | What it holds | Status |
|----------|--------|---------------|--------|
| **1 — CANON** | [`MSIGroupHQ/CLOUT_CHASER`](https://github.com/MSIGroupHQ/CLOUT_CHASER) | Next.js app + full brand pack + videos + ad cutdowns | **Public · active** (pushed 2026-08-04) |
| **2 — LIVE SKU** | [`MSIGroupHQ/creator-quotes`](https://github.com/MSIGroupHQ/creator-quotes) + local `Documents/Default Project/creator-quotes` | OnlyClout product | Live: onlyclout.netlify.app |
| **3 — DOCTRINE** | `Downloads/cloutchaser_extracted/MSI_CAPITAL_PIVOT_CLOUT_CHASER_LINE_BY_LINE_V1/` | Capital pivot, product spec, decision ledger | Local archive |
| **4 — WORK DUMP** | `Downloads/CloutChaser/` | Loose stills (subset of GitHub pack) | Mirror / working copy |
| **5 — VIDEO DUMP** | `Downloads/*.mp4` | Launch + openings (subset of GitHub `public/media/video`) | Prefer GitHub when both exist |
| **6 — ANTIGRAVITY** | `C:\Users\DM\.gemini\antigravity\` | Prime88/CRM architecture notes, repo classification | **Support only** — not Clout product source |
| **LOCAL CLONE (done)** | `C:\Users\DM\MSIGroupHQ\CLOUT_CHASER_CANON` | Shallow clone of GitHub canon (2026-08-04) | Use this for code/media |
| **⚠ EMPTY SHELL** | `MSIGroupHQ/CLOUT_CHASER` local + `rednitemsi/CLOUT_CHASER` | Empty git, wrong remote | Ignore; use `_CANON` |

### Local clone

```text
C:\Users\DM\MSIGroupHQ\CLOUT_CHASER_CANON   ← real product + public/media/*
C:\Users\DM\MSIGroupHQ\CLOUT_CHASER         ← empty shell (placeholder README only)
```

Do **not** use `rednitemsi/CLOUT_CHASER` (empty origin).

### Partner / infrastructure logos (live on site)

| Path | Role |
|------|------|
| `public/media/brand/logos/*.svg` | AWS, Cloudflare, NVIDIA, Microsoft, Google, Oracle, RunPod, Stripe, Whop, AT&T, T-Mobile, Vodafone, Yahoo |
| `public/media/brand/Cloudflare_Network_275__Cities_in_100__Countries.png` | Feature map art |
| `src/components/clout/TechInfrastructureFlex.tsx` | Homepage + showcase + mix section |
| Live URLs | https://clout.prime88.studio/#infrastructure · https://cloutchaser.prime88.studio/#infrastructure |

---

## 1. Product map

| Product | Repo / path | URL | CTA |
|---------|-------------|-----|-----|
| **Clout Chaser V0** | MSIGroupHQ/CLOUT_CHASER · local `CLOUT_CHASER_CANON` | **clout.prime88.studio** + **cloutchaser.prime88.studio** | Sample → receipt → early access · infra logos on `/` |
| **OnlyClout** | creator-quotes | onlyclout.netlify.app/us | $4 bag / $1 test ZIP |
| **CRM creator trial** | PRIME88_STUDIO / CRM_88 | crm.prime88.studio/creator-trial | Bridge from Clout |
| **Collab pay** | Cash App card asset | `$PRIME88STUDIO` | Human collabs only |

### Clout Chaser V0 routes (from README)

| Route | Role |
|-------|------|
| `/` | Landing + seed opportunity cards |
| `/sample` | One-source sample request |
| `/r/[oppHash]` | Public-safe receipt |
| `/early-access` | Pilot cohort |
| `/internal/clout-desk` | Operator review (token) |
| `/prime88-surfaces` | Capability map |
| `/bunny-mix` · `/mix` · `/showcase` | Brand / media surfaces |
| Seed receipts | `CC-DRK-ICE-FLOOD`, `CC-DRK-CENCH-ICEBRIDGE`, `CC-ICE-BIGGUY-OK`, `CC-CENCH-LUXNOIR` |

### Runtime (from README)

- **Vercel** — Next.js public surface  
- **Cloudflare Worker** — D1, R2, queues, receipts  
- Operator approval required before public receipt  

### Deferred (LAUNCH_SCOPE — do not claim)

Automated scoring claims · full CeeCee chat · auto-publish · bounties/payouts · multi-tenant · public private-engine access  

---

## 2. Video map — post these first (no HyperFrames)

### Canonical (GitHub `public/media/video/`)

| File | Length / role | Use for |
|------|---------------|---------|
| **`runway-clout-chaser-launch-30s-20260731-151332.mp4`** | ~30s launch | Hero trailer, site embed, launch posts |
| **`Find_Tomorrows_Viral_Content_Today.mp4`** | Tagline film | Brand line, bio video, end card |
| **`Arcade.mp4`** | World open | Cold open, brand world |
| **`Console_Opening.mp4`** | Console cold open | Product teaser |
| **`Opening_Continuation.mp4`** | *Local Downloads only* | Bridge after Console open |
| **`clout_ad_bumper_6s.mp4`** | 6s | Ads / hooks / bumpers |
| **`clout_ad_hook_variant_a_15s.mp4`** | 15s | Paid/organic A |
| **`clout_ad_core_variant_b_15s.mp4`** | 15s | Paid/organic B |
| **`clout_ad_outro_variant_c_15s.mp4`** | 15s | Outro / CTA |

### Local-only extras (`Downloads/`)

| File | Notes |
|------|-------|
| ARRI Alexa anamorphic clips (×2) | Cinematic b-roll / collab energy |
| RED Komodo neon clips (×2) | Neon b-roll |

**Rule:** Prefer GitHub ad cutdowns for performance posts. Use ARRI/RED as *premium b-roll*, not primary product ads.

### Recommended posting pack (ready now)

1. IG/TikTok/X: `clout_ad_hook_variant_a_15s` + caption → OnlyClout or sample link  
2. Story/Reel: `clout_ad_bumper_6s`  
3. Site/Whop: `runway-clout-chaser-launch-30s`  
4. Brand: `seven_bunny_lineup.webp` + tagline  

---

## 3. Hero stills (daily drivers)

| Asset | GitHub path | Local | Use |
|-------|-------------|-------|-----|
| **Hero mascot K** | `…/CloutChaser/neon_bunny_k.webp` | Yes | OnlyClout hero, profile, ads |
| **Money bag icon** | `…/money_bag_dark_1024.PNG` + `same-exact-app-icon-…webp` | Yes | App icon, CLAIM THE BAG |
| **7 lineup** | `…/seven_bunny_lineup.webp` | Downloads | Cast poster, launch |
| **Conga line** | `…/neon_bunny_conga_line.webp` | Downloads | Fun / party posts |
| **Group neon** | `…/neon_bunny_group.webp` | Downloads | Feed fill |
| **Cash App card** | `…/exact-same-cash-app-card-design…webp` + `snakeskin_card_prime88studio.webp` | Downloads | Collab CTA |
| **Ralph Lauren pose** | `…/recreate-the-ralph-lauren…webp` | Downloads | Editorial / fashion stretch |
| **Mascot PNG** | `public/clout-chaser-mascot.png` | (GH) | Favicon/large mark |
| **Clout mark SVG** | `public/clout-mark.svg` | (GH) | UI / wordmark |

### OnlyClout production brand (already wired)

`Documents/Default Project/creator-quotes/public/brand/`:

| File | Role |
|------|------|
| `neon-bunny-k.webp` | Site hero |
| `money-bag.webp` | Paywall / bag |
| `bunny-app.webp` | App vibe |
| `jazz-cup.webp` | Accent |
| `bunny-teal.webp` | Variant |

---

## 4. Cast-tagged still inventory

### Canon cast (use for regen consistency)

| Character | Key files | Notes |
|-----------|-----------|-------|
| **K (white hero)** | `neon_bunny_k.webp`, `cute_bunny_neon_studio.webp`, `generate-one-single-image-of-the-same-white-bunny.webp`, `neon_bunny_white_tee.webp` | OnlyClout face |
| **Olivia O** | `olivia_bunny_selfie_1024.jpg`, `olivia-bunny-4c302b-*`, `fix-olivia-o-correct-canon-…webp`, blooper states 1–3 | Fur **#4c302b** locked |
| **Brother K** | `brother_k_pushes_cabinet.webp`, `brother_k_pushing_arcade.webp` | Arcade lore |
| **Lisa** | `lisa_arcade_seated.webp` (+1024, dup) | Lounge / arcade |
| **Shadow (black hoodie)** | `black-rabbit-with-black-fur-all-black-hoodie-hood.webp`, `black_rabbit_neon_synthwave.webp`, `black_bunny_iced_coffee.webp` | Night ops |
| **Pink fuzzy** | `pretty_girl_bunny.webp`, fashion set | Soft flex |
| **Jersey** | `grey_rabbit_kachina_jersey.webp`, `white_jersey_rabbit.webp` | Culture wing |
| **Full cast** | `seven_bunny_lineup.webp`, `seven_bunnies_selfie.webp`, `neon_rabbits_lineup.webp`, `all-5-klout-bunnies-*` | Posters |

### Sets / world

| Set | Files |
|-----|-------|
| Arcade | `klout_arcade_poster.webp`, `confident_bunnies_arcade*`, `rabbits_arcade_*`, `another-variation-of-letter-u-giant-arcade-machine.webp` |
| Lowrider / night car | `lowrider_*`, `rabbits_neon_car.webp`, `bunnies_car_night_1024.jpg` |
| Soda fountain | `soda_fountain_rabbits*`, `bunnies_soda_fountain.webp` |
| Disco | `bunnies_disco_dance.webp` |
| MSI studio wall | `launch-party-outside-msigrouphq-studio-brick-wall.webp`, `non-chalant-launch-party…`, `retro-theme-restored-all-5…` |
| Vaporwave grid | `vaporwave_bunny_*`, `neon_rabbits_synthwave.webp`, `cyberpunk_rabbits_neon.webp` |

### GitHub-only extras (not in Downloads dump)

- `baby_cheeky_running_cycle (1).webp` (Cheeky’s crossover — careful brand mix)  
- `black_leather_embossed_logo.webp`, `glossy_white_fleur_de_lis.webp`, gold shield logos  
- Partner logos under `public/media/brand/logos/` (Cloudflare, Stripe, Whop, etc.)  
- Bunny mix HTML: `public/Klout-Chasers-Bunny-Mix.html`  

### Duplicates to treat as one

| Prefer | Drop / ignore |
|--------|----------------|
| `CloutChaser/` OR `CloutChaser_Pack/` | Same files twice on GitHub — **prefer `CloutChaser/`** |
| `lisa_arcade_seated.webp` | `(1)` and `_1024` variants |
| `black_bunny_iced_coffee.webp` | `(1)` dup |

---

## 5. Local Downloads map (your attached set)

| Local file | Role | Also on GitHub? |
|------------|------|-----------------|
| `CloutChaser/*` (74 files) | Working still dump | Yes → `public/media/brand/CloutChaser/` |
| `seven_bunny_lineup.webp` | Cast poster | Yes |
| `neon_bunny_conga_line.webp` | Fun feed | Yes |
| `neon_bunny_group.webp` | Group | Yes |
| `vaporwave_bunny_group/scene.webp` | World | Yes |
| `cyberpunk_rabbits_neon.webp` | World | Yes |
| `neon_rabbits_synthwave.webp` | World | Yes |
| `exact-same-cash-app-card-design…webp` | Collab card | Yes |
| `recreate-the-ralph-lauren…webp` | Editorial | Yes |
| `runway-clout-chaser-launch-30s…mp4` | Launch | Yes |
| `Arcade.mp4` | Open | Yes |
| `Console_Opening.mp4` | Open | Yes |
| `Find_Tomorrows_Viral_Content_Today.mp4` | Tagline | Yes |
| `Opening_Continuation.mp4` | Bridge | **Local only** — consider commit to GH |
| ARRI / RED agent mp4s | B-roll | **Local only** |
| `cloutchaser_extracted/…` | Doctrine pack | Local archive |

---

## 6. Doctrine pack map

Path: `C:\Users\DM\Downloads\cloutchaser_extracted\MSI_CAPITAL_PIVOT_CLOUT_CHASER_LINE_BY_LINE_V1\`

| File | Role |
|------|------|
| `README.md` | Bundle intro |
| `reports/01_EXECUTIVE_LOCK.md` | Capital mission lock |
| `reports/03_CAPITAL_PIVOT_DOCTRINE.md` | Full doctrine |
| `reports/04_CLOUT_CHASER_PRODUCT_SPEC.md` | Product class + pipeline + pricing experiments |
| `reports/07_BUILD_PLAN_24_72H_AND_30D.md` | Build plan |
| `data/DECISION_LEDGER.csv` | CAP-DEC-001…008 locks |
| `data/PRODUCT_LANES.csv` | Clout + BASILISK + VERA + BBS + MIDAS lanes |
| `gems/*_GEM.md` | Gemini role adapters (not authority) |
| `MSI_CAPITAL_PIVOT_DOCTRINE_V02.pdf` | PDF doctrine |

---

## 7. Antigravity map (what it is / isn’t)

Path: `C:\Users\DM\.gemini\antigravity\`

| Path | Content | Clout relevance |
|------|---------|-----------------|
| `brain/eb8a0512-…/repository_classification.md` | **Maps CLOUT_CHASER under MSIGroupHQ** as consumer attention engine | High — org truth |
| `brain/…/implementation_plan.md`, `live_verification_proof.md` | Prime88 login / CRM / auth | Adjacent (studio door) |
| `brain/…/reach_api_keys_manifest.md` | REACH keys | Adjacent (intel) |
| `scratch/prime88-studio/` | Prime88 middleware work | Not Clout app code |
| `scratch/CRM_88`, `PRIME88`, etc. | Studio/CRM splits | Kernel, not Klout IP |

**Conclusion:** Antigravity did **Prime88 architecture + org classification**, not the bunny asset bible. Clout product + media = **GitHub MSIGroupHQ/CLOUT_CHASER**.

---

## 8. GitHub org footprint (Clout-related)

| Repo | Role |
|------|------|
| **MSIGroupHQ/CLOUT_CHASER** | Product + media **canon** |
| **MSIGroupHQ/creator-quotes** | OnlyClout |
| MSIGroupHQ/PRIME88_STUDIO | Door / CRM / trial bridge |
| MSIGroupHQ/REACH_INTELLIGENCE | Intel surface |
| MSIGroupHQ/PULSE · BASILISK · MIDAS · VERA · BBS… | Kernel (rotate missions) |
| rednitemsi/CLOUT_CHASER | Empty / legacy — **ignore** |

---

## 9. Use-case cheat sheet

| Goal | Grab these |
|------|------------|
| **Launch post today** | `runway-…30s.mp4` + `seven_bunny_lineup.webp` + tagline |
| **OnlyClout ad** | `neon_bunny_k.webp` + `money_bag` + `clout_ad_hook_variant_a_15s` + onlyclout URL |
| **Short paid** | `clout_ad_bumper_6s` / 15s A-B-C variants |
| **Collab pitch** | Cash App card + Ralph Lauren pose + `$PRIME88STUDIO` |
| **Cast story** | Lineup + per-character solos (K, Olivia, Shadow, Brother K) |
| **Site embed** | Launch 30s + mascot PNG + clout-mark.svg |
| **Operator / proof** | Seed receipts + LAUNCH_SCOPE truth rules |
| **Doctrine review** | Executive lock + product spec + decision ledger |

---

## 10. Cleanup actions (recommended)

| Action | Why |
|--------|-----|
| Clone `MSIGroupHQ/CLOUT_CHASER` over empty local shell | One code home |
| Commit `Opening_Continuation.mp4` + ARRI/RED if you want canon | Close local-only gap |
| Deduplicate `CloutChaser_Pack` vs `CloutChaser` on GH later | Half the still noise |
| Keep Olivia `#4c302b` in all future gens | Cast lock |
| Point all agents/docs at this map + vision lock | End “which folder?” |

---

## 11. Quick links

```
GitHub Clout:     https://github.com/MSIGroupHQ/CLOUT_CHASER
GitHub OnlyClout: https://github.com/MSIGroupHQ/creator-quotes
Live OnlyClout:   https://onlyclout.netlify.app/us
Whop:             https://whop.com/checkout/plan_BCy8oMOfTY2tl
Gumroad $1:       https://dmxlvii.gumroad.com/l/onlyclout-test
Gumroad $4:       https://dmxlvii.gumroad.com/l/oowbmvy
Vision lock:      Desktop/KEYS/CLOUT_VISION_LOCK.md
This map:         Desktop/KEYS/CLOUTCHASER_ASSET_MAP.md
OnlyClout plan:   Desktop/KEYS/ONLYCLOUT_X1000_PLAN.md
Promo pack:       Desktop/KEYS/ONLYCLOUT_PROMO_PACK.md
Doctrine:         Downloads/cloutchaser_extracted/…
Local stills:     Downloads/CloutChaser/
```

---

*Generated 2026-08-04 from live GitHub tree, local Downloads inventory, capital-pivot doctrine, and Antigravity repository classification.*

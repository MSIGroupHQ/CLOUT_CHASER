# Open Claw Family

**Your job (ceiling):** paste a public link — or do nothing if a claw is already watching a niche.  
**Everything else:** Open Claw family + REACH heat + Clout package/receipt.

## What Open Claw is

A small family of **gated** agents that:

1. Accept a source (URL / trend / description)  
2. Tag **region** (IN, JP, LATAM, US, …)  
3. Score / package via Clout rails  
4. Emit **outbox** ready for you to post (or schedule)  
5. Never cold-spam strangers — owned channels + approved queues only  

Revenue until `cloutchaser.ai`: run Open Claw on **paste-link volume** + paid packages + early access.  
After `.ai`: scale autonomous niche watchers (same family, more claws).

## Family members

| Claw | Role | Speaks via |
|------|------|------------|
| **PASTE** | Ingest one link → region + queue | `inbox/paste.json` |
| **HEAT** | Pull REACH hot board / global heat into Clout seeds | `inbox/heat.json` |
| **PACK** | Compile opportunity package language | outbox packages |
| **POST** | Draft captions / hooks for your channels only | outbox drafts |
| **GUARD** | Kill switch, no stranger email, rights notes | `state/control/` |

## Speak to claws (same pattern as REACH ops_bridge)

```text
open-claw/inbox/     ← drop commands
open-claw/outbox/    ← ready posts + receipts
open-claw/state/     ← durable status (survives Surface sleep)
```

```powershell
cd C:\Users\DM\MSIGroupHQ\CLOUT_CHASER_CANON\open-claw
python claw_bridge.py
python claw_bridge.py --loop 60
```

### Commands

```json
{"cmd":"paste","args":{"url":"https://www.tiktok.com/@someone/video/123","niche":"Bollywood","note":"IN twitter page later"}}
{"cmd":"heat","args":{"regions":["IN","JP","LATAM","US"],"hot_limit":15}}
{"cmd":"list_regions"}
{"cmd":"status"}
{"cmd":"draft_post","args":{"opp_hash":"CC-PESO-CORRIDOS-GLOBAL","channel":"x"}}
```

## Manual ceiling (you)

| Allowed | Not required |
|---------|----------------|
| Paste one public link | Manual scoring |
| Post the outbox caption/link | Writing hooks yourself |
| Ask Meta for an IN page, paste Clout link | Running engines by hand |
| Flip kill switch | Cold email lists |

## CF doctrine

Engines + eventual sole host: **Cloudflare**.  
Vercel may mirror `clout.prime88.studio` until DNS cutover.  
Heavy video → **R2**, never Workers 25MB asset trap.

## Authority

- Clout product: https://github.com/MSIGroupHQ/CLOUT_CHASER  
- REACH rank brain: https://github.com/MSIGroupHQ/REACH_INTELLIGENCE  
- Local Clout: `C:\Users\DM\MSIGroupHQ\CLOUT_CHASER_CANON`

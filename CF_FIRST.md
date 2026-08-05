# Clout Chaser — Cloudflare-first doctrine

## Target

| Host | Role |
|------|------|
| **Cloudflare Workers + Assets** | Sole production for `cloutchaser.prime88.studio` (and eventually `clout.prime88.studio`) |
| **R2** | Video / heavy media (never Workers 25MB asset limit) |
| **D1 / Queues** | Opportunity + receipt engine (`worker/`) |
| **Vercel** | Optional mirror only until DNS cutover for `clout.prime88.studio` |

## Why not “Vercel forever”

You already run REACH + daemons + free-tier primitives on CF.  
Clout should **borrow** NVIDIA / Stripe / Whop / AWS credits as APIs — **home is CF**.

## Deploy (CF)

```powershell
cd C:\Users\DM\MSIGroupHQ\CLOUT_CHASER_CANON
# Strip videos >24MB from .open-next/assets if rebuild includes them — use R2 URLs instead
npx opennextjs-cloudflare build
# wrangler.jsonc: only cloutchaser.prime88.studio until clout. DNS leaves Vercel
npx wrangler deploy
```

`clout.prime88.studio` DNS currently points at Vercel — do not dual-bind CF custom domain until you move the CNAME.

## Global product rule

Open Claw + global feed regions = **not US-only**.  
REACH heat (`reach-compile`) feeds worldwide “what’s hot”; Clout packages **local Beyoncés** (IN, JP, LATAM, AU, …).

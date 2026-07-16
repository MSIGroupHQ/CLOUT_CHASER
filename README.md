# Clout Chaser V0

Clout Chaser V0 is the Prime 88 proof, pilot, and early-access rail for turning a user-submitted public signal into an opportunity record, an operator-reviewed package, and a public-safe receipt.

## Product boundary

This repository implements:

- `clout.prime88.studio` — public proof and sample intake.
- `/` — landing page and four seeded opportunity cards.
- `/sample` — one-source sample request.
- `/r/[oppHash]` — public-safe receipt and referral surface.
- `/early-access` — cohort-based pilot request.
- `/internal/clout-desk` — fail-closed manual operator review.
- `/prime88-surfaces` — Prime 88 capability signal across Clout Chaser, CRM, Contact Flow, and Receipts.
- Creator CRM trial — `https://crm.prime88.studio/creator-trial`.
- A separate Cloudflare Worker under `worker/` for D1, private R2, queueing, receipts, and event records.

This repository does not implement the permanent Clout Chaser consumer identity, autonomous publishing, payouts, bounties, unrestricted model access, public private-engine endpoints, or automatic claims that a package was scored or compiled.

## Runtime split

- Vercel hosts the Next.js public surface.
- Cloudflare Workers receive validated requests and serve public-safe records.
- D1 stores relational state and the append-only event trail.
- R2 stores private source and receipt artifacts.
- Cloudflare Queues isolate asynchronous processing.
- Human operator approval is required before a submitted opportunity becomes a public receipt.

The public UI exposes outputs and receipts. Internal engine anatomy remains outside this repository and outside the customer surface.

## Seed proof rail

The four public seed receipts are:

- `/r/CC-DRK-ICE-FLOOD`
- `/r/CC-DRK-CENCH-ICEBRIDGE`
- `/r/CC-ICE-BIGGUY-OK`
- `/r/CC-CENCH-LUXNOIR`

They are labeled as seeded examples, not live market measurements. Each renders an Opportunity ID, why-now summary, opportunity score, content package, export notes, rights note, and source receipt.

Public payloads pass `assertPublicSafe()` before they are rendered. The public bundle uses outcome language only. The internal operator route remains non-indexed and requires a verified operator token.

## Local development

Copy `.env.example` to `.env.local`, supply the local Worker URL if available, then run:

```powershell
npm ci
npm run dev
```

When `NEXT_PUBLIC_CLOUT_API_BASE_URL` is absent or temporarily unreachable, the sample form still validates with Zod and creates a deterministic local Opportunity ID. The local proof does not upload or persist the submitted source.

Run the complete public-surface gate with:

```powershell
npm run check
```

Run the Worker separately from `worker/` according to `worker/README.md`.

## Deployment order

1. Validate and deploy the Cloudflare Worker and its new, Clout-specific resources.
2. Set `NEXT_PUBLIC_CLOUT_API_BASE_URL` in the Vercel project.
3. Deploy a Vercel preview and complete the receipt-loop smoke test.
4. Promote the frontend and attach `clout.prime88.studio`.
5. Attach `api.clout.prime88.studio` to the Worker without creating a conflicting DNS record first.

Frontend smoke routes:

```text
/
/sample
/r/CC-DRK-ICE-FLOOD
/r/CC-DRK-CENCH-ICEBRIDGE
/r/CC-ICE-BIGGUY-OK
/r/CC-CENCH-LUXNOIR
/early-access
/prime88-surfaces
/internal/clout-desk
```

The retired `/status` and `/system-status` surfaces are intentionally absent.

No existing Prime 88 CRM database, bucket, queue, or private engine repository is reused by default.

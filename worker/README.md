# Clout Chaser V0 Cloudflare Worker

This package is the isolated durable backend for the Clout Chaser Prime 88 pilot. It does not contain the public Next.js surface and it does not expose or impersonate private engine calls.

## Honest V0 state

The public source route records a request as `OPERATOR_REVIEW_REQUIRED`. The ingest Queue advances it only to `QUEUED_FOR_MANUAL_REVIEW`. A bearer-token-protected operator must manually compile and approve the package before a public receipt exists.

No BASILISK, MIDAS, ATLAS, BBS, VERA, AZARIA, automatic scoring, automatic compilation, payment, payout, posting, or voice integration is claimed or invoked.

## Routes

```text
POST /source
POST /opportunity
POST /package
POST /receipt
GET  /receipt/:receiptId
GET  /share/:oppHash
POST /internal/approve
POST /webhooks/whop

POST /api/clout/source
POST /api/clout/opportunity
POST /api/clout/events
POST /api/clout/crm-trial
GET  /api/clout/r/:oppHash
GET  /api/clout/share/:oppHash
GET  /api/clout/packages/:packageId
GET  /api/internal/opportunities
GET  /api/internal/operator/session
POST /api/internal/opportunities/:oppHash/compile
POST /api/internal/opportunities/:oppHash/approve
GET  /health
```

Every state-changing product route requires an `Idempotency-Key`. Internal routes additionally require `Authorization: Bearer ...` with the secret `CLOUT_OPERATOR_TOKEN`. Analytics events use their bounded `event_id` for replay protection when supplied.

Approval creates a random private-package delivery token. Only its SHA-256 digest is stored. The raw token is returned once in the successful operator response and is never persisted in the idempotency replay body. Private package retrieval requires that dedicated token in the `Authorization` header; the operator token is not accepted as a package-delivery credential. `OpportunitySession` is used only as a per-opportunity approval lock.

The Whop route is a disabled V0 receiver stub. It verifies a bounded signed envelope, deduplicates by event hash, records a receipt, enqueues a metadata-only message, and returns `202`. It does not create a purchase, grant access, or enable paid behavior.

## Cloudflare resources

The checked-in configuration names only the intended isolated resources:

```text
D1        clout_chaser_v0
R2        clout-sources
R2        clout-packages
R2        clout-receipts
R2        clout-public
Queue     clout-ingest-q
Queue     clout-classify-q
Queue     clout-score-q
Queue     clout-compile-q
Queue     clout-receipt-q
Queue     clout-notify-q
Queue     clout-deadletter-q
Workflow  create-opportunity-workflow
DO        OpportunitySession
Worker    clout-chaser-v0-api
Domain    api.clout.prime88.studio
```

Raw or user-submitted source bodies go only to `clout-sources`. Generated private package objects go to `clout-packages`. Private and public-safe receipt JSON goes to `clout-receipts`. Only approved share JSON, thumbnails, OG images, and other public card assets belong in `clout-public`.

`env.preview` uses distinct `-preview` Worker, R2, Queue, DLQ, and Workflow names, keeps the already-provisioned preview D1 ID, enables `workers.dev`, and declares no production custom-domain route. Those new preview R2 buckets and Queue bindings must be provisioned before the updated preview Worker can be deployed.

The production D1 ID is deliberately absent until the real database is provisioned. No fake resource ID or secret is included. `schema.sql` contains the locked minimum data contract. `migrations/` is the operational superset used by this V0 Worker, including immutable receipts, private delivery grants, append-only events, and webhook deduplication.

## Local verification

```powershell
npm install
npm run check
```

`npm run check` generates Wrangler binding types, performs strict TypeScript checking, runs unit tests, and produces a local dry-run bundle. It does not deploy.

Before any deployment, provision the exact resources, add the returned D1 ID to `wrangler.jsonc`, apply every pending migration in `migrations/`, and set the operator token interactively:

```powershell
npx wrangler secret put CLOUT_OPERATOR_TOKEN
npx wrangler secret put CLOUT_WHOP_WEBHOOK_SECRET
```

Apply every pending migration, including the private-delivery and CRM-trial migration. For isolated preview commands, add `--env preview` and provision only the names declared in that environment.

Do not place the token in source, Wrangler variables, shell history, or `.dev.vars` committed to Git.

# Third-party notices

This repository was authored for Clout Chaser V0. The following MIT-licensed Vercel projects were reviewed as donor references. Their code was not accepted as operational truth, and their storage, authentication, email, Slack, and workflow assumptions were not transplanted wholesale.

## Operator-supplied Clout Chaser identity assets

- Public mascot source: `9A22E00C-47A7-4448-895B-B2D674B7CAAD.png`
- Public repository asset: `public/clout-chaser-mascot.png`
- SHA-256: `E48FE2909F1ACB5FEA6CE1F2514AB776A762E8BE8D7B988B6E656DBA474DBE09`
- Custody: supplied by the Prime 88 operator and designated as the Clout Chaser mascot for this build.
- Palette reference only: `2EB4561D-CDF4-4D37-9253-DBB59AEEEDE1.png`
- Palette-reference SHA-256: `6F07C3589E7BCDC4785DB9FE5FA2712CC8C175FD16DED2BF80CDBF290DE33EEE`
- The palette reference is not copied into or served by the public application.

## Lead Agent

- Copyright: Vercel, Inc. and contributors
- Repository: `https://github.com/vercel-labs/lead-agent`
- Reviewed commit: `5b273e0cc7b1f2872d372cbecda13043a7267ede`
- License: MIT
- Patterns reviewed: typed intake form, request boundary, durable workflow decomposition, and explicit human approval.
- Excluded: stub CRM functions, canned research output, optional approval bypasses, and direct email behavior.

## Next.js Image Gallery / Vercel Blob example

- Copyright: Vercel, Inc. and contributors
- Repository: `https://github.com/vercel/next.js/tree/canary/examples/with-vercel-blob`
- Reviewed commit: `020d79bb273364f7af8a6ce23ddf722fb790064b`
- License: MIT
- Patterns reviewed: responsive proof galleries, image dimensions, blur placeholders, share pages, and per-item metadata.
- Excluded: Vercel Blob storage contracts and legacy Pages Router implementation.

The full text of each MIT license remains available in the named upstream repository at the pinned revision.

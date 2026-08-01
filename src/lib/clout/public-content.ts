export type EditorialPage = {
  title: string;
  description: string;
  eyebrow: string;
  lead: string;
  sections: readonly {
    title: string;
    body?: string;
    paragraphs?: readonly string[];
    items?: readonly string[];
  }[];
};

export const docsPages = {
  "how-it-works": {
    title: "How Clout Chaser works",
    description: "The source-to-receipt workflow used by the Clout Chaser pilot.",
    eyebrow: "Documentation / workflow",
    lead: "One source becomes one traceable opportunity, one reviewed package, and one public-safe receipt.",
    sections: [
      { title: "Source", body: "A user submits a public URL, an owned upload, or a clear niche description. Raw uploads remain private by default." },
      { title: "Opportunity", body: "The intake receives an Opportunity ID that keeps the source, review, package, and receipt connected without publishing protected material." },
      { title: "Signal review and score", body: "The pilot reviews timing, saturation, platform fit, creator fit, source quality, language opportunity, effort, and risk. Exact private weights are not published." },
      { title: "Package", body: "An operator compiles hooks, captions, scripts, clip targets, export notes, source notes, and risk notes for the selected creator lane." },
      { title: "Receipt and share", body: "Approved work receives a private record and a sanitized public receipt. The public page shows only an approved summary and a direct free-sample path." },
      { title: "Performance feedback", body: "Package owners can report whether an output was useful, late, off-niche, blocked by rights, or used successfully. Feedback improves workflow decisions; it does not rewrite old receipts." },
    ],
  },
  "opportunity-scores": {
    title: "Opportunity scores",
    description: "How to interpret Clout Chaser opportunity score bands without exposing private weights.",
    eyebrow: "Documentation / scores",
    lead: "An opportunity score is a timing-and-fit recommendation, not a promise of performance.",
    sections: [
      { title: "Timing", body: "How early, active, crowded, or expired the observable format appears to be." },
      { title: "Saturation", body: "Whether the relevant feed or language lane still has room for a distinct version." },
      { title: "Platform and creator fit", body: "Whether the opportunity suits the selected platform, audience, creator type, and production style." },
      { title: "Source quality", body: "Whether source context is clear enough to review, attribute, and transform responsibly." },
      { title: "Language opportunity", body: "Whether translation, bilingual packaging, or cross-market context creates a useful opening." },
      { title: "Effort and risk", body: "Production cost, rights complexity, factual risk, and platform-policy concerns can reduce or hold a recommendation." },
      { title: "Recommendations", items: ["PACKAGE NOW — timely enough to compile", "WATCH — useful but not ready", "RESEARCH — more source context required", "HOLD — operator or rights review required", "REJECT — not suitable for this workflow"] },
    ],
  },
  receipts: {
    title: "Receipts",
    description: "What a Clout Chaser receipt proves and what remains private.",
    eyebrow: "Documentation / proof",
    lead: "Receipts connect approved outputs to stable records without exposing private sources, weights, or operator notes.",
    sections: [
      { title: "What a receipt proves", items: ["The opportunity identifier", "The approved package relationship", "The receipt version and creation time", "The public visibility state", "The sanitized summary published at that route"] },
      { title: "What it does not prove", items: ["Guaranteed virality or revenue", "Ownership of third-party material", "Permission to reuse every source", "The complete private score or source set", "That an old source remains online"] },
      { title: "Public fields", body: "Public receipts may include the opportunity ID, title, timing state, platform and language fit, score band, why-now summary, package counts, safe source note, risk note, and limitations." },
      { title: "Private fields", body: "Exact sources, detailed scores, customer identity, full package content, provider metadata, operator notes, and workflow events remain within authorized package and operator boundaries." },
      { title: "Corrections", body: "Published receipts are not silently overwritten. A corrected record supersedes the earlier receipt while preserving the prior version." },
    ],
  },
  sources: {
    title: "Sources",
    description: "How source material enters and remains bounded inside Clout Chaser.",
    eyebrow: "Documentation / sources",
    lead: "A source is context for review. Submission does not transfer ownership or guarantee that the source can be reused.",
    sections: [
      { title: "User-submitted sources", body: "Links, uploads, and descriptions supplied by the requester. The requester must have the right to submit private or owned material." },
      { title: "Public sources", body: "Public availability does not mean public-domain ownership. Platform rules, licensing, attribution, and transformation still matter." },
      { title: "Owned and licensed sources", body: "Owned or licensed media can support a lower-risk package when the requester can verify the relevant rights." },
      { title: "Source snapshots", body: "The service may preserve a private hash, metadata snapshot, thumbnail, transcript, or operator note needed to keep the workflow traceable." },
      { title: "Unavailable or removed sources", body: "A receipt can remain as a record after the original source becomes unavailable. The receipt does not promise continuing access to third-party material." },
    ],
  },
  rights: {
    title: "Rights and responsible use",
    description: "Source ownership, transformation, permissions, and platform responsibility for Clout Chaser users.",
    eyebrow: "Documentation / rights",
    lead: "Clout Chaser helps package an opportunity. It does not grant rights to third-party source material.",
    sections: [
      { title: "Ownership", body: "Creators retain responsibility for confirming ownership, licenses, releases, and permissions for material they publish." },
      { title: "Transformation", body: "A new hook, caption, edit plan, or script does not automatically make the underlying media lawful to reuse." },
      { title: "Platform rules", body: "Users remain responsible for each platform’s copyright, music, disclosure, impersonation, synthetic-media, and community rules." },
      { title: "Safer source lanes", items: ["Original media", "Properly licensed media", "Public-domain material", "Material used with documented permission", "Sources used only as research context rather than copied output"] },
      { title: "Rights concerns", body: "Flag a package when attribution is unclear, a claim may be harmful, a source appears private, or a requested transformation exceeds known permission." },
    ],
  },
  "creator-guide": {
    title: "Creator guide",
    description: "How creators can choose sources, interpret timing, and adapt Clout Chaser packages.",
    eyebrow: "Documentation / creators",
    lead: "Use the package as a structured starting point. Keep your own voice, verify the source, and make the output genuinely yours.",
    sections: [
      { title: "Choose a useful source", body: "Bring a specific post, clip, format, audience question, or niche signal—not a request to copy another creator wholesale." },
      { title: "Read why-now first", body: "The why-now summary explains the timing and fit. If that logic no longer holds, pause before producing." },
      { title: "Adapt the hooks", body: "Rewrite suggestions into your own voice, facts, audience context, and platform format. Do not publish a package blindly." },
      { title: "Verify before posting", items: ["Check facts and names", "Confirm source and music rights", "Review disclosures", "Check the platform rules", "Remove claims you cannot support"] },
      { title: "Return feedback", body: "Report whether the package was useful, wrong-niche, too late, blocked by a source issue, revised, or used successfully." },
    ],
  },
  "clipper-guide": {
    title: "Clipper guide",
    description: "How clippers can use source notes, timestamps, and cut guidance responsibly.",
    eyebrow: "Documentation / clippers",
    lead: "Good cut notes make a source easier to navigate; they do not replace permission, attribution, or editorial judgment.",
    sections: [
      { title: "Choose the clip lane", body: "Use material you own, license, have permission to transform, or can lawfully reference under the rules that apply to you." },
      { title: "Use timestamps as guidance", body: "Timestamps identify candidate moments. Recheck the source and surrounding context before cutting." },
      { title: "Make safe cut notes", items: ["Preserve context around claims", "Avoid misleading speaker edits", "Mark uncertain names or facts", "Separate quotation from narration", "Record required attribution"] },
      { title: "Avoid source confusion", body: "Keep the original source record separate from generated hooks, titles, and captions. Never present generated wording as a direct quote." },
      { title: "Preserve attribution", body: "Keep creator, publisher, speaker, and original-link information available wherever the source or license requires it." },
    ],
  },
  "business-guide": {
    title: "Business guide",
    description: "How businesses can turn attention opportunities into campaigns and follow-up.",
    eyebrow: "Documentation / business",
    lead: "Finding attention is step one. Assigning, approving, publishing, and following up turns the opportunity into operating work.",
    sections: [
      { title: "Turn an opportunity into a campaign", body: "Define the offer, audience, channel, owner, deadline, source rights, and measurable next action before production." },
      { title: "Assign follow-up", body: "Route replies, leads, bookings, and partner responses to a named owner rather than leaving them in platform inboxes." },
      { title: "Track response", items: ["Package selected", "Asset produced", "Publish time", "Replies and inquiries", "Lead or booking outcome", "Revision or hold reason"] },
      { title: "Connect Operations Studio", body: "Eligible business and team users can start an Operations Studio trial to manage content opportunities, campaigns, leads, replies, and follow-ups in one company workspace." },
    ],
  },
} as const satisfies Record<string, EditorialPage>;

export type DocsSlug = keyof typeof docsPages;

export const legalPages = {
  terms: {
    title: "Terms of use",
    description: "Terms governing the Clout Chaser early-access pilot.",
    eyebrow: "Legal / terms",
    lead: "These terms govern access to the Clout Chaser pilot published by Mediator Solutions LLC.",
    sections: [
      { title: "Pilot service", body: "Clout Chaser is an early-access, operator-reviewed attention-intelligence service. Features, capacity, eligibility, and pricing may change as the pilot develops." },
      { title: "No performance guarantee", body: "Opportunity scores and packages indicate timing and fit. They do not guarantee virality, reach, revenue, engagement, platform placement, or any other outcome." },
      { title: "Your submissions", body: "You must have the right to submit source material and instructions. You remain responsible for the legality, accuracy, permissions, and platform compliance of anything you publish." },
      { title: "Third-party material", body: "Clout Chaser does not own third-party sources and does not grant a license to reuse them. Links, notes, and transformation ideas are not a substitute for permission." },
      { title: "Packages and receipts", body: "Private package material is limited to authorized users. Public receipts contain sanitized summaries and may be superseded or revoked when a correction, rights issue, or safety concern requires it." },
      { title: "Acceptable use", body: "Use of the service is also subject to the Acceptable Use Policy and Source Policy. Access may be held or ended when a request creates legal, safety, privacy, or operational risk." },
      { title: "Liability and changes", body: "The pilot is provided on an as-available basis to the extent allowed by law. These terms may be updated as the service, commercial offer, and jurisdictional requirements mature." },
    ],
  },
  privacy: {
    title: "Privacy notice",
    description: "How the Clout Chaser pilot handles account, source, package, and analytics data.",
    eyebrow: "Legal / privacy",
    lead: "Raw sources are private by default. Public receipt pages contain only sanitized, approved fields.",
    sections: [
      { title: "Information collected", items: ["Contact and creator-lane information", "Source URLs, uploads, and niche descriptions", "Package requests and operator review records", "Receipt and share activity", "Technical, attribution, and product analytics events"] },
      { title: "How information is used", body: "Information supports intake, source review, package preparation, delivery, service security, capacity management, product improvement, and eligible Prime 88 follow-up." },
      { title: "Public and private separation", body: "Private sources, identities, packages, score details, and operator notes are not intentionally included in public receipts. Public pages use approved summaries only." },
      { title: "Analytics", body: "Analytics is limited to allowlisted product events and properties. Email addresses, phone numbers, source bodies, tokens, and free-form form content are not intentionally sent as analytics properties." },
      { title: "Retention and removal", body: "Records may be retained to preserve receipts, resolve disputes, prevent abuse, and meet legal or operational requirements. Source access may be restricted or removed while a receipt record remains." },
      { title: "Security and privacy reports", body: "Report a security or privacy issue to security@mediatorsolutions.io. Do not send sensitive source material in the first message." },
    ],
  },
  "acceptable-use": {
    title: "Acceptable Use Policy",
    description: "Prohibited and restricted uses of the Clout Chaser early-access pilot.",
    eyebrow: "Legal / acceptable use",
    lead: "Use Clout Chaser to create responsible, source-aware work—not to automate abuse or disguise prohibited conduct.",
    sections: [
      { title: "Do not use the service for", items: ["Harassment, threats, stalking, or targeted abuse", "Non-consensual intimate or exploitative material", "Fraud, impersonation, phishing, or deceptive commercial claims", "Doxxing or publication of private personal information", "Malware, credential theft, or platform manipulation", "Unlawful discrimination or harmful targeting", "Automated posting or scraping that violates platform rules"] },
      { title: "Rights and attribution", body: "Do not submit material you are not permitted to share or use packages to evade copyright, licensing, disclosure, or attribution requirements." },
      { title: "Claims and synthetic media", body: "Clearly review factual claims and required synthetic-media disclosures. High-risk, harmful, or unsupported claims may be held or rejected." },
      { title: "Enforcement", body: "Requests may be delayed, limited, held, or rejected. Access may be suspended when activity threatens users, sources, platforms, the service, or third parties." },
    ],
  },
  "source-policy": {
    title: "Source Policy",
    description: "Rules for submitting, reviewing, storing, and referencing source material.",
    eyebrow: "Legal / sources",
    lead: "A source starts a review. It does not transfer ownership, create permission, or guarantee public availability.",
    sections: [
      { title: "Accepted source lanes", items: ["User-owned media", "Properly licensed media", "Public URLs used as review context", "Public-domain material", "Niche or format descriptions without an upload"] },
      { title: "Private by default", body: "Raw uploads, complete source sets, internal notes, and private package fields remain outside public receipt pages unless the owner explicitly approves a public-safe preview." },
      { title: "Source records", body: "The service may preserve hashes, timestamps, metadata, snapshots, or notes needed to trace what was reviewed and which package or receipt resulted." },
      { title: "Unavailable sources", body: "Third-party sources may be removed, changed, geo-blocked, or become inaccessible. A receipt can preserve the record relationship without republishing the source." },
      { title: "Removal and holds", body: "A source or public preview may be held or removed when ownership, consent, privacy, safety, or platform-policy concerns arise. Related private records may be retained where legally and operationally appropriate." },
    ],
  },
  "enterprise-compliance": {
    title: "Enterprise Infrastructure & Data Sovereignty",
    description: "Institutional compliance, multi-tenant cloud isolation, edge SLAs, and sovereign data posture.",
    eyebrow: "Legal / enterprise posture",
    lead: "Governing the global edge infrastructure, multi-tenant cloud execution, and zero-trust data sovereignty across Mediator Solutions LLC and Prime 88 operating networks.",
    sections: [
      { title: "1. Global Multi-Tenant Edge Architecture", body: "The Clout Chaser infrastructure operates across a distributed edge topology spanning over 275+ global POP locations. Execution occurs in isolated sandboxed workers. Data transmission between edge nodes and tenant datastores is encrypted in-transit using TLS 1.3 and at-rest using AES-256-GCM." },
      { title: "2. Cryptographic Proof & Merkle Tree Receipts", body: "Package outputs generated via the content package compilation engine are sealed into deterministic Merkle Trees. The resulting root hashes construct tamper-evident BlackBox System (BBS) receipts. Hashes verify mathematical origin without disclosing underlying source payloads or proprietary operator weights." },
      { title: "3. Third-Party Compute & Partner Disclaimers", body: "The service utilizes enterprise infrastructure, carrier transport, and GPU compute provided by Cloudflare, NVIDIA, AWS, Microsoft Azure, RunPod, T-Mobile, AT&T, Oracle, and Vodafone. Trademarks, service marks, and brand assets displayed on the service are the sole property of their respective corporate owners and imply no direct endorsement or partnership unless governed by executed bilateral SLA contracts." },
      { title: "4. Data Sovereignty & Regional Compliance", body: "Customer payloads and tenant records comply with applicable global data privacy frameworks including EU GDPR (General Data Protection Regulation), CCPA/CPRA, and UK Data Protection Act 2018. Multi-region routing enforces data residency boundaries where configured by enterprise agreement." },
      { title: "5. Service Level Agreements (SLA) & Availability", body: "Standard public early-access tiers operate on an as-available basis with zero implied uptime guarantees. Enterprise custom contracts operate under dedicated 99.9% uptime SLAs, priority edge queue allocation, and custom disaster recovery protocols governed by bilateral Service Level Agreements." },
    ],
  },
  "sovereign-disclaimer": {
    title: "Sovereign Algorithmic Signal Disclaimer",
    description: "Non-reliance disclaimers, Hawkes process attention modeling bounds, and algorithmic execution posture.",
    eyebrow: "Legal / algorithmic disclaimers",
    lead: "Official disclaimers regarding attention intelligence models, virality scores, financial non-reliance, and autonomous agent operations.",
    sections: [
      { title: "1. Non-Reliance on Predictive Virality Models", body: "All Hawkes Process attention decay rates, S-Rank virality scores, and opportunity window predictions are statistical approximations derived from public signal inputs. They do not constitute financial, investment, legal, or guaranteed commercial advice. Mediator Solutions LLC accepts zero liability for commercial decisions made in reliance upon compiled outputs." },
      { title: "2. Autonomous Agent Execution Boundaries", body: "Agentic surfaces and autonomous desk operators (including Olivia and Brother K) act as automated interfaces processing user inputs. Outputs are generated programmatically and do not reflect binding corporate commitments or legal warranties by Mediator Solutions LLC." },
      { title: "3. Third-Party Media & Intellectual Property Boundaries", body: "Signal parsing may reference public trends, celebrity entities, and cultural signals across US, European, LatAm, Asian, Middle Eastern, and African markets. Users retain sole legal responsibility for securing all necessary copyright licenses, music clearances, and trademark permissions prior to publishing derivative content." },
      { title: "4. Limitation of Liability & Indemnification", body: "To the maximum extent permitted by applicable law, Mediator Solutions LLC, Prime 88 Studio, and its affiliates shall not be liable for direct, indirect, incidental, consequential, or punitive damages arising from the use or inability to use the service, compiled packages, or BBS receipts." },
    ],
  },
  cookies: {
    title: "Cookie & Tracking Technologies Policy",
    description: "Comprehensive disclosures on cookies, local storage, edge analytics, and zero-sale tracking policies.",
    eyebrow: "Legal / cookie disclosure",
    lead: "Apple and Google compliant transparency notice regarding session tokens, edge performance storage, and analytics disclosures.",
    sections: [
      { title: "1. Essential Operational Cookies", body: "We utilize strictly necessary first-party session tokens and Cloudflare edge security cookies (e.g. __cf_bm, cf_clearance) required for rate limiting, DDoS mitigation, and cryptographically signed session validation. These tokens cannot be disabled as they maintain core system security." },
      { title: "2. Product Analytics & Zero-Sale Guarantee", body: "We collect anonymized product event telemetry via PostHog to monitor edge response times and UI performance. We maintain a strict Zero-Sale Data Guarantee: personal identity, raw source uploads, email addresses, and payment data are never sold, rented, or monetized for third-party commercial marketing." },
      { title: "3. Managing Local Preferences", body: "Users may adjust browser settings to block or delete local storage objects. Blocking essential cookies may disrupt access to protected opportunity packages, BBS receipts, and Whop member authorizations." },
    ],
  },
  security: {
    title: "Information Security & Vulnerability Policy",
    description: "SOC 2 Type II alignment, zero-trust edge architecture, and coordinated disclosure procedures.",
    eyebrow: "Legal / security posture",
    lead: "Enterprise security posture governing SOC 2 alignment, TLS 1.3 encryption, and vulnerability disclosure protocols.",
    sections: [
      { title: "1. Enterprise Security Posture", body: "Our systems enforce SOC 2 Type II and ISO/IEC 27001 security controls. Edge compute workers execute in hardened V8 isolates. Data in-transit is secured via TLS 1.3 with HSTS preloading enabled across all subdomains." },
      { title: "2. Coordinated Vulnerability Disclosure", body: "We welcome security research from the global developer community. If you discover a potential vulnerability in our APIs or edge infrastructure, report your findings directly to security@mediatorsolutions.io. We review all valid reports within 48 business hours." },
    ],
  },
  dmca: {
    title: "DMCA & Copyright Takedown Procedure",
    description: "Official Digital Millennium Copyright Act agent contact, notice submission, and counter-notice rules.",
    eyebrow: "Legal / copyright agent",
    lead: "Formal procedures for submitting DMCA copyright infringement notifications and counter-notices under 17 U.S.C. § 512.",
    sections: [
      { title: "1. Designated Copyright Agent", body: "Under the Digital Millennium Copyright Act (17 U.S.C. § 512(c)), notifications of claimed copyright infringement must be sent in writing to our Designated Agent at legal@mediatorsolutions.io with the subject line 'DMCA Copyright Notice'." },
      { title: "2. Required Notice Contents", body: "A valid DMCA notice must include: (a) physical or electronic signature of the copyright owner; (b) identification of the copyrighted work claimed to be infringed; (c) exact URL or receipt location of the material; (d) contact information; (e) statement of good faith belief; and (f) statement under penalty of perjury that the information is accurate." },
      { title: "3. Counter-Notification & Restoration", body: "If material you submitted was removed due to a DMCA notice, you may file a written counter-notification containing your signature, identification of the removed material, statement under penalty of perjury of good faith belief that material was removed by mistake, and consent to federal court jurisdiction." },
    ],
  },
} as const satisfies Record<string, EditorialPage>;

export type LegalSlug = keyof typeof legalPages;



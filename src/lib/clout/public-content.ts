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
} as const satisfies Record<string, EditorialPage>;

export type LegalSlug = keyof typeof legalPages;

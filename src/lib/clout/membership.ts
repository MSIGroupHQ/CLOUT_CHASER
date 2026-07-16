export const membershipColumns = [
  { key: "guest", label: "Guest", detail: "No account" },
  { key: "sample", label: "Free sample", detail: "One reviewed source" },
  { key: "proof", label: "Proof pack", detail: "One-time delivery" },
  { key: "creator", label: "Creator", detail: "Logged-in membership" },
  { key: "clipper", label: "Clipper", detail: "Logged-in membership" },
  { key: "studio", label: "Studio", detail: "Team membership" },
  { key: "business", label: "Business", detail: "Prime 88 path" },
] as const;

export type MembershipKey = (typeof membershipColumns)[number]["key"];

type MembershipRow = {
  feature: string;
  values: Record<MembershipKey, string>;
};

export const membershipRows: readonly MembershipRow[] = [
  {
    feature: "Public opportunities, receipts, and docs",
    values: { guest: "View", sample: "View", proof: "View", creator: "View", clipper: "View", studio: "View", business: "View" },
  },
  {
    feature: "Source review and Opportunity ID",
    values: { guest: "—", sample: "1", proof: "1", creator: "Credit-based", clipper: "Credit-based", studio: "Shared credits", business: "Custom" },
  },
  {
    feature: "Why-now, timing, and platform fit",
    values: { guest: "Public preview", sample: "Preview", proof: "Full", creator: "Full", clipper: "Full", studio: "Full", business: "Full" },
  },
  {
    feature: "Hooks, titles, and captions",
    values: { guest: "Public preview", sample: "Short preview", proof: "Expanded", creator: "Included", clipper: "Advanced", studio: "Included", business: "Custom" },
  },
  {
    feature: "Scripts",
    values: { guest: "—", sample: "Short preview", proof: "Included", creator: "Included", clipper: "Included", studio: "Included", business: "Custom" },
  },
  {
    feature: "Clip targets and timestamp guidance",
    values: { guest: "—", sample: "—", proof: "By package", creator: "By package", clipper: "Included", studio: "Included", business: "Custom" },
  },
  {
    feature: "Export specs, subtitles, and delivery formats",
    values: { guest: "—", sample: "Notes", proof: "Included", creator: "Exports", clipper: "Advanced", studio: "Included", business: "Custom" },
  },
  {
    feature: "Bilingual variants",
    values: { guest: "Public preview", sample: "On request", proof: "On request", creator: "By package", clipper: "By package", studio: "By package", business: "Custom" },
  },
  {
    feature: "Source and risk notes",
    values: { guest: "Sanitized", sample: "Sanitized", proof: "Included", creator: "Included", clipper: "Included", studio: "Included", business: "Included" },
  },
  {
    feature: "Private package view",
    values: { guest: "—", sample: "Delivery link", proof: "Included", creator: "Included", clipper: "Included", studio: "Included", business: "Included" },
  },
  {
    feature: "Public-safe proof receipt",
    values: { guest: "View", sample: "Included", proof: "Included", creator: "Included", clipper: "Included", studio: "Included", business: "Included" },
  },
  {
    feature: "Operator review",
    values: { guest: "—", sample: "Included", proof: "Included", creator: "Risk-based", clipper: "Risk-based", studio: "Risk-based", business: "Managed" },
  },
  {
    feature: "Saved opportunities and package history",
    values: { guest: "—", sample: "—", proof: "Delivery only", creator: "Included", clipper: "Included", studio: "Included", business: "Included" },
  },
  {
    feature: "Recurring package credits",
    values: { guest: "—", sample: "—", proof: "—", creator: "Included", clipper: "Included", studio: "Shared", business: "Custom" },
  },
  {
    feature: "Analytics",
    values: { guest: "—", sample: "—", proof: "—", creator: "Basic", clipper: "Advanced", studio: "Team", business: "Pipeline" },
  },
  {
    feature: "Shared creators, campaigns, and approvals",
    values: { guest: "—", sample: "—", proof: "—", creator: "—", clipper: "—", studio: "Included", business: "Custom" },
  },
  {
    feature: "Client folders",
    values: { guest: "—", sample: "—", proof: "—", creator: "—", clipper: "—", studio: "Included", business: "Custom" },
  },
  {
    feature: "Operations Studio pipeline",
    values: { guest: "—", sample: "Eligible later", proof: "Eligible later", creator: "Eligible", clipper: "Eligible", studio: "Eligible", business: "Managed setup" },
  },
];

export const accessTypes = [
  {
    label: "Guest",
    title: "Browse without an account.",
    body: "Public opportunity previews, public-safe receipts, documentation, pricing, and source policy stay open.",
  },
  {
    label: "One-off",
    title: "Use Clout Chaser without joining a plan.",
    body: "A free sample or Proof Pack is a bounded delivery. It is not a recurring membership and does not imply lifetime access.",
  },
  {
    label: "Member",
    title: "Sign in for continuity.",
    body: "Creator, Clipper, and Studio memberships add saved work, recurring credits, exports, analytics, and team features by plan.",
  },
  {
    label: "Operator",
    title: "Internal review access only.",
    body: "Operator entitlement belongs to Prime 88 delivery staff. It is not a public plan, guest role, or lifetime Clout Chaser purchase.",
  },
] as const;

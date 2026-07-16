export const CloutEvents = {
  LANDING_VIEW: "cc_landing_view",
  SAMPLE_REQUESTED: "cc_sample_requested",
  SOURCE_SUBMITTED: "cc_source_submitted",
  OPPORTUNITY_CREATED: "cc_opportunity_created",
  PACKAGE_COMPILED: "cc_package_compiled",
  RECEIPT_CREATED: "cc_receipt_created",
  RECEIPT_VIEWED: "cc_receipt_viewed",
  SHARE_CLICKED: "cc_share_clicked",
  SAMPLE_CTA_CLICKED: "cc_sample_cta_clicked",
  CHECKOUT_STARTED: "cc_checkout_started",
  PURCHASE_COMPLETED: "cc_purchase_completed",
  CRM_TRIAL_CLICKED: "cc_crm_trial_clicked",
  CRM_TRIAL_STARTED: "cc_crm_trial_started",
  PACKAGE_FEEDBACK: "cc_package_feedback",
} as const;

export const CLOUT_EVENT_NAMES = [
  ...Object.values(CloutEvents),
  "cc_package_compile_started",
  "cc_export_created",
] as const;

export type CloutEventName = (typeof CLOUT_EVENT_NAMES)[number];

export type SourceType = "url" | "mp4" | "trend" | "description";
export type Platform =
  | "tiktok"
  | "reels"
  | "shorts"
  | "x"
  | "youtube"
  | "other";
export type CreatorType =
  | "clipper"
  | "creator"
  | "fan_page"
  | "business"
  | "agency"
  | "studio"
  | "other";
export type LanguageMode = "english" | "spanish" | "bilingual";

export type CloutEventProperties = Partial<{
  opp_hash: string;
  ccid: string;
  receipt_id: string;
  source_type: SourceType;
  niche: string;
  platform: Platform;
  language: LanguageMode;
  persona: CreatorType;
  score_band: string;
  saturation_state: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  ref: string;
  crm_trial_eligible: boolean;
  authenticated: boolean;
  company_id: string;
  offer_id: string;
  experiment_variant: string;
}>;

export type CloutEventEnvelope = {
  name: CloutEventName;
  properties: CloutEventProperties;
  event_id: string;
  occurred_at: string;
};

export type SampleRequest = {
  name: string;
  email: string;
  handle?: string;
  platform: Platform;
  creatorType: CreatorType;
  niche: string;
  sourceUrl: string;
  language: LanguageMode;
  intent: string;
  sourceType: SourceType;
};

export type SampleSubmission = {
  request_id?: string;
  ccid?: string;
  opp_hash?: string;
  receipt_id?: string;
  package_id?: string;
  status?: string;
  public_url?: string;
};

export type PublicReceipt = {
  oppHash: string;
  receiptId: string;
  title: string;
  entity?: string;
  lane?: string;
  score?: number;
  recommendation?: string;
  whyNow: string;
  platforms: string[];
  languageLane: string;
  packagePreview: string[];
  hook?: string;
  caption?: string;
  script?: string;
  titleOptions?: string[];
  carouselOutline?: string[];
  exportSpecs?: string[];
  recommendedFormats?: string[];
  sourceNote: string;
  riskNote: string;
  createdAt: string;
  scoreBand?: string;
  crmTrialEligible?: boolean;
  mode: "live" | "demo";
};

export type ApiFailureKind =
  | "not_configured"
  | "unauthorized"
  | "not_found"
  | "network"
  | "invalid_response"
  | "server";

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; kind: ApiFailureKind; message: string; status?: number };

export type ReceiptLookup =
  | { state: "ready"; receipt: PublicReceipt }
  | { state: "pending" | "unavailable" | "not_found"; receipt: null };

export type ManualPackageInput = {
  title: string;
  why_now: string;
  hooks: string[];
  captions: string[];
  short_scripts: string[];
  clip_targets: string[];
  export_specs: string[];
  bilingual_variants: string[];
  source_notes: string[];
  risk_notes: string[];
  next_action: string;
};

export type OperatorOpportunity = {
  id: string;
  opp_hash: string;
  title: string;
  niche: string;
  platform: string;
  language_mode: string;
  creator_type: string;
  status: string;
  created_at: string;
  queued_at?: string | null;
  compiled_at?: string | null;
  approved_at?: string | null;
  name_or_handle?: string;
  email?: string;
  source_url?: string;
  intent?: string;
};

export type PrivatePackage = {
  packageId: string;
  opportunityHash: string;
  status: string;
  title: string;
  whyNow: string;
  packageType?: string;
  recommendedAction: string;
  primaryPlatform?: string;
  secondaryPlatforms: string[];
  language?: string;
  contentType?: string;
  hooks: string[];
  captions: string[];
  scripts: string[];
  clipTargets: string[];
  exportSpecs: string[];
  bilingualVariants: string[];
  sourceNotes: string[];
  riskNotes: string[];
  receiptId?: string;
};

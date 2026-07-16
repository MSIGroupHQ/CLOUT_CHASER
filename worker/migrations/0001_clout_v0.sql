PRAGMA foreign_keys = ON;

CREATE TABLE source_requests (
  id TEXT PRIMARY KEY,
  name_or_handle TEXT NOT NULL CHECK (length(name_or_handle) BETWEEN 1 AND 80),
  email TEXT NOT NULL CHECK (length(email) BETWEEN 3 AND 254),
  platform TEXT NOT NULL CHECK (platform IN ('tiktok', 'reels', 'shorts', 'x', 'youtube', 'other')),
  creator_type TEXT NOT NULL CHECK (creator_type IN ('clipper', 'creator', 'fan_page', 'business', 'agency', 'studio', 'other')),
  niche TEXT NOT NULL CHECK (length(niche) BETWEEN 2 AND 120),
  source_url TEXT,
  source_type TEXT NOT NULL CHECK (source_type IN ('url', 'mp4', 'trend', 'description', 'demo')),
  language_mode TEXT NOT NULL CHECK (language_mode IN ('en', 'es', 'bilingual')),
  intent TEXT NOT NULL CHECK (length(intent) BETWEEN 3 AND 600),
  source_artifact_key TEXT UNIQUE,
  source_content_type TEXT,
  source_size INTEGER CHECK (source_size IS NULL OR source_size BETWEEN 1 AND 20971520),
  source_file_hash TEXT CHECK (source_file_hash IS NULL OR length(source_file_hash) = 64),
  request_hash TEXT NOT NULL CHECK (length(request_hash) = 64),
  created_at TEXT NOT NULL
);

CREATE TABLE opportunities (
  id TEXT PRIMARY KEY,
  opp_hash TEXT NOT NULL UNIQUE,
  source_id TEXT NOT NULL REFERENCES source_requests(id),
  title TEXT NOT NULL CHECK (length(title) BETWEEN 3 AND 160),
  niche TEXT NOT NULL,
  platform TEXT NOT NULL,
  language_mode TEXT NOT NULL,
  creator_type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN (
    'OPERATOR_REVIEW_REQUIRED',
    'QUEUED_FOR_MANUAL_REVIEW',
    'MANUAL_PACKAGE_DRAFTED',
    'PUBLIC_RECEIPT_READY',
    'QUEUE_DELIVERY_FAILED'
  )),
  is_demo INTEGER NOT NULL DEFAULT 0 CHECK (is_demo IN (0, 1)),
  created_at TEXT NOT NULL,
  queued_at TEXT,
  compiled_at TEXT,
  approved_at TEXT
);

CREATE TABLE packages (
  id TEXT PRIMARY KEY,
  opportunity_id TEXT NOT NULL UNIQUE REFERENCES opportunities(id),
  output_json TEXT NOT NULL CHECK (json_valid(output_json)),
  artifact_key TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('DRAFT', 'APPROVED')),
  compiler_mode TEXT NOT NULL CHECK (compiler_mode IN ('MANUAL_OPERATOR', 'DEMO_FIXTURE')),
  created_at TEXT NOT NULL
);

CREATE TABLE receipts (
  id TEXT PRIMARY KEY,
  opportunity_id TEXT NOT NULL UNIQUE REFERENCES opportunities(id),
  package_id TEXT NOT NULL UNIQUE REFERENCES packages(id),
  receipt_hash TEXT NOT NULL UNIQUE CHECK (length(receipt_hash) = 64),
  public_payload_json TEXT NOT NULL CHECK (json_valid(public_payload_json)),
  public_artifact_key TEXT NOT NULL UNIQUE,
  public_visibility TEXT NOT NULL CHECK (public_visibility IN ('private', 'public_preview')),
  approval_mode TEXT NOT NULL CHECK (approval_mode IN ('MANUAL_OPERATOR', 'DEMO_FIXTURE')),
  created_at TEXT NOT NULL
);

CREATE TABLE share_surfaces (
  id TEXT PRIMARY KEY,
  opp_hash TEXT NOT NULL UNIQUE REFERENCES opportunities(opp_hash),
  package_id TEXT NOT NULL REFERENCES packages(id),
  receipt_id TEXT NOT NULL UNIQUE REFERENCES receipts(id),
  visibility TEXT NOT NULL CHECK (visibility IN ('private', 'public_preview')),
  created_at TEXT NOT NULL
);

CREATE TABLE idempotency_keys (
  key_hash TEXT PRIMARY KEY CHECK (length(key_hash) = 64),
  scope TEXT NOT NULL,
  request_hash TEXT NOT NULL CHECK (length(request_hash) = 64),
  subject_id TEXT NOT NULL,
  state TEXT NOT NULL CHECK (state IN ('IN_PROGRESS', 'COMPLETE', 'FAILED_RETRYABLE')),
  status_code INTEGER,
  response_json TEXT CHECK (response_json IS NULL OR json_valid(response_json)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE events (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  actor_type TEXT NOT NULL CHECK (actor_type IN ('PUBLIC_USER', 'OPERATOR', 'SYSTEM', 'DEMO_FIXTURE')),
  subject_type TEXT NOT NULL,
  subject_id TEXT NOT NULL,
  payload_hash TEXT NOT NULL CHECK (length(payload_hash) = 64),
  payload_json TEXT NOT NULL CHECK (json_valid(payload_json)),
  created_at TEXT NOT NULL
);

CREATE INDEX idx_opportunities_status_created ON opportunities(status, created_at);
CREATE INDEX idx_source_requests_email_created ON source_requests(email, created_at);
CREATE INDEX idx_events_subject_created ON events(subject_type, subject_id, created_at);
CREATE INDEX idx_events_type_created ON events(event_type, created_at);
CREATE INDEX idx_idempotency_scope_updated ON idempotency_keys(scope, updated_at);

CREATE TRIGGER prevent_event_update
BEFORE UPDATE ON events
BEGIN
  SELECT RAISE(ABORT, 'events are append-only');
END;

CREATE TRIGGER prevent_event_delete
BEFORE DELETE ON events
BEGIN
  SELECT RAISE(ABORT, 'events are append-only');
END;

CREATE TRIGGER prevent_receipt_update
BEFORE UPDATE ON receipts
BEGIN
  SELECT RAISE(ABORT, 'receipts are immutable');
END;

CREATE TRIGGER prevent_receipt_delete
BEFORE DELETE ON receipts
BEGIN
  SELECT RAISE(ABORT, 'receipts are immutable');
END;

CREATE TRIGGER prevent_approved_package_update
BEFORE UPDATE ON packages
WHEN OLD.status = 'APPROVED'
BEGIN
  SELECT RAISE(ABORT, 'approved packages are immutable');
END;

CREATE TRIGGER prevent_approved_package_delete
BEFORE DELETE ON packages
WHEN OLD.status = 'APPROVED'
BEGIN
  SELECT RAISE(ABORT, 'approved packages are immutable');
END;

-- Explicit demonstration fixture. It is not a live signal, customer, source, score, or performance claim.
INSERT INTO source_requests (
  id, name_or_handle, email, platform, creator_type, niche, source_url, source_type,
  language_mode, intent, request_hash, created_at
) VALUES (
  'src_demo_7qk2',
  'Clout Chaser Demo Fixture',
  'demo@invalid.example',
  'other',
  'creator',
  'Demo',
  NULL,
  'demo',
  'bilingual',
  'Demonstrate the public-safe receipt format without asserting a live market result.',
  '3ff1813aa3d3332f7c55ece344decceddecf1aa01bced026254ff70235c4d79b',
  '2026-07-16T00:00:00.000Z'
);

INSERT INTO opportunities (
  id, opp_hash, source_id, title, niche, platform, language_mode, creator_type,
  status, is_demo, created_at, queued_at, compiled_at, approved_at
) VALUES (
  'opp_demo_7qk2',
  'CC-DEMO-7QK2',
  'src_demo_7qk2',
  'Clout Chaser receipt format demonstration',
  'Demo',
  'other',
  'bilingual',
  'creator',
  'PUBLIC_RECEIPT_READY',
  1,
  '2026-07-16T00:00:00.000Z',
  '2026-07-16T00:00:00.000Z',
  '2026-07-16T00:00:00.000Z',
  '2026-07-16T00:00:00.000Z'
);

INSERT INTO packages (
  id, opportunity_id, output_json, artifact_key, status, compiler_mode, created_at
) VALUES (
  'pkg_demo_7qk2',
  'opp_demo_7qk2',
  '{"automation_state":"NOT_INVOKED","compiler_mode":"DEMO_FIXTURE","demo":true,"package":{"bilingual_variants":["Demonstration variant"],"captions":["Demonstration caption one","Demonstration caption two","Demonstration caption three"],"clip_targets":["Demonstration clip target"],"export_specs":["Demonstration export specification"],"hooks":["Demonstration hook one","Demonstration hook two","Demonstration hook three"],"next_action":"Request a real sample for operator review.","risk_notes":["No performance claim is made."],"short_scripts":["Demonstration short script"],"source_notes":["No live source is asserted."],"title":"Clout Chaser receipt format demonstration","why_now":"This is a format demonstration, not a live market signal."},"schema_version":"clout.manual_package.v1"}',
  'packages/CC-DEMO-7QK2/pkg_demo_7qk2.json',
  'APPROVED',
  'DEMO_FIXTURE',
  '2026-07-16T00:00:00.000Z'
);

INSERT INTO receipts (
  id, opportunity_id, package_id, receipt_hash, public_payload_json, public_artifact_key,
  public_visibility, approval_mode, created_at
) VALUES (
  'rcpt_demo_7qk2',
  'opp_demo_7qk2',
  'pkg_demo_7qk2',
  'f0b3c3ab91a18fabcfc4403085522550f70d79e8b066cc934f19939a2e086dd0',
  '{"demo":true,"opportunity":{"language_lane":"bilingual","opp_hash":"CC-DEMO-7QK2","platform_fit":["TikTok","Reels","Shorts"],"title":"Clout Chaser receipt format demonstration","why_now":"This is an explicitly labeled demonstration of the public receipt format. It is not a live market signal or performance claim."},"package_preview":{"bilingual_variants":1,"captions":3,"clip_targets":1,"export_specs":1,"hooks":3,"risk_notes":["No virality, reach, revenue, or performance outcome is claimed."],"short_scripts":1,"source_notes":["Demonstration fixture only; no live source is asserted."]},"receipt":{"approval_mode":"DEMO_FIXTURE","created_at":"2026-07-16T00:00:00.000Z","receipt_id":"rcpt_demo_7qk2"},"schema_version":"clout.public_receipt.v1"}',
  'receipts/public/CC-DEMO-7QK2/rcpt_demo_7qk2.json',
  'public_preview',
  'DEMO_FIXTURE',
  '2026-07-16T00:00:00.000Z'
);

INSERT INTO share_surfaces (id, opp_hash, package_id, receipt_id, visibility, created_at)
VALUES (
  'share_demo_7qk2',
  'CC-DEMO-7QK2',
  'pkg_demo_7qk2',
  'rcpt_demo_7qk2',
  'public_preview',
  '2026-07-16T00:00:00.000Z'
);

INSERT INTO events (
  id, event_type, actor_type, subject_type, subject_id, payload_hash, payload_json, created_at
) VALUES (
  'evt_demo_fixture_created',
  'demo_fixture.created',
  'DEMO_FIXTURE',
  'opportunity',
  'opp_demo_7qk2',
  '12e3850c8b473cabc6c52a4c5478a857855d5bbea059cb2d547031c2a7f15280',
  '{"demo":true,"opp_hash":"CC-DEMO-7QK2","status":"PUBLIC_RECEIPT_READY"}',
  '2026-07-16T00:00:00.000Z'
);

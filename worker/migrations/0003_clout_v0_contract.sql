PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  handle TEXT,
  plan TEXT DEFAULT 'free',
  source TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS source_records (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  source_url TEXT,
  source_type TEXT,
  source_hash TEXT NOT NULL,
  source_language TEXT,
  collection_policy TEXT DEFAULT 'user_submitted',
  r2_key TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS classifications (
  id TEXT PRIMARY KEY,
  opportunity_id TEXT NOT NULL,
  topic TEXT,
  niche TEXT,
  region TEXT,
  audience TEXT,
  culture_lane TEXT,
  entities_json TEXT,
  risk_flags_json TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS scores (
  id TEXT PRIMARY KEY,
  opportunity_id TEXT NOT NULL,
  signal_velocity REAL DEFAULT 0,
  source_quality REAL DEFAULT 0,
  saturation_gap REAL DEFAULT 0,
  language_delta REAL DEFAULT 0,
  clip_availability REAL DEFAULT 0,
  creator_fit REAL DEFAULT 0,
  monetization_fit REAL DEFAULT 0,
  effort_inverse REAL DEFAULT 0,
  risk_penalty REAL DEFAULT 0,
  final_score REAL DEFAULT 0,
  recommendation TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS workflow_runs (
  id TEXT PRIMARY KEY,
  opportunity_id TEXT,
  workflow_type TEXT,
  status TEXT,
  current_step TEXT,
  error TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS webhook_receipts (
  event_hash TEXT PRIMARY KEY CHECK (length(event_hash) = 64),
  provider_event_id TEXT NOT NULL UNIQUE,
  provider_event_type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('RECEIVED', 'ENQUEUEING', 'ENQUEUED')),
  received_at TEXT NOT NULL,
  enqueued_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_classifications_opportunity
  ON classifications(opportunity_id, created_at);
CREATE INDEX IF NOT EXISTS idx_scores_opportunity
  ON scores(opportunity_id, created_at);
CREATE INDEX IF NOT EXISTS idx_workflow_runs_opportunity
  ON workflow_runs(opportunity_id, updated_at);
CREATE INDEX IF NOT EXISTS idx_webhook_receipts_status
  ON webhook_receipts(status, received_at);

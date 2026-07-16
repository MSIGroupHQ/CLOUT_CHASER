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
CREATE TABLE IF NOT EXISTS opportunities (
  id TEXT PRIMARY KEY,
  opp_hash TEXT UNIQUE NOT NULL,
  user_id TEXT,
  source_id TEXT,
  title TEXT,
  niche TEXT,
  platform TEXT,
  language_mode TEXT,
  persona TEXT,
  status TEXT DEFAULT 'new',
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
CREATE TABLE IF NOT EXISTS packages (
  id TEXT PRIMARY KEY,
  opportunity_id TEXT NOT NULL,
  user_id TEXT,
  package_type TEXT,
  output_json TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  receipt_id TEXT,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS receipts (
  id TEXT PRIMARY KEY,
  subject_type TEXT NOT NULL,
  subject_id TEXT NOT NULL,
  receipt_hash TEXT NOT NULL,
  public_visibility TEXT DEFAULT 'private',
  r2_key TEXT,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS share_surfaces (
  id TEXT PRIMARY KEY,
  opp_hash TEXT NOT NULL,
  package_id TEXT,
  receipt_id TEXT,
  slug TEXT UNIQUE,
  visibility TEXT DEFAULT 'public_preview',
  ref_code TEXT,
  clicks INTEGER DEFAULT 0,
  signups INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  actor TEXT,
  subject_type TEXT,
  subject_id TEXT,
  payload_hash TEXT,
  payload_json TEXT,
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
CREATE TABLE IF NOT EXISTS crm_trial_offers (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  opportunity_id TEXT,
  eligible INTEGER DEFAULT 0,
  clicked INTEGER DEFAULT 0,
  started INTEGER DEFAULT 0,
  created_at TEXT NOT NULL
);

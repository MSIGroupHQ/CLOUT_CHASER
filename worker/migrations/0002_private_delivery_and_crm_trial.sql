PRAGMA foreign_keys = ON;

CREATE TABLE package_delivery_grants (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL UNIQUE REFERENCES packages(id),
  receipt_id TEXT NOT NULL UNIQUE REFERENCES receipts(id),
  token_sha256 TEXT NOT NULL UNIQUE CHECK (
    length(token_sha256) = 64
    AND token_sha256 = lower(token_sha256)
    AND token_sha256 NOT GLOB '*[^0-9a-f]*'
  ),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'revoked')),
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  revoked_at TEXT,
  CHECK (julianday(expires_at) > julianday(created_at)),
  CHECK (
    (status = 'active' AND revoked_at IS NULL)
    OR (status = 'revoked' AND revoked_at IS NOT NULL)
  )
) STRICT;

CREATE INDEX idx_package_delivery_grants_lookup
  ON package_delivery_grants(package_id, token_sha256, status, expires_at);

CREATE TRIGGER package_delivery_grant_relationship_guard
BEFORE INSERT ON package_delivery_grants
WHEN NOT EXISTS (
  SELECT 1
  FROM packages p
  JOIN receipts r ON r.package_id = p.id AND r.opportunity_id = p.opportunity_id
  WHERE p.id = NEW.package_id
    AND r.id = NEW.receipt_id
    AND p.status = 'APPROVED'
    AND r.public_visibility = 'public_preview'
)
BEGIN
  SELECT RAISE(ABORT, 'package_delivery_receipt_relationship_invalid');
END;

CREATE TRIGGER package_delivery_grant_identity_immutable
BEFORE UPDATE OF id, package_id, receipt_id, token_sha256, created_at, expires_at
ON package_delivery_grants
BEGIN
  SELECT RAISE(ABORT, 'package_delivery_grant_identity_immutable');
END;

CREATE TRIGGER package_delivery_grant_no_delete
BEFORE DELETE ON package_delivery_grants
BEGIN
  SELECT RAISE(ABORT, 'package_delivery_grant_is_durable');
END;

CREATE TABLE crm_trial_offers (
  id TEXT PRIMARY KEY,
  opportunity_id TEXT NOT NULL UNIQUE REFERENCES opportunities(id),
  opp_hash TEXT NOT NULL UNIQUE REFERENCES opportunities(opp_hash),
  eligible INTEGER NOT NULL CHECK (eligible = 1),
  clicked INTEGER NOT NULL DEFAULT 0 CHECK (clicked IN (0, 1)),
  started INTEGER NOT NULL DEFAULT 0 CHECK (started IN (0, 1)),
  first_clicked_at TEXT,
  started_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CHECK (started = 0 OR clicked = 1),
  CHECK (clicked = 0 OR first_clicked_at IS NOT NULL),
  CHECK (started = 0 OR started_at IS NOT NULL)
) STRICT;

CREATE INDEX idx_crm_trial_offers_state
  ON crm_trial_offers(eligible, started, updated_at);

CREATE TRIGGER crm_trial_offer_identity_immutable
BEFORE UPDATE OF id, opportunity_id, opp_hash, eligible, created_at
ON crm_trial_offers
BEGIN
  SELECT RAISE(ABORT, 'crm_trial_offer_identity_immutable');
END;

CREATE TRIGGER crm_trial_offer_no_delete
BEFORE DELETE ON crm_trial_offers
BEGIN
  SELECT RAISE(ABORT, 'crm_trial_offer_is_durable');
END;

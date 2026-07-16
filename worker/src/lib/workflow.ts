import type { IngestQueueMessage } from "../core";

export const CREATE_OPPORTUNITY_WORKFLOW_NAME = "create-opportunity-workflow";

export function createIngestMessage(
  opportunityId: string,
  oppHash: string,
  requestedAt: string,
): IngestQueueMessage {
  return {
    schema_version: "clout.ingest.v1",
    opportunity_id: opportunityId,
    opp_hash: oppHash,
    requested_at: requestedAt,
  };
}

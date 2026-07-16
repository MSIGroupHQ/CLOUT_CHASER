export const CLOUT_QUEUE_NAMES = [
  "clout-ingest-q",
  "clout-classify-q",
  "clout-score-q",
  "clout-compile-q",
  "clout-receipt-q",
  "clout-notify-q",
  "clout-deadletter-q",
] as const;

export interface WhopStubQueueMessage {
  schema_version: "clout.whop.stub.v1";
  event_id: string;
  event_hash: string;
  provider_event_id: string;
  provider_event_type: string;
  received_at: string;
}

export const PACKET_STATES = [
  "draft",
  "generated",
  "review_required",
  "approved",
  "issued",
  "held",
  "superseded",
  "archived",
] as const;

export type PacketState = (typeof PACKET_STATES)[number];

const TRANSITIONS: Record<PacketState, PacketState[]> = {
  draft: ["generated", "archived"],
  generated: ["review_required", "held", "archived"],
  review_required: ["approved", "held", "draft", "archived"],
  approved: ["issued", "superseded", "archived"],
  issued: ["superseded", "archived"],
  held: ["draft", "archived"],
  superseded: ["archived"],
  archived: [],
};

export function canTransition(current: PacketState, target: PacketState): boolean {
  return TRANSITIONS[current]?.includes(target) ?? false;
}

export function validTransitions(state: PacketState): PacketState[] {
  return TRANSITIONS[state] ?? [];
}

export function transitionOutcome(current: PacketState, target: PacketState) {
  const allowed = canTransition(current, target);
  return {
    allowed,
    reason: allowed ? "" : `cannot transition from ${current} to ${target}`,
    next_states: validTransitions(current),
  };
}

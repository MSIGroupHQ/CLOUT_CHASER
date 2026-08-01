export const PACKET_CLASSES = [
  "surface_triage_packet",
  "commercial_brief_packet",
  "capability_brief_packet",
  "evidence_packet",
  "verification_packet",
  "delivery_index_packet",
  "hold_notice_packet",
] as const;

export type PacketClass = (typeof PACKET_CLASSES)[number];

export interface PacketSection {
  section_key: string;
  section_order: number;
  title: string;
  content: string;
}

export interface Packet {
  id: string;
  tenant_id: string;
  packet_class: PacketClass;
  state: string;
  title: string;
  sections: PacketSection[];
}

export interface PacketTemplate {
  id: string;
  packet_class: PacketClass;
  name: string;
  default_sections: string[];
}

export interface TemplateSection {
  key: string;
  title: string;
  description: string;
  required: boolean;
  max_length: number | null;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  packet_class: PacketClass;
  sections: TemplateSection[];
  required_fields: string[];
}

export function classifyPacket(title: string, description: string): PacketClass {
  const corpus = `${title} ${description}`.toLowerCase();
  if (/triage|surface/.test(corpus)) return "surface_triage_packet";
  if (/commercial|brief|proposal/.test(corpus)) return "commercial_brief_packet";
  if (/capability|scope/.test(corpus)) return "capability_brief_packet";
  if (/evidence|proof/.test(corpus)) return "evidence_packet";
  if (/verification|validation|qa/.test(corpus)) return "verification_packet";
  if (/delivery|index|manifest/.test(corpus)) return "delivery_index_packet";
  if (/hold|notice|exception/.test(corpus)) return "hold_notice_packet";
  return "surface_triage_packet";
}

export function validatePacket(packet: Packet): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!packet.id) errors.push("packet id is required");
  if (!packet.tenant_id) errors.push("tenant_id is required");
  if (!packet.title) errors.push("title is required");
  if (packet.title.length > 160) errors.push("title exceeds 160 characters");
  if (!PACKET_CLASSES.includes(packet.packet_class as any))
    errors.push(`invalid packet_class: ${packet.packet_class}`);
  if (!PACKET_STATES.includes(packet.state as any))
    errors.push(`invalid packet state: ${packet.state}`);
  if (!packet.sections.length) errors.push("packet must have at least one section");
  for (const section of packet.sections) {
    if (!section.section_key) errors.push("section_key is required for all sections");
    if (!section.title) errors.push("section title is required for all sections");
  }
  return { valid: errors.length === 0, errors };
}

export function defaultTemplateFor(packetClass: PacketClass): TemplateDefinition {
  const templates: Record<PacketClass, TemplateSection[]> = {
    surface_triage_packet: [
      { key: "summary", title: "Surface Summary", description: "Overview of the commercial surface", required: true, max_length: 2000 },
      { key: "signals", title: "Detected Signals", description: "Inbound signals and triggers", required: true, max_length: 2000 },
      { key: "initial_assessment", title: "Initial Assessment", description: "First-pass viability assessment", required: true, max_length: 3000 },
    ],
    commercial_brief_packet: [
      { key: "executive_summary", title: "Executive Summary", description: "Brief overview of the commercial opportunity", required: true, max_length: 2000 },
      { key: "scope", title: "Proposed Scope", description: "Scope of work and deliverables", required: true, max_length: 4000 },
      { key: "pricing", title: "Pricing & Terms", description: "Fee structure, payment terms, and conditions", required: true, max_length: 2000 },
      { key: "timeline", title: "Timeline", description: "Milestones and delivery schedule", required: false, max_length: 1000 },
    ],
    capability_brief_packet: [
      { key: "capability", title: "Capability Statement", description: "Description of relevant capabilities", required: true, max_length: 3000 },
      { key: "evidence", title: "Supporting Evidence", description: "Past work, case studies, credentials", required: false, max_length: 4000 },
    ],
    evidence_packet: [
      { key: "evidence_record", title: "Evidence Record", description: "Chain of evidence and custody", required: true, max_length: 5000 },
      { key: "verification", title: "Verification", description: "Verification method and result", required: true, max_length: 2000 },
      { key: "witnesses", title: "Witnesses", description: "Attestation and witnesses", required: false, max_length: 1000 },
    ],
    verification_packet: [
      { key: "verification_scope", title: "Verification Scope", description: "What was verified", required: true, max_length: 2000 },
      { key: "methodology", title: "Methodology", description: "How verification was performed", required: true, max_length: 3000 },
      { key: "result", title: "Result", description: "Verification outcome", required: true, max_length: 2000 },
    ],
    delivery_index_packet: [
      { key: "manifest", title: "Delivery Manifest", description: "Complete list of delivered items", required: true, max_length: 4000 },
      { key: "receipt", title: "Receipt", description: "Delivery confirmation and receipt", required: true, max_length: 1000 },
      { key: "notes", title: "Delivery Notes", description: "Notes and exceptions", required: false, max_length: 2000 },
    ],
    hold_notice_packet: [
      { key: "reason", title: "Hold Reason", description: "Reason for the hold", required: true, max_length: 2000 },
      { key: "conditions", title: "Release Conditions", description: "Conditions required to lift the hold", required: true, max_length: 2000 },
      { key: "impact", title: "Impact Assessment", description: "Impact of the hold on operations", required: true, max_length: 2000 },
    ],
  };
  const sections = templates[packetClass] ?? [
    { key: "summary", title: "Summary", description: "Packet summary", required: true, max_length: 2000 },
  ];
  return {
    id: "",
    name: packetClass.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    packet_class: packetClass,
    sections,
    required_fields: sections.filter((s) => s.required).map((s) => s.key),
  };
}

import { PACKET_STATES } from "./state.js";

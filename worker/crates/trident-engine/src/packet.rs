use serde::{Deserialize, Serialize};
use crate::state::PacketState;
use crate::ValidationResult;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum PacketClass {
    SurfaceTriagePacket,
    CommercialBriefPacket,
    CapabilityBriefPacket,
    EvidencePacket,
    VerificationPacket,
    DeliveryIndexPacket,
    HoldNoticePacket,
}

impl PacketClass {
    pub fn classify(title: &str, description: &str) -> PacketClass {
        let corpus = format!("{} {}", title.to_lowercase(), description.to_lowercase());
        if corpus.contains("triage") || corpus.contains("surface") {
            PacketClass::SurfaceTriagePacket
        } else if corpus.contains("commercial") || corpus.contains("brief") || corpus.contains("proposal") {
            PacketClass::CommercialBriefPacket
        } else if corpus.contains("capability") || corpus.contains("scope") {
            PacketClass::CapabilityBriefPacket
        } else if corpus.contains("evidence") || corpus.contains("proof") {
            PacketClass::EvidencePacket
        } else if corpus.contains("verification") || corpus.contains("validation") || corpus.contains("qa") {
            PacketClass::VerificationPacket
        } else if corpus.contains("delivery") || corpus.contains("index") || corpus.contains("manifest") {
            PacketClass::DeliveryIndexPacket
        } else if corpus.contains("hold") || corpus.contains("notice") || corpus.contains("exception") {
            PacketClass::HoldNoticePacket
        } else {
            PacketClass::SurfaceTriagePacket
        }
    }
}

impl std::fmt::Display for PacketClass {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            PacketClass::SurfaceTriagePacket => write!(f, "surface_triage_packet"),
            PacketClass::CommercialBriefPacket => write!(f, "commercial_brief_packet"),
            PacketClass::CapabilityBriefPacket => write!(f, "capability_brief_packet"),
            PacketClass::EvidencePacket => write!(f, "evidence_packet"),
            PacketClass::VerificationPacket => write!(f, "verification_packet"),
            PacketClass::DeliveryIndexPacket => write!(f, "delivery_index_packet"),
            PacketClass::HoldNoticePacket => write!(f, "hold_notice_packet"),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PacketSection {
    pub section_key: String,
    pub section_order: u32,
    pub title: String,
    pub content: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Packet {
    pub id: String,
    pub tenant_id: String,
    pub packet_class: String,
    pub state: String,
    pub title: String,
    pub sections: Vec<PacketSection>,
}

impl Packet {
    pub fn validate(&self) -> ValidationResult {
        let mut errors = Vec::new();

        if self.id.is_empty() {
            errors.push("packet id is required".to_string());
        }
        if self.tenant_id.is_empty() {
            errors.push("tenant_id is required".to_string());
        }
        if self.title.is_empty() {
            errors.push("title is required".to_string());
        }
        if self.title.len() > 160 {
            errors.push("title exceeds 160 characters".to_string());
        }

        let class: Result<PacketClass, _> = serde_json::from_str(&format!("\"{}\"", self.packet_class));
        if class.is_err() {
            errors.push(format!("invalid packet_class: {}", self.packet_class));
        }

        let state: Result<PacketState, _> = self.state.parse();
        if state.is_err() {
            errors.push(format!("invalid packet state: {}", self.state));
        }

        if self.sections.is_empty() {
            errors.push("packet must have at least one section".to_string());
        }
        for section in &self.sections {
            if section.section_key.is_empty() {
                errors.push("section_key is required for all sections".to_string());
            }
            if section.title.is_empty() {
                errors.push("section title is required for all sections".to_string());
            }
        }

        ValidationResult {
            valid: errors.is_empty(),
            errors,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PacketTemplate {
    pub id: String,
    pub packet_class: String,
    pub name: String,
    pub default_sections: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GeneratedArtifact {
    pub id: String,
    pub packet_id: String,
    pub template_id: String,
    pub output_path: String,
    pub artifact_type: String,
}

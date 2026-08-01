use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TemplateDefinition {
    pub id: String,
    pub name: String,
    pub packet_class: String,
    pub sections: Vec<TemplateSection>,
    pub required_fields: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TemplateSection {
    pub key: String,
    pub title: String,
    pub description: String,
    pub required: bool,
    pub max_length: Option<usize>,
}

impl TemplateDefinition {
    pub fn default_for(class: &str, class_name: &str) -> Self {
        let sections = match class {
            "surface_triage_packet" => vec![
                TemplateSection { key: "summary".into(), title: "Surface Summary".into(), description: "Overview of the commercial surface".into(), required: true, max_length: Some(2000) },
                TemplateSection { key: "signals".into(), title: "Detected Signals".into(), description: "Inbound signals and triggers".into(), required: true, max_length: Some(2000) },
                TemplateSection { key: "initial_assessment".into(), title: "Initial Assessment".into(), description: "First-pass viability assessment".into(), required: true, max_length: Some(3000) },
            ],
            "commercial_brief_packet" => vec![
                TemplateSection { key: "executive_summary".into(), title: "Executive Summary".into(), description: "Brief overview of the commercial opportunity".into(), required: true, max_length: Some(2000) },
                TemplateSection { key: "scope".into(), title: "Proposed Scope".into(), description: "Scope of work and deliverables".into(), required: true, max_length: Some(4000) },
                TemplateSection { key: "pricing".into(), title: "Pricing & Terms".into(), description: "Fee structure, payment terms, and conditions".into(), required: true, max_length: Some(2000) },
                TemplateSection { key: "timeline".into(), title: "Timeline".into(), description: "Milestones and delivery schedule".into(), required: false, max_length: Some(1000) },
            ],
            "capability_brief_packet" => vec![
                TemplateSection { key: "capability".into(), title: "Capability Statement".into(), description: "Description of relevant capabilities".into(), required: true, max_length: Some(3000) },
                TemplateSection { key: "evidence".into(), title: "Supporting Evidence".into(), description: "Past work, case studies, credentials".into(), required: false, max_length: Some(4000) },
            ],
            "evidence_packet" => vec![
                TemplateSection { key: "evidence_record".into(), title: "Evidence Record".into(), description: "Chain of evidence and custody".into(), required: true, max_length: Some(5000) },
                TemplateSection { key: "verification".into(), title: "Verification".into(), description: "Verification method and result".into(), required: true, max_length: Some(2000) },
                TemplateSection { key: "witnesses".into(), title: "Witnesses".into(), description: "Attestation and witnesses".into(), required: false, max_length: Some(1000) },
            ],
            "verification_packet" => vec![
                TemplateSection { key: "verification_scope".into(), title: "Verification Scope".into(), description: "What was verified".into(), required: true, max_length: Some(2000) },
                TemplateSection { key: "methodology".into(), title: "Methodology".into(), description: "How verification was performed".into(), required: true, max_length: Some(3000) },
                TemplateSection { key: "result".into(), title: "Result".into(), description: "Verification outcome".into(), required: true, max_length: Some(2000) },
            ],
            "delivery_index_packet" => vec![
                TemplateSection { key: "manifest".into(), title: "Delivery Manifest".into(), description: "Complete list of delivered items".into(), required: true, max_length: Some(4000) },
                TemplateSection { key: "receipt".into(), title: "Receipt".into(), description: "Delivery confirmation and receipt".into(), required: true, max_length: Some(1000) },
                TemplateSection { key: "notes".into(), title: "Delivery Notes".into(), description: "Notes and exceptions".into(), required: false, max_length: Some(2000) },
            ],
            "hold_notice_packet" => vec![
                TemplateSection { key: "reason".into(), title: "Hold Reason".into(), description: "Reason for the hold".into(), required: true, max_length: Some(2000) },
                TemplateSection { key: "conditions".into(), title: "Release Conditions".into(), description: "Conditions required to lift the hold".into(), required: true, max_length: Some(2000) },
                TemplateSection { key: "impact".into(), title: "Impact Assessment".into(), description: "Impact of the hold on operations".into(), required: true, max_length: Some(2000) },
            ],
            _ => vec![
                TemplateSection { key: "summary".into(), title: "Summary".into(), description: "Packet summary".into(), required: true, max_length: Some(2000) },
            ],
        };
        TemplateDefinition {
            id: String::new(),
            name: class_name.into(),
            packet_class: class.into(),
            sections: sections.clone(),
            required_fields: sections.iter().filter(|s| s.required).map(|s| s.key.clone()).collect(),
        }
    }
}

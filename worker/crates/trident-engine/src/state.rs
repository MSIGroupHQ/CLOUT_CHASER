use serde::{Deserialize, Serialize};
use std::fmt;
use std::str::FromStr;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum PacketState {
    Draft,
    Generated,
    ReviewRequired,
    Approved,
    Issued,
    Held,
    Superseded,
    Archived,
}

impl PacketState {
    pub fn can_transition_to(&self, target: &PacketState) -> TransitionOutcome {
        let allowed = self.valid_transitions();
        if allowed.contains(target) {
            TransitionOutcome {
                allowed: true,
                reason: String::new(),
                next_states: allowed.iter().map(|s| s.to_string()).collect(),
            }
        } else {
            TransitionOutcome {
                allowed: false,
                reason: format!("cannot transition from {self} to {target}"),
                next_states: allowed.iter().map(|s| s.to_string()).collect(),
            }
        }
    }

    pub fn valid_transitions(&self) -> Vec<PacketState> {
        match self {
            PacketState::Draft => vec![PacketState::Generated, PacketState::Archived],
            PacketState::Generated => vec![PacketState::ReviewRequired, PacketState::Held, PacketState::Archived],
            PacketState::ReviewRequired => vec![PacketState::Approved, PacketState::Held, PacketState::Draft, PacketState::Archived],
            PacketState::Approved => vec![PacketState::Issued, PacketState::Superseded, PacketState::Archived],
            PacketState::Issued => vec![PacketState::Superseded, PacketState::Archived],
            PacketState::Held => vec![PacketState::Draft, PacketState::Archived],
            PacketState::Superseded => vec![PacketState::Archived],
            PacketState::Archived => vec![],
        }
    }
}

#[derive(Debug, Serialize)]
pub struct TransitionOutcome {
    pub allowed: bool,
    pub reason: String,
    pub next_states: Vec<String>,
}

impl fmt::Display for PacketState {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            PacketState::Draft => write!(f, "draft"),
            PacketState::Generated => write!(f, "generated"),
            PacketState::ReviewRequired => write!(f, "review_required"),
            PacketState::Approved => write!(f, "approved"),
            PacketState::Issued => write!(f, "issued"),
            PacketState::Held => write!(f, "held"),
            PacketState::Superseded => write!(f, "superseded"),
            PacketState::Archived => write!(f, "archived"),
        }
    }
}

impl FromStr for PacketState {
    type Err = String;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "draft" => Ok(PacketState::Draft),
            "generated" => Ok(PacketState::Generated),
            "review_required" => Ok(PacketState::ReviewRequired),
            "approved" => Ok(PacketState::Approved),
            "issued" => Ok(PacketState::Issued),
            "held" => Ok(PacketState::Held),
            "superseded" => Ok(PacketState::Superseded),
            "archived" => Ok(PacketState::Archived),
            _ => Err(format!("unknown packet state: {s}")),
        }
    }
}

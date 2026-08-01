use std::fmt;

#[derive(Debug)]
pub enum TridentError {
    InvalidTransition { from: String, to: String },
    Validation(String),
    NotFound(String),
    TemplateMismatch { expected: String, actual: String },
    Serialization(String),
}

impl fmt::Display for TridentError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            TridentError::InvalidTransition { from, to } => write!(f, "invalid state transition: {from} -> {to}"),
            TridentError::Validation(msg) => write!(f, "validation failed: {msg}"),
            TridentError::NotFound(msg) => write!(f, "not found: {msg}"),
            TridentError::TemplateMismatch { expected, actual } => write!(f, "template mismatch: expected {expected}, got {actual}"),
            TridentError::Serialization(msg) => write!(f, "serialization error: {msg}"),
        }
    }
}

impl From<serde_json::Error> for TridentError {
    fn from(e: serde_json::Error) -> Self {
        TridentError::Serialization(e.to_string())
    }
}

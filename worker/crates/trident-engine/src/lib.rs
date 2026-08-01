mod packet;
mod state;
mod template;
mod validation;

use packet::*;
use state::*;
use validation::*;
use std::ffi::CString;

fn json_output<T: serde::Serialize>(v: &T) -> *mut u8 {
    let s = serde_json::to_string(v).unwrap_or_default();
    let c = CString::new(s).unwrap_or_default();
    c.into_raw() as *mut u8
}

fn parse_state(s: &str) -> Result<PacketState, String> {
    s.parse()
}

#[unsafe(no_mangle)]
pub extern "C" fn trident_validate_transition(ptr: *const u8, len: usize, target_ptr: *const u8, target_len: usize) -> *mut u8 {
    let current = unsafe { std::slice::from_raw_parts(ptr, len) };
    let current_str = String::from_utf8_lossy(current);
    let target = unsafe { std::slice::from_raw_parts(target_ptr, target_len) };
    let target_str = String::from_utf8_lossy(target);

    let current_state = match parse_state(&current_str) {
        Ok(s) => s,
        Err(_) => return json_output(&TransitionOutcome {
            allowed: false,
            reason: format!("invalid current state: {current_str}"),
            next_states: vec![],
        }),
    };
    let target_state = match parse_state(&target_str) {
        Ok(s) => s,
        Err(_) => return json_output(&TransitionOutcome {
            allowed: false,
            reason: format!("invalid target state: {target_str}"),
            next_states: vec![],
        }),
    };
    json_output(&current_state.can_transition_to(&target_state))
}

#[unsafe(no_mangle)]
pub extern "C" fn trident_valid_transitions(ptr: *const u8, len: usize) -> *mut u8 {
    let s = unsafe { std::slice::from_raw_parts(ptr, len) };
    let state_str = String::from_utf8_lossy(s);
    let state = match parse_state(&state_str) {
        Ok(s) => s,
        Err(_) => return json_output::<Vec<String>>(&vec![]),
    };
    let transitions: Vec<String> = state.valid_transitions().iter()
        .map(|s| s.to_string())
        .collect();
    json_output(&transitions)
}

#[unsafe(no_mangle)]
pub extern "C" fn trident_validate_packet(ptr: *const u8, len: usize) -> *mut u8 {
    let s = unsafe { std::slice::from_raw_parts(ptr, len) };
    let json_str = String::from_utf8_lossy(s);
    let packet: Packet = match serde_json::from_str(&json_str) {
        Ok(p) => p,
        Err(e) => return json_output(&ValidationResult {
            valid: false,
            errors: vec![e.to_string()],
        }),
    };
    json_output(&packet.validate())
}

#[unsafe(no_mangle)]
pub extern "C" fn trident_classify_packet(title_ptr: *const u8, title_len: usize, desc_ptr: *const u8, desc_len: usize) -> *mut u8 {
    let title = unsafe { std::slice::from_raw_parts(title_ptr, title_len) };
    let title_str = String::from_utf8_lossy(&title);
    let desc = unsafe { std::slice::from_raw_parts(desc_ptr, desc_len) };
    let desc_str = String::from_utf8_lossy(&desc);
    let classification = PacketClass::classify(&title_str, &desc_str);
    json_output(&classification.to_string())
}

#[unsafe(no_mangle)]
pub extern "C" fn trident_free_string(ptr: *mut u8) {
    if !ptr.is_null() {
        unsafe { drop(CString::from_raw(ptr as *mut i8)); }
    }
}

#[unsafe(no_mangle)]
pub extern "C" fn trident_alloc(len: usize) -> *mut u8 {
    let mut buf = vec![0u8; len];
    let ptr = buf.as_mut_ptr();
    std::mem::forget(buf);
    ptr
}

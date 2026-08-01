// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - WASM module import handled by wrangler bundler
import tridentModule from "./trident_engine.wasm";

let instance: WebAssembly.Instance | null = null;

function encode(s: string): Uint8Array {
  return new TextEncoder().encode(s);
}

function copyToWasm(s: string): [number, number] {
  if (!instance) return [0, 0];
  const bytes = encode(s);
  const len = bytes.length;
  const alloc = instance.exports.trident_alloc as (len: number) => number;
  const ptr = alloc(len);
  const mem = new Uint8Array((instance!.exports.memory as WebAssembly.Memory).buffer);
  mem.set(bytes, ptr);
  return [ptr, len];
}

function readResult(ptr: number): string {
  if (!ptr) return "null";
  const inst = instance!;
  const mem = new Uint8Array((inst.exports.memory as WebAssembly.Memory).buffer);
  let end = ptr;
  while (mem[end] !== 0) end++;
  const result = new TextDecoder().decode(mem.slice(ptr, end));
  const free = inst.exports.trident_free_string as (ptr: number) => void;
  free(ptr);
  return result;
}

export interface TransitionOutcome {
  allowed: boolean;
  reason: string;
  next_states: string[];
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

let initPromise: Promise<void> | null = null;

export async function initTrident(): Promise<void> {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    const imports = {};
    instance = await WebAssembly.instantiate(tridentModule as WebAssembly.Module, imports);
  })();
  return initPromise;
}

export function validateTransition(currentState: string, targetState: string): TransitionOutcome {
  if (!instance) throw new Error("TRIDENT engine not initialized");
  const [csPtr, csLen] = copyToWasm(currentState);
  const [tsPtr, tsLen] = copyToWasm(targetState);
  const fn = instance.exports.trident_validate_transition as (a: number, b: number, c: number, d: number) => number;
  const result = fn(csPtr, csLen, tsPtr, tsLen);
  return JSON.parse(readResult(result));
}

export function validTransitions(state: string): string[] {
  if (!instance) throw new Error("TRIDENT engine not initialized");
  const [ptr, len] = copyToWasm(state);
  const fn = instance.exports.trident_valid_transitions as (a: number, b: number) => number;
  const result = fn(ptr, len);
  return JSON.parse(readResult(result));
}

export function validatePacket(packet: unknown): ValidationResult {
  if (!instance) throw new Error("TRIDENT engine not initialized");
  const json = JSON.stringify(packet);
  const [ptr, len] = copyToWasm(json);
  const fn = instance.exports.trident_validate_packet as (a: number, b: number) => number;
  const result = fn(ptr, len);
  return JSON.parse(readResult(result));
}

export function classifyPacket(title: string, description: string): string {
  if (!instance) throw new Error("TRIDENT engine not initialized");
  const [tPtr, tLen] = copyToWasm(title);
  const [dPtr, dLen] = copyToWasm(description);
  const fn = instance.exports.trident_classify_packet as (a: number, b: number, c: number, d: number) => number;
  const result = fn(tPtr, tLen, dPtr, dLen);
  return readResult(result).replace(/"/g, "");
}

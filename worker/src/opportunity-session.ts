import { DurableObject } from "cloudflare:workers";

interface CoordinationLock {
  token: string;
  expires_at: number;
}

export interface LockResult {
  acquired: boolean;
  expires_at: number;
}

function lockKey(operation: string): string {
  if (!/^[a-z][a-z0-9_-]{0,47}$/u.test(operation)) {
    throw new TypeError("operation must be a bounded lowercase coordination label");
  }
  return `lock:${operation}`;
}

export class OpportunitySession extends DurableObject<Env> {
  async acquire(operation: string, token: string, ttlMs: number): Promise<LockResult> {
    if (!/^[0-9a-f-]{36}$/u.test(token)) throw new TypeError("token must be a UUID");
    if (!Number.isInteger(ttlMs) || ttlMs < 1_000 || ttlMs > 60_000) {
      throw new RangeError("ttlMs must be an integer between 1000 and 60000");
    }
    const key = lockKey(operation);
    const now = Date.now();
    const current = await this.ctx.storage.get<CoordinationLock>(key);
    if (current && current.expires_at > now && current.token !== token) {
      return { acquired: false, expires_at: current.expires_at };
    }
    const lock: CoordinationLock = { token, expires_at: now + ttlMs };
    await this.ctx.storage.put(key, lock);
    return { acquired: true, expires_at: lock.expires_at };
  }

  async release(operation: string, token: string): Promise<boolean> {
    const key = lockKey(operation);
    const current = await this.ctx.storage.get<CoordinationLock>(key);
    if (!current || current.token !== token) return false;
    await this.ctx.storage.delete(key);
    return true;
  }
}

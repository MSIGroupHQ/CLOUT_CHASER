#!/usr/bin/env python3
"""
OPEN CLAW FAMILY — paste a link; claws do the rest (gated).

Authority:
  Clout:  https://github.com/MSIGroupHQ/CLOUT_CHASER
  REACH:  https://github.com/MSIGroupHQ/REACH_INTELLIGENCE

Never: cold email strangers. Outbox only for owned channels.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent
STATE = ROOT / "state"
CONTROL = STATE / "control"
INBOX = ROOT / "inbox"
OUTBOX = ROOT / "outbox"
RECEIPTS = STATE / "receipts"
PROCESSED = STATE / "processed"
EVENTS = STATE / "events.jsonl"
STATUS = STATE / "status.bin.json"

REACH_COMPILE = os.environ.get(
    "REACH_COMPILE_URL",
    "https://reach-compile.mediatorsolutionsinc.workers.dev",
)
CLOUT_PUBLIC = os.environ.get("CLOUT_PUBLIC_URL", "https://cloutchaser.prime88.studio")

AUTHORITY = {
    "clout_github": "https://github.com/MSIGroupHQ/CLOUT_CHASER",
    "reach_github": "https://github.com/MSIGroupHQ/REACH_INTELLIGENCE",
    "clout_live": CLOUT_PUBLIC,
    "family": "open-claw",
    "human_ceiling": "paste_public_link_or_post_outbox",
}


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def ensure() -> None:
    for p in (STATE, CONTROL, INBOX, OUTBOX, RECEIPTS, PROCESSED):
        p.mkdir(parents=True, exist_ok=True)


def kill() -> bool:
    return (CONTROL / "KILL_SWITCH.flag").exists()


def event(kind: str, **payload: Any) -> None:
    with EVENTS.open("a", encoding="utf-8") as f:
        f.write(json.dumps({"ts": utc_now(), "kind": kind, **payload}, ensure_ascii=False) + "\n")


def write_status(extra: dict | None = None) -> dict:
    body = {
        "schema": "open_claw.status.v1",
        "ts": utc_now(),
        "host": os.environ.get("COMPUTERNAME", "unknown"),
        "alive": not kill(),
        "authority": AUTHORITY,
        "inbox_pending": len(list(INBOX.glob("*.json"))),
        "outbox_ready": len(list(OUTBOX.glob("POST_*.md"))) + len(list(OUTBOX.glob("PACK_*.json"))),
    }
    if extra:
        body.update(extra)
    STATUS.write_text(json.dumps(body, indent=2), encoding="utf-8")
    return body


def region_from_hint(url: str, niche: str) -> str:
    s = f"{url} {niche}".lower()
    rules = [
        (r"\b(india|bollywood|mumbai|delhi|punjabi|desi|srk|diljit)\b", "IN"),
        (r"\b(japan|tokyo|j-pop|anime|hololive|vtuber)\b", "JP"),
        (r"\b(korea|k-pop|kpop|bts|blackpink|seoul)\b", "ASIA_KPOP"),
        (r"\b(brazil|brasil|phonk|mexico|corridos|reggaeton|latam|spanish)\b", "LATAM"),
        (r"\b(uk|london|grime|europe|central cee)\b", "UK_EU"),
        (r"\b(nigeria|lagos|afrobeats|amapiano|south africa|burna|wizkid)\b", "AFRICA"),
        (r"\b(dubai|riyadh|saudi|uae|mena|arabic)\b", "GULF_MENA"),
        (r"\b(australia|sydney|melbourne|nz)\b", "OCEANIA"),
        (r"\b(messi|ronaldo|esports|football|soccer)\b", "GLOBAL_SPORTS"),
        (r"\b(us|usa|drake|taylor|kai cenat)\b", "US"),
    ]
    for pat, reg in rules:
        if re.search(pat, s):
            return reg
    return "GLOBAL"


def opp_hash(url: str, niche: str) -> str:
    h = hashlib.sha256(f"{url}|{niche}|{utc_now()[:10]}".encode()).hexdigest()[:10].upper()
    return f"CC-CLAW-{h}"


def http_json(method: str, url: str, body: dict | None = None, auth: bool = False) -> tuple[int, Any]:
    data = None if body is None else json.dumps(body).encode()
    headers = {"Content-Type": "application/json", "User-Agent": "open-claw/1.0"}
    if auth:
        token = os.environ.get("REACH_TRIGGER_TOKEN", "")
        sec = Path(r"C:\Users\DM\MSIGroupHQ\REACH_INTELLIGENCE\workers\reach-compile\.deploy-secret-token")
        if not token and sec.exists():
            token = sec.read_text(encoding="utf-8").strip()
        if token:
            headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=90) as r:
            raw = r.read().decode()
            try:
                return r.status, json.loads(raw)
            except json.JSONDecodeError:
                return r.status, {"raw": raw}
    except urllib.error.HTTPError as e:
        raw = e.read().decode(errors="replace")
        try:
            return e.code, json.loads(raw)
        except Exception:
            return e.code, {"error": raw}
    except Exception as e:
        return 0, {"error": str(e)}


def cmd_status(_: dict) -> dict:
    return write_status()


def cmd_list_regions(_: dict) -> dict:
    return {
        "ok": True,
        "regions": [
            "GLOBAL", "US", "UK_EU", "LATAM", "ASIA_KPOP", "JP", "IN",
            "OCEANIA", "AFRICA", "GULF_MENA", "GLOBAL_SPORTS",
        ],
        "note": "Every country has a Beyoncé — filter Clout feed by region.",
    }


def cmd_paste(args: dict) -> dict:
    url = (args.get("url") or args.get("source") or "").strip()
    niche = (args.get("niche") or args.get("note") or "general").strip()
    if not url:
        return {"ok": False, "error": "url_required", "hint": "Paste a public TikTok/X/IG/YouTube link"}
    region = args.get("region") or region_from_hint(url, niche)
    oid = opp_hash(url, niche)
    pack = {
        "schema": "open_claw.pack.v1",
        "opp_hash": oid,
        "source_url": url,
        "niche": niche,
        "region": region,
        "status": "queued_for_package",
        "created_at": utc_now(),
        "human_next": "When package ready, post outbox draft. Max manual work: paste link (done) + post link.",
        "public_sample": f"{CLOUT_PUBLIC}/sample",
        "public_feed": f"{CLOUT_PUBLIC}/#opportunities",
        "claw": "PASTE",
    }
    pack_path = OUTBOX / f"PACK_{oid}.json"
    pack_path.write_text(json.dumps(pack, indent=2), encoding="utf-8")

    # post-ready stub (you only drop the link + caption later)
    post = f"""# Open Claw draft — {oid}

**Region:** {region}  
**Source:** {url}  
**Niche:** {niche}

## Caption (owned channels only)

Tomorrow's angle, not yesterday's remix.
Source → package → receipt: {CLOUT_PUBLIC}

## You only need to

1. Post this caption + Clout link on your page (or the regional page Meta gives you)
2. Or do nothing if an approved auto-poster is later wired

## Not allowed

Cold DMs / bought lists / fake engagement

---
Open Claw · {utc_now()}
"""
    post_path = OUTBOX / f"POST_{oid}.md"
    post_path.write_text(post, encoding="utf-8")
    event("paste", opp_hash=oid, region=region)
    write_status({"last_paste": oid, "last_region": region})
    return {
        "ok": True,
        "opp_hash": oid,
        "region": region,
        "pack": str(pack_path),
        "post_draft": str(post_path),
        "message": "Link ingested. Region tagged. Draft in outbox. Your ceiling: post the draft.",
    }


def cmd_heat(args: dict) -> dict:
    """Pull REACH hot board as global heat context for Clout."""
    code, rank = http_json("GET", f"{REACH_COMPILE.rstrip('/')}/v1/rank/hot", auth=True)
    if code != 200:
        # public health still useful
        _, health = http_json("GET", f"{REACH_COMPILE.rstrip('/')}/health")
        return {
            "ok": False,
            "http": code,
            "error": rank,
            "health": health,
            "hint": "Set REACH_TRIGGER_TOKEN or run REACH compile first",
        }
    regions = args.get("regions") or ["US", "GLOBAL", "LATAM", "ASIA_KPOP"]
    zones = rank.get("hot_zones") or rank.get("entries") or []
    summary = {
        "schema": "open_claw.heat.v1",
        "ts": utc_now(),
        "source": "reach-compile",
        "run_id": rank.get("run_id"),
        "regions_requested": regions,
        "top": [
            {
                "rank": z.get("rank"),
                "market": z.get("market"),
                "country": z.get("country"),
                "state": z.get("state"),
                "grade": z.get("grade"),
                "cross_rank": z.get("cross_rank"),
                "clout_angle": f"Regional heat {z.get('country')}/{z.get('market')} — package creator angles for local Beyoncé markets",
            }
            for z in zones[: int(args.get("hot_limit") or 15)]
        ],
        "claw": "HEAT",
    }
    path = OUTBOX / f"HEAT_{datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')}.json"
    path.write_text(json.dumps(summary, indent=2), encoding="utf-8")
    event("heat", count=len(summary["top"]))
    return {"ok": True, "path": str(path), "count": len(summary["top"]), "summary": summary}


def cmd_draft_post(args: dict) -> dict:
    opp = args.get("opp_hash") or "CC-GLOBAL"
    channel = args.get("channel") or "x"
    region = args.get("region") or "GLOBAL"
    text = f"""# Post draft · {channel} · {region}

Find tomorrow's viral content today — not US-only.
{CLOUT_PUBLIC}/#opportunities

Opp: {opp}
Region: {region}

#CloutChaser #Prime88
"""
    path = OUTBOX / f"POST_{opp}_{channel}.md"
    path.write_text(text, encoding="utf-8")
    return {"ok": True, "path": str(path), "claw": "POST"}


HANDLERS = {
    "status": cmd_status,
    "list_regions": cmd_list_regions,
    "paste": cmd_paste,
    "heat": cmd_heat,
    "draft_post": cmd_draft_post,
    "ping": lambda _: {"ok": True, "pong": True, "family": "open-claw"},
}


def process(path: Path) -> None:
    try:
        msg = json.loads(path.read_text(encoding="utf-8"))
    except Exception as e:
        event("bad_json", file=path.name, error=str(e))
        path.rename(PROCESSED / f"BAD_{path.name}")
        return
    cmd = (msg.get("cmd") or "").strip().lower()
    args = msg.get("args") if isinstance(msg.get("args"), dict) else {}
    handler = HANDLERS.get(cmd)
    result = handler(args) if handler else {"ok": False, "error": f"unknown:{cmd}", "known": list(HANDLERS)}
    out = {"ts": utc_now(), "cmd": cmd, "inbox": path.name, "result": result, "authority": AUTHORITY}
    (OUTBOX / f"reply_{path.stem}_{int(time.time())}.json").write_text(
        json.dumps(out, indent=2), encoding="utf-8"
    )
    (RECEIPTS / f"claw_{path.stem}_{int(time.time())}.json").write_text(
        json.dumps(out, indent=2), encoding="utf-8"
    )
    path.rename(PROCESSED / path.name)
    write_status({"last_cmd": cmd, "last_ok": result.get("ok")})
    print(json.dumps({"processed": path.name, "cmd": cmd, "ok": result.get("ok")}, indent=2))


def cycle() -> None:
    ensure()
    if kill():
        write_status({"alive": False, "reason": "kill_switch"})
        raise SystemExit(0)
    write_status()
    for path in sorted(INBOX.glob("*.json")):
        process(path)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--loop", type=int, default=0)
    args = ap.parse_args()
    ensure()
    welcome = OUTBOX / "README_HUMAN_CEILING.txt"
    if not welcome.exists():
        welcome.write_text(
            "HUMAN CEILING\n"
            "1) Paste a public link: inbox/{\"cmd\":\"paste\",\"args\":{\"url\":\"...\",\"niche\":\"Bollywood\"}}\n"
            "2) Or post whatever is in outbox/POST_*.md\n"
            "3) Ask Meta for IN/JP/etc page → paste Clout link. Done.\n"
            "Never cold-spam. Open Claw + REACH heat do the rest.\n",
            encoding="utf-8",
        )
    if args.loop <= 0:
        cycle()
        return
    print(f"open-claw loop {args.loop}s · {AUTHORITY['clout_live']}")
    while True:
        cycle()
        time.sleep(args.loop)


if __name__ == "__main__":
    main()

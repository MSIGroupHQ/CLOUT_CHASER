#!/usr/bin/env python3
"""
CLOUT CHASER AD VARIANT SPLITTER & A/B TEST CUTTER
Uses FFmpeg to split the master Runway launch trailer into focused 15s commercial ad hooks,
6s bumper clips, and A/B testing variants for TikTok, Instagram Reels, and YouTube Shorts.
"""

import subprocess
from pathlib import Path

VIDEO_DIR = Path(r"C:\Users\DM\Documents\crm.prime88.studio\clout-chaser-public\public\media\video")
MASTER_TRAILER = VIDEO_DIR / "runway-clout-chaser-launch-30s-20260731-151332.mp4"

VARIANTS = [
    {
        "name": "clout_ad_hook_variant_a_15s.mp4",
        "start": "0",
        "duration": "15",
        "desc": "15s Hook Cut — Arcade & Console Opening"
    },
    {
        "name": "clout_ad_core_variant_b_15s.mp4",
        "start": "15",
        "duration": "15",
        "desc": "15s Core Product Cut — Attention Scoring & Viral Intelligence"
    },
    {
        "name": "clout_ad_outro_variant_c_15s.mp4",
        "start": "30",
        "duration": "15",
        "desc": "15s Outro Cut — Call to Action & Proof Receipt"
    },
    {
        "name": "clout_ad_bumper_6s.mp4",
        "start": "0",
        "duration": "6",
        "desc": "6s Bumper Ad — High Velocity Teaser"
    }
]

def generate_ad_variants():
    if not MASTER_TRAILER.exists():
        print(f"[!] Master trailer not found at: {MASTER_TRAILER}")
        return

    print("=" * 80)
    print("     CLOUT CHASER AD VARIANT SPLITTER & A/B TEST CUTTER")
    print("=" * 80)

    for v in VARIANTS:
        out_path = VIDEO_DIR / v["name"]
        cmd = [
            "ffmpeg", "-y",
            "-ss", v["start"],
            "-i", str(MASTER_TRAILER),
            "-t", v["duration"],
            "-c:v", "copy",
            "-c:a", "copy",
            str(out_path)
        ]
        print(f"[*] Generating: {v['name']} ({v['desc']})...")
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode == 0:
            print(f"    [OK] Saved: {out_path.name}")
        else:
            print(f"    [!] Error splitting {v['name']}: {res.stderr[:200]}")

if __name__ == "__main__":
    generate_ad_variants()

"use client";

import { useEffect } from "react";
import type { CloutEventEnvelope } from "@/lib/clout/types";

type PostHogClient = {
  capture: (name: string, properties?: Record<string, unknown>) => void;
};

type AnalyticsWindow = typeof window & {
  __cloutPostHog?: PostHogClient;
  __cloutPostHogQueue?: CloutEventEnvelope[];
};

export function PostHogProvider() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
    if (!key) {
      document.documentElement.dataset.cloutPosthog = "disabled";
      return;
    }

    let active = true;
    void import("posthog-js").then(({ default: posthog }) => {
      if (!active) return;
      posthog.init(key, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || "https://us.i.posthog.com",
        capture_pageview: false,
        capture_pageleave: false,
        autocapture: false,
        disable_session_recording: true,
        person_profiles: "identified_only",
        persistence: "memory",
      });
      const analyticsWindow = window as AnalyticsWindow;
      analyticsWindow.__cloutPostHog = posthog;
      for (const event of analyticsWindow.__cloutPostHogQueue || []) {
        posthog.capture(event.name, { ...event.properties, $insert_id: event.event_id });
      }
      analyticsWindow.__cloutPostHogQueue = [];
      document.documentElement.dataset.cloutPosthog = "ready";
    }).catch(() => {
      document.documentElement.dataset.cloutPosthog = "unavailable";
    });

    return () => { active = false; };
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";
import { trackCloutEvent } from "@/lib/clout/events";
import type { CloutEventName, CloutEventProperties } from "@/lib/clout/types";

export function PageEvent({
  name,
  properties,
}: {
  name: CloutEventName;
  properties?: CloutEventProperties;
}) {
  useEffect(() => {
    trackCloutEvent(name, properties);
  }, [name, properties]);

  return null;
}


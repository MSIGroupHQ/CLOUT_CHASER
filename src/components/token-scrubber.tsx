"use client";

import { useEffect } from "react";

export function TokenScrubber() {
  useEffect(() => {
    if (window.location.search) window.history.replaceState({}, "", window.location.pathname);
  }, []);
  return null;
}

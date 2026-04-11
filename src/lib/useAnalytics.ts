"use client";

import { useCallback } from "react";
import { trackEvent } from "@/lib/analytics";

export function useAnalytics() {
  return useCallback((event: string, props: Record<string, unknown> = {}) => {
    trackEvent(event, props);
  }, []);
}

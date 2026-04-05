"use client";

import { useCallback } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function useAnalytics() {
  return useCallback((event: string, props: Record<string, unknown> = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...props });

    if (process.env.NODE_ENV === "development") {
      console.log("[track]", event, props);
    }
  }, []);
}

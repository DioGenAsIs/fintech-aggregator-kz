"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

export function AnalyticsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedRef = useRef<string>("");

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    if (lastTrackedRef.current === pagePath) {
      return;
    }

    lastTrackedRef.current = pagePath;

    const locale = pathname.split("/").filter(Boolean)[0] || "kk";
    const pageName = pathname.split("/").filter(Boolean).slice(1).join("/") || "home";

    trackPageView({
      page_path: pagePath,
      page_name: pageName,
      locale,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

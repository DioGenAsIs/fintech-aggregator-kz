export const GA_MEASUREMENT_ID = "G-JW2FX7VDCM";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsPayload = Record<string, unknown>;

const isBrowser = () => typeof window !== "undefined";

function pushDataLayer(event: string, payload: AnalyticsPayload) {
  if (!isBrowser()) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  const eventPayload = {
    ...payload,
    timestamp: payload.timestamp ?? new Date().toISOString(),
  };

  if (!isBrowser()) {
    return { event, ...eventPayload };
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", event, eventPayload);
  }

  pushDataLayer(event, eventPayload);

  if (process.env.NODE_ENV === "development") {
    console.log("[track:event]", event, eventPayload);
  }

  return { event, ...eventPayload };
}

export function trackPageView(payload: AnalyticsPayload = {}) {
  const pagePayload = {
    ...payload,
    timestamp: payload.timestamp ?? new Date().toISOString(),
  };

  if (!isBrowser()) {
    return { event: "page_view", ...pagePayload };
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", pagePayload);
  }

  pushDataLayer("page_view", pagePayload);

  if (process.env.NODE_ENV === "development") {
    console.log("[track:page_view]", pagePayload);
  }

  return { event: "page_view", ...pagePayload };
}

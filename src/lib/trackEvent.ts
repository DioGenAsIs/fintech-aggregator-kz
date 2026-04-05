export type EventProps = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(event: string, props: EventProps = {}) {
  const payload = { event, ...props };

  if (typeof window === "undefined") {
    return payload;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  if (process.env.NODE_ENV === "development") {
    console.log("[track]", event, props);
  }

  return payload;
}

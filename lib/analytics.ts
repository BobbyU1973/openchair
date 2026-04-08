export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | null | undefined>;

export function trackPageView(url: string) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url
  });
}

export function trackEvent(eventName: string, params: EventParams = {}) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

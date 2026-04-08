"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

type TrackEventProps = {
  eventName: string;
  params?: Record<string, string | number | boolean | null | undefined>;
  enabled?: boolean;
};

export function TrackEvent({
  eventName,
  params = {},
  enabled = true
}: TrackEventProps) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    trackEvent(eventName, params);
  }, [enabled, eventName, params]);

  return null;
}

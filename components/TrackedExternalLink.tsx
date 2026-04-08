"use client";

import type { ComponentPropsWithoutRef } from "react";
import { trackEvent } from "@/lib/analytics";

type EventParams = Record<string, string | number | boolean | null | undefined>;

type TrackedExternalLinkProps = ComponentPropsWithoutRef<"a"> & {
  eventName: string;
  eventParams?: EventParams;
};

export function TrackedExternalLink({
  eventName,
  eventParams = {},
  onClick,
  ...props
}: TrackedExternalLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event);
        trackEvent(eventName, eventParams);
      }}
    />
  );
}

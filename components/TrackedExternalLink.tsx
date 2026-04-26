"use client";

import type { ComponentPropsWithoutRef } from "react";
import { trackEvent } from "@/lib/analytics";

type EventParams = Record<string, string | number | boolean | null | undefined>;

type TrackedExternalLinkProps = ComponentPropsWithoutRef<"a"> & {
  eventName: string;
  eventParams?: EventParams;
};

function mergeRel(rel?: string) {
  const values = new Set((rel ?? "").split(/\s+/).filter(Boolean));

  values.add("nofollow");
  values.add("noopener");
  values.add("noreferrer");

  return Array.from(values).join(" ");
}

export function TrackedExternalLink({
  eventName,
  eventParams = {},
  onClick,
  rel,
  ...props
}: TrackedExternalLinkProps) {
  return (
    <a
      {...props}
      rel={mergeRel(rel)}
      onClick={(event) => {
        onClick?.(event);
        trackEvent(eventName, eventParams);
      }}
    />
  );
}

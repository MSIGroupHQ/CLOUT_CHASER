"use client";

import Link from "next/link";
import { trackCloutEvent } from "@/lib/clout/events";
import type { CloutEventName, CloutEventProperties } from "@/lib/clout/types";

export function EventLink({
  href,
  event,
  properties,
  className,
  children,
  external = false,
}: {
  href: string;
  event: CloutEventName;
  properties?: CloutEventProperties;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const onClick = () => trackCloutEvent(event, properties);

  if (external) {
    return (
      <a className={className} href={href} onClick={onClick} rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href} onClick={onClick}>
      {children}
    </Link>
  );
}


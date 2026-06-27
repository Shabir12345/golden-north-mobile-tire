"use client";

// ─── Reveal ───────────────────────────────────────────────────────────────────
// Scroll-triggered entrance that NEVER ships blank. Server output renders the
// child fully visible (class "reveal"). On the client we "arm" it (hide) and
// observe; once it scrolls into view we play the fadeUp. If JS never runs, or
// the element never intersects (headless render, hidden tab), it stays visible.
// prefers-reduced-motion forces it visible via globals.css.
//
// `delay` (ms) staggers items within a list — legitimate, per-item motion, not
// the uniform every-section reflex.

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Render as a different element (e.g. "li", "article"). Default "div". */
  as?: ElementType;
}

export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (SSR/jsdom/old browsers) → leave content visible.
    if (typeof IntersectionObserver === "undefined") return;

    const reduce =
      typeof window !== "undefined" && typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;
    if (reduce) return; // leave visible; no animation

    setArmed(true); // hide until in view

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-in");
            io.unobserve(el);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${armed ? "is-armed" : ""} ${className}`.trim()}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

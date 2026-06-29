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

    // Arm only after mount, on the client. SSR output stays visible (the
    // anti-blank guarantee), then this one-time setState hides it for the
    // entrance. The cascading-render warning doesn't apply to a single arm.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setArmed(true); // hide until in view

    let revealed = false;
    const teardown: (() => void)[] = [];

    // Single place that plays the entrance and tears down every trigger.
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      el.classList.add("is-in");
      teardown.forEach((fn) => fn());
    };

    // Guarantee against blank content: the observer can miss an element that
    // jumps from below the viewport to above it in one frame (anchor jump,
    // scroll restoration, fast fling) — the intersection ratio goes 0→0 and no
    // callback fires. A passive scroll check always sees the new position and
    // removes itself the moment the element reveals.
    const onScroll = () => {
      if (el.getBoundingClientRect().top < window.innerHeight) reveal();
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            reveal();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Backstop for a frozen/headless engine where neither fires: if the element
    // is already in or above the viewport shortly after mount, reveal it.
    // Genuinely below-fold elements stay armed for their real entrance.
    const safety = setTimeout(onScroll, 1500);

    teardown.push(
      () => io.disconnect(),
      () => clearTimeout(safety),
      () => window.removeEventListener("scroll", onScroll),
    );

    return () => teardown.forEach((fn) => fn());
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

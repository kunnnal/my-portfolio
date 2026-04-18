"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !dotRef.current ||
      !ringRef.current ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    const moveDotX = gsap.quickTo(dotRef.current, "x", {
      duration: 0.12,
      ease: "power2.out"
    });
    const moveDotY = gsap.quickTo(dotRef.current, "y", {
      duration: 0.12,
      ease: "power2.out"
    });
    const moveRingX = gsap.quickTo(ringRef.current, "x", {
      duration: 0.28,
      ease: "power3.out"
    });
    const moveRingY = gsap.quickTo(ringRef.current, "y", {
      duration: 0.28,
      ease: "power3.out"
    });

    const handleMove = (event: MouseEvent) => {
      moveDotX(event.clientX - 4);
      moveDotY(event.clientY - 4);
      moveRingX(event.clientX - 18);
      moveRingY(event.clientY - 18);
    };

    const handleHoverState = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const isInteractive = Boolean(target?.closest("a, button, input, textarea"));

      gsap.to(ringRef.current, {
        scale: isInteractive ? 1.35 : 1,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    const handlePress = () => {
      gsap.to(ringRef.current, {
        scale: 0.88,
        duration: 0.15
      });
    };

    const handleRelease = () => {
      gsap.to(ringRef.current, {
        scale: 1,
        duration: 0.2
      });
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleHoverState);
    window.addEventListener("mousedown", handlePress);
    window.addEventListener("mouseup", handleRelease);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleHoverState);
      window.removeEventListener("mousedown", handlePress);
      window.removeEventListener("mouseup", handleRelease);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-9 w-9 rounded-full border border-accent/60 bg-transparent md:block"
        style={{
          boxShadow: "0 0 24px rgba(var(--accent-rgb), 0.18)"
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[91] hidden h-2 w-2 rounded-full bg-accent md:block"
        style={{
          boxShadow: "0 0 18px rgba(var(--accent-rgb), 0.45)"
        }}
      />
    </>
  );
}

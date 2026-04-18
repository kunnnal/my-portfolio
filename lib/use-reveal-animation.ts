"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealOptions = {
  offsetY?: number;
  stagger?: number;
  start?: string;
};

export function useRevealAnimation<T extends HTMLElement>({
  offsetY = 28,
  stagger = 0.08,
  start = "top 82%"
}: RevealOptions = {}) {
  const scopeRef = useRef<T | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            autoAlpha: 0,
            y: offsetY,
            scale: 0.98
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: index * stagger,
            scrollTrigger: {
              trigger: item,
              start,
              once: true
            }
          }
        );
      });
    }, scopeRef);

    return () => context.revert();
  }, [offsetY, stagger, start]);

  return scopeRef;
}

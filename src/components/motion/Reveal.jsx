"use client";
import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMotion } from "./MotionProvider";

/**
 * Apparition au scroll (remplace l'ancien SlideUp framer-motion, même API `delay`).
 * - `delay` : 1 = aucun délai, n = n × 0.08 s
 * - `variant` : "up" (défaut), "fade", "scale", "clip"
 */
const Reveal = ({
  children,
  delay = 1,
  variant = "up",
  className = "",
  start = "top 92%",
  as: Tag = "div",
  ...rest
}) => {
  const ref = useRef(null);
  const { ready, reduced } = useMotion();

  useGSAP(
    () => {
      if (!ready || reduced || !ref.current) return;
      const el = ref.current;
      const wait = delay === 1 ? 0 : Math.min(0.08 * delay, 0.6);
      const scrollTrigger = { trigger: el, start, once: true };

      if (variant === "clip") {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)", y: 40 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 1.3,
            ease: "expo.out",
            delay: wait,
            scrollTrigger,
            clearProps: "clipPath,transform",
          }
        );
        return;
      }

      const from =
        variant === "fade"
          ? { opacity: 0 }
          : variant === "scale"
          ? { opacity: 0, scale: 0.92, y: 30 }
          : { opacity: 0, y: 70 };

      gsap.fromTo(el, from, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.15,
        ease: "expo.out",
        delay: wait,
        scrollTrigger,
        clearProps: "transform,opacity",
      });
    },
    { dependencies: [ready, reduced, delay, variant, start], revertOnUpdate: true }
  );

  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;

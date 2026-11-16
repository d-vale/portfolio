"use client";
import React, { useRef } from "react";
import { gsap, useGSAP, canHover } from "@/lib/gsap";
import { useMotion } from "./MotionProvider";

/** Attire son contenu vers la souris (boutons, liens, icônes). */
const Magnetic = ({ children, strength = 0.35, className = "", ...rest }) => {
  const ref = useRef(null);
  const { reduced } = useMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced || !canHover()) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "elastic.out(1, 0.4)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "elastic.out(1, 0.4)" });

      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
        yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { dependencies: [reduced, strength], revertOnUpdate: true }
  );

  return (
    <span ref={ref} className={`magnetic ${className}`.trim()} {...rest}>
      {children}
    </span>
  );
};

export default Magnetic;

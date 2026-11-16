"use client";
import React, { useRef } from "react";
import { gsap, useGSAP, canHover } from "@/lib/gsap";
import { useMotion } from "./MotionProvider";

/** Inclinaison 3D qui suit la souris, avec reflet (variables --gx / --gy). */
const TiltCard = ({ children, max = 7, className = "", ...rest }) => {
  const wrap = useRef(null);
  const inner = useRef(null);
  const { reduced } = useMotion();

  useGSAP(
    () => {
      const el = wrap.current;
      const card = inner.current;
      if (!el || !card || reduced || !canHover()) return;

      const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
      const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });

      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        ry((px - 0.5) * 2 * max);
        rx((0.5 - py) * 2 * max);
        card.style.setProperty("--gx", `${px * 100}%`);
        card.style.setProperty("--gy", `${py * 100}%`);
      };
      const onEnter = () => el.classList.add("is-tilting");
      const onLeave = () => {
        el.classList.remove("is-tilting");
        rx(0);
        ry(0);
      };

      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        el.classList.remove("is-tilting");
      };
    },
    { dependencies: [reduced, max], revertOnUpdate: true }
  );

  return (
    <div ref={wrap} className={`tilt ${className}`.trim()} {...rest}>
      <div ref={inner} className="tilt__inner">
        {children}
        <span className="tilt__glare" aria-hidden="true" />
      </div>
    </div>
  );
};

export default TiltCard;

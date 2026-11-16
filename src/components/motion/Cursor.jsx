"use client";
import React, { useRef } from "react";
import { gsap, useGSAP, canHover } from "@/lib/gsap";
import { useMotion } from "./MotionProvider";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, .filter-btns-one li, [data-cursor]";

/** Curseur personnalisé : point + anneau suiveur, pastille de texte sur [data-cursor-label]. */
const Cursor = () => {
  const root = useRef(null);
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);
  const { reduced } = useMotion();

  useGSAP(
    () => {
      if (reduced || !canHover()) return;
      const el = root.current;
      document.documentElement.classList.add("has-cursor");

      gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50 });
      const dotX = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3.out" });
      const dotY = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3.out" });
      const ringX = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3.out" });
      const ringY = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3.out" });

      let shown = false;
      const onMove = (e) => {
        if (!shown) {
          shown = true;
          gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
          el.classList.add("is-visible");
        }
        dotX(e.clientX);
        dotY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);
      };

      const onOver = (e) => {
        const target = e.target instanceof Element ? e.target : null;
        const labelled = target && target.closest("[data-cursor-label]");
        const interactive = target && target.closest(INTERACTIVE);
        if (labelled) {
          label.current.textContent = labelled.getAttribute("data-cursor-label");
          el.classList.add("is-label");
          el.classList.remove("is-hover");
        } else {
          el.classList.remove("is-label");
          el.classList.toggle("is-hover", Boolean(interactive));
        }
      };

      const onDown = () => el.classList.add("is-down");
      const onUp = () => el.classList.remove("is-down");
      const onLeave = () => {
        shown = false;
        el.classList.remove("is-visible");
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      window.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
      document.documentElement.addEventListener("pointerleave", onLeave);

      return () => {
        document.documentElement.classList.remove("has-cursor");
        el.classList.remove("is-visible", "is-hover", "is-label", "is-down");
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        window.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointerup", onUp);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      };
    },
    { dependencies: [reduced], revertOnUpdate: true }
  );

  return (
    <div ref={root} className="cursor" aria-hidden="true">
      <div ref={ring} className="cursor__ring">
        <span ref={label} className="cursor__label" />
      </div>
      <div ref={dot} className="cursor__dot" />
    </div>
  );
};

export default Cursor;

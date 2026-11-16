"use client";
import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Fine barre de progression de lecture en haut de page. */
const ScrollProgress = () => {
  const bar = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      }
    );
  });

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={bar} className="scroll-progress__bar" />
    </div>
  );
};

export default ScrollProgress;

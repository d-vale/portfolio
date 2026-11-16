"use client";
import React, { useRef } from "react";
import { gsap, useGSAP, canHover } from "@/lib/gsap";
import { useMotion } from "./MotionProvider";

/** Fond d'ambiance : halos colorés qui dérivent et suivent lentement la souris, plus un grain. */
const Ambient = () => {
  const root = useRef(null);
  const follow = useRef(null);
  const { reduced } = useMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const blobs = gsap.utils.toArray(".ambient__blob", root.current);
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          xPercent: i % 2 ? -18 : 22,
          yPercent: i % 2 ? 16 : -14,
          scale: i % 2 ? 1.15 : 0.9,
          duration: 14 + i * 5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      if (!canHover()) return;
      const xTo = gsap.quickTo(follow.current, "x", { duration: 2.4, ease: "power3.out" });
      const yTo = gsap.quickTo(follow.current, "y", { duration: 2.4, ease: "power3.out" });
      const onMove = (e) => {
        xTo(e.clientX - window.innerWidth / 2);
        yTo(e.clientY - window.innerHeight / 2);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true }
  );

  return (
    <>
      <div ref={root} className="ambient" aria-hidden="true">
        <div className="ambient__blob ambient__blob--a" />
        <div className="ambient__blob ambient__blob--b" />
        <div ref={follow} className="ambient__follow" />
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
};

export default Ambient;

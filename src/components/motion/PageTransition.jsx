"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "./MotionProvider";

/** Rideau de transition entre les pages (deux panneaux + nom de la page). */
const PageTransition = () => {
  const root = useRef(null);
  const accent = useRef(null);
  const panel = useRef(null);
  const label = useRef(null);
  const { registerTransition } = useMotion();

  useEffect(() => {
    const el = root.current;
    gsap.set([accent.current, panel.current], { yPercent: 100 });

    let coverTl = null;
    let revealTl = null;

    const api = {
      cover(text) {
        return new Promise((resolve) => {
          if (revealTl) revealTl.kill();
          revealTl = null;
          label.current.textContent = text || "";
          gsap.killTweensOf([accent.current, panel.current, label.current]);
          gsap.set(el, { visibility: "visible" });
          coverTl = gsap
            .timeline({ onComplete: resolve })
            .fromTo(
              accent.current,
              { yPercent: 100 },
              { yPercent: 0, duration: 0.6, ease: "expo.inOut" }
            )
            .fromTo(
              panel.current,
              { yPercent: 100 },
              { yPercent: 0, duration: 0.6, ease: "expo.inOut" },
              0.1
            )
            .fromTo(
              label.current,
              { yPercent: 120, opacity: 1 },
              { yPercent: 0, duration: 0.55, ease: "expo.out" },
              0.42
            );
        });
      },
      reveal() {
        return new Promise((resolve) => {
          if (coverTl) coverTl.kill();
          coverTl = null;
          revealTl = gsap
            .timeline({
              onComplete: () => {
                gsap.set(el, { visibility: "hidden" });
                resolve();
              },
            })
            .set([accent.current, panel.current], { yPercent: 0 })
            .to(label.current, {
              yPercent: -120,
              duration: 0.4,
              ease: "power3.in",
            })
            .to(
              panel.current,
              { yPercent: -100, duration: 0.75, ease: "expo.inOut" },
              0.15
            )
            .to(
              accent.current,
              { yPercent: -100, duration: 0.75, ease: "expo.inOut" },
              0.25
            );
        });
      },
    };

    registerTransition(api);
    return () => registerTransition(null);
  }, [registerTransition]);

  return (
    <div ref={root} className="page-transition" aria-hidden="true">
      <div ref={accent} className="page-transition__accent" />
      <div ref={panel} className="page-transition__panel">
        <div className="page-transition__mask">
          <span ref={label} className="page-transition__label" />
        </div>
      </div>
    </div>
  );
};

export default PageTransition;

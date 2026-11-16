"use client";
import React, { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useMotion } from "@/components/motion/MotionProvider";

const NAME = "Daniel Vale";
const FULL = "M0 0 L100 0 L100 100 Q50 100 0 100 Z";
const BULGE = "M0 0 L100 0 L100 42 Q50 100 0 42 Z";
const GONE = "M0 0 L100 0 L100 0 Q50 0 0 0 Z";

const Preloader = () => {
  const root = useRef(null);
  const count = useRef(null);
  const { setReady } = useMotion();
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        setReady(true);
        setDone(true);
        return;
      }

      let seen = false;
      try {
        seen = sessionStorage.getItem("preloader-seen") === "1";
        sessionStorage.setItem("preloader-seen", "1");
      } catch (e) {
        /* stockage indisponible : on joue l'intro complète */
      }

      const progress = { value: 0 };
      const loadTime = seen ? 0.7 : 1.9;

      const tl = gsap.timeline({ onComplete: () => setDone(true) });
      tl.from(".pl__char", {
        yPercent: 115,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.035,
      })
        .from(".pl__meta", { autoAlpha: 0, duration: 0.5 }, 0.1)
        .to(
          progress,
          {
            value: 100,
            duration: loadTime,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count.current) {
                count.current.textContent = String(Math.round(progress.value)).padStart(3, "0");
              }
            },
          },
          0.1
        )
        .fromTo(
          ".pl__bar-fill",
          { scaleX: 0 },
          { scaleX: 1, duration: loadTime, ease: "power2.inOut" },
          0.1
        )
        .to(".pl__char", {
          yPercent: -115,
          duration: 0.55,
          ease: "expo.in",
          stagger: 0.02,
        })
        .to(".pl__meta", { autoAlpha: 0, duration: 0.3 }, "<")
        // Le contenu de la page démarre ses animations pendant que le rideau se lève
        .add(() => setReady(true))
        .to(".pl__path--front", { attr: { d: BULGE }, duration: 0.45, ease: "power2.in" })
        .to(".pl__path--front", { attr: { d: GONE }, duration: 0.55, ease: "power2.out" })
        .to(".pl__path--back", { attr: { d: BULGE }, duration: 0.45, ease: "power2.in" }, "-=0.85")
        .to(".pl__path--back", { attr: { d: GONE }, duration: 0.55, ease: "power2.out" }, ">");
    },
    { scope: root }
  );

  if (done) return null;

  return (
    <div ref={root} className="pl" aria-hidden="true">
      <svg className="pl__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path className="pl__path pl__path--back" d={FULL} />
        <path className="pl__path pl__path--front" d={FULL} />
      </svg>
      <div className="pl__content">
        <div className="pl__name">
          {NAME.split("").map((char, i) => (
            <span className="pl__char-mask" key={i}>
              <span className="pl__char">{char === " " ? " " : char}</span>
            </span>
          ))}
        </div>
        <div className="pl__meta">
          <span className="pl__role">Portfolio — Software Engineer</span>
          <span className="pl__bar">
            <span className="pl__bar-fill" />
          </span>
          <span ref={count} className="pl__count">
            000
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;

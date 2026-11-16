"use client";
import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMotion } from "./MotionProvider";

/**
 * Défilement infini dont la vitesse et le sens réagissent au scroll.
 * Le contenu est dupliqué (copies masquées aux lecteurs d'écran).
 */
const VelocityMarquee = ({
  children,
  speed = 60, // px / seconde
  copies = 4,
  direction = -1,
  className = "",
}) => {
  const root = useRef(null);
  const track = useRef(null);
  const { reduced } = useMotion();

  useGSAP(
    () => {
      const el = track.current;
      const first = el && el.firstElementChild;
      if (!el || !first || reduced) return;

      let unit = first.getBoundingClientRect().width;
      let x = 0;
      let dir = direction;
      let boost = 0;
      let lastScroll = window.scrollY;
      let visible = true;

      const ro = new ResizeObserver(() => {
        unit = first.getBoundingClientRect().width;
      });
      ro.observe(first);

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      io.observe(root.current);

      const setX = gsap.quickSetter(el, "x", "px");

      const tick = (_time, deltaMs) => {
        const scrollY = window.scrollY;
        const delta = scrollY - lastScroll;
        lastScroll = scrollY;
        if (!visible || !unit) return;

        if (delta > 0.5) dir = direction;
        else if (delta < -0.5) dir = -direction;
        boost += (Math.min(Math.abs(delta) * 0.9, 60) - boost) * 0.12;

        const dt = Math.min(deltaMs, 60) / 1000;
        x += dir * (speed * dt + boost * dt * 14);
        if (x <= -unit) x += unit;
        if (x > 0) x -= unit;
        setX(x);
      };

      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        ro.disconnect();
        io.disconnect();
      };
    },
    { dependencies: [reduced, speed, direction], revertOnUpdate: true }
  );

  return (
    <div
      ref={root}
      className={`vmarquee ${reduced ? "is-static" : ""} ${className}`.trim()}
    >
      <div ref={track} className="vmarquee__track">
        {Array.from({ length: reduced ? 1 : copies }).map((_, i) => (
          <div className="vmarquee__group" key={i} aria-hidden={i > 0 ? "true" : undefined}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VelocityMarquee;

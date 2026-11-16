"use client";
import React, { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useMotion } from "./MotionProvider";

/**
 * Texte révélé par masque (lignes, mots ou lettres).
 * - `mode="reveal"` : les éléments montent depuis sous leur masque à l'entrée dans l'écran
 * - `mode="scrub"`  : les mots s'illuminent au fil du scroll
 * Le contenu doit être du texte statique : SplitText réécrit le DOM de l'élément.
 */
const SplitReveal = ({
  children,
  as: Tag = "h2",
  by = "words",
  mode = "reveal",
  delay = 0,
  stagger,
  start = "top 90%",
  className = "",
  ...rest
}) => {
  const ref = useRef(null);
  const { ready, reduced } = useMotion();

  useGSAP(
    () => {
      if (!ready || reduced || !ref.current) return;
      const el = ref.current;
      let split;

      if (mode === "scrub") {
        split = SplitText.create(el, {
          type: "words",
          autoSplit: true,
          onSplit(self) {
            return gsap.fromTo(
              self.words,
              { opacity: 0.16 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.12,
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%",
                  end: "top 40%",
                  scrub: 0.6,
                },
              }
            );
          },
        });
      } else {
        const type =
          by === "chars" ? "words,chars" : by === "lines" ? "lines" : "lines,words";
        const mask = by === "chars" ? "words" : "lines";
        split = SplitText.create(el, {
          type,
          mask,
          // Découpe par lignes : le texte réel reste lisible par les lecteurs d'écran
          aria: by === "lines" ? "none" : "auto",
          autoSplit: true,
          linesClass: "split-line",
          onSplit(self) {
            const targets =
              by === "chars" ? self.chars : by === "lines" ? self.lines : self.words;
            return gsap.from(targets, {
              yPercent: 115,
              rotate: by === "chars" ? 6 : 0,
              duration: by === "chars" ? 1.1 : 1.2,
              ease: "expo.out",
              delay,
              stagger: stagger ?? (by === "chars" ? 0.028 : by === "lines" ? 0.09 : 0.035),
              scrollTrigger: { trigger: el, start, once: true },
            });
          },
        });
      }

      return () => split && split.revert();
    },
    {
      dependencies: [ready, reduced, by, mode, delay, stagger, start, children],
      revertOnUpdate: true,
    }
  );

  return (
    <Tag ref={ref} className={`split-reveal ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
};

export default SplitReveal;

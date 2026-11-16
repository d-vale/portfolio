"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 0.8 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const normalizePath = (path = "/") => {
  const clean = path.split("#")[0].split("?")[0].replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
};

export { gsap, ScrollTrigger, SplitText, Flip, useGSAP };

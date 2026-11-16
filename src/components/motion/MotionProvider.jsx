"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import {
  gsap,
  ScrollTrigger,
  normalizePath,
  prefersReducedMotion,
} from "@/lib/gsap";

const MotionContext = createContext({
  ready: true,
  reduced: false,
  lenisRef: { current: null },
  setReady: () => {},
  navigate: () => {},
  registerTransition: () => {},
});

export const useMotion = () => useContext(MotionContext);

// Cartes "bento" qui reçoivent le halo lumineux suivant la souris
const SPOTLIGHT_SELECTOR = [
  ".container-inner",
  ".about-image-part",
  ".about-content-part",
  ".about-content-part-bottom",
  ".single-resume",
  ".single-project-page-left",
  ".single-project-page-right",
  ".project-item",
  ".distinction-item",
  ".contact-form-area",
  ".contact-content-part",
].join(",");

const MotionProvider = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const lenisRef = useRef(null);
  const transitionRef = useRef(null);
  const pendingRef = useRef(null);
  const safetyRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  // ----- Préférence "réduire les animations"
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // ----- Scroll fluide (Lenis piloté par le ticker GSAP)
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      lerp: 0.11,
      wheelMultiplier: 1,
      autoRaf: false,
      anchors: true,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  // ----- Recalcul des déclencheurs quand les images arrivent
  useEffect(() => {
    let timer;
    const onLoad = (e) => {
      if (e.target && e.target.tagName === "IMG") {
        clearTimeout(timer);
        // refresh(true) : différé à la fin du scroll si l'utilisateur défile
        timer = setTimeout(() => ScrollTrigger.refresh(true), 200);
      }
    };
    document.addEventListener("load", onLoad, true);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("load", onLoad, true);
    };
  }, []);

  // ----- Halo qui suit la souris sur les cartes
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let last = null;
    const onMove = (e) => {
      last = e;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const target = last.target;
        if (!(target instanceof Element)) return;
        let card = target.closest(SPOTLIGHT_SELECTOR);
        while (card) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${last.clientX - rect.left}px`);
          card.style.setProperty("--my", `${last.clientY - rect.top}px`);
          card = card.parentElement
            ? card.parentElement.closest(SPOTLIGHT_SELECTOR)
            : null;
        }
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  // ----- Changement de route : remise en haut + sortie du rideau
  useEffect(() => {
    const lenis = lenisRef.current;
    const pending = pendingRef.current;
    let raf1 = 0;
    let raf2 = 0;

    if (pending) {
      pendingRef.current = null;
      clearTimeout(safetyRef.current);
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          setReady(true);
          const api = transitionRef.current;
          if (api) api.reveal().then(() => lenis && lenis.start());
          else if (lenis) lenis.start();
        });
      });
    } else {
      raf1 = requestAnimationFrame(() => ScrollTrigger.refresh());
    }
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [pathname]);

  const registerTransition = useCallback((api) => {
    transitionRef.current = api;
  }, []);

  const navigate = useCallback(
    (href, label) => {
      const api = transitionRef.current;
      const target = normalizePath(href);
      const current = normalizePath(window.location.pathname);

      if (target === current) {
        const lenis = lenisRef.current;
        if (lenis) {
          lenis.start(); // le menu mobile a pu le mettre en pause
          lenis.scrollTo(0, { duration: 1.1 });
        } else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (!api || prefersReducedMotion()) {
        router.push(href);
        return;
      }
      if (pendingRef.current) return;

      const token = { href };
      pendingRef.current = token;
      const lenis = lenisRef.current;
      if (lenis) lenis.stop();

      api.cover(label).then(() => {
        // Navigation annulée entre-temps (bouton Précédent pendant le rideau)
        if (pendingRef.current !== token) return;
        setReady(false);
        router.push(href);
        // Filet de sécurité : si la route ne change toujours pas, navigation classique
        safetyRef.current = setTimeout(() => {
          if (pendingRef.current !== token) return;
          window.location.assign(href);
        }, 8000);
      });
    },
    [router]
  );

  useEffect(() => () => clearTimeout(safetyRef.current), []);

  const value = useMemo(
    () => ({ ready, reduced, lenisRef, setReady, navigate, registerTransition }),
    [ready, reduced, navigate, registerTransition]
  );

  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
};

export default MotionProvider;

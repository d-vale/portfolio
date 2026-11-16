"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  RiShakeHandsFill,
  RiLinkedinFill,
  RiGithubLine,
} from "@remixicon/react";
import { menuList } from "@/utlits/data/menuList";
import ThemeToggle from "@/components/ui/themeToggle";
import TransitionLink from "@/components/motion/TransitionLink";
import Magnetic from "@/components/motion/Magnetic";
import { useMotion } from "@/components/motion/MotionProvider";
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  normalizePath,
} from "@/lib/gsap";

const isActive = (path, current) =>
  path === "/"
    ? current === "/"
    : current === path ||
      current.startsWith(`${path}/`) ||
      (path === "/works" && current.startsWith("/projet"));

const Header = () => {
  const pathname = normalizePath(usePathname() || "/");
  const { lenisRef, reduced, ready } = useMotion();
  const [open, setOpen] = useState(false);

  const header = useRef(null);
  const nav = useRef(null);
  const indicator = useRef(null);
  const menu = useRef(null);
  const menuTl = useRef(null);
  const openRef = useRef(false);

  // ----- Indicateur du lien actif
  const placeIndicator = useCallback((animate = true) => {
    const list = nav.current;
    const pill = indicator.current;
    if (!list || !pill) return;
    const active = list.querySelector("li.is-active");
    if (!active) {
      gsap.to(pill, { autoAlpha: 0, duration: 0.3, overwrite: true });
      return;
    }
    const listRect = list.getBoundingClientRect();
    const rect = active.getBoundingClientRect();
    gsap.to(pill, {
      x: rect.left - listRect.left,
      width: rect.width,
      autoAlpha: 1,
      duration: animate ? 0.7 : 0,
      ease: "expo.out",
      overwrite: true,
    });
  }, []);

  useGSAP(
    () => {
      placeIndicator(ready);
    },
    { dependencies: [pathname, ready] }
  );

  useEffect(() => {
    const onResize = () => placeIndicator(false);
    window.addEventListener("resize", onResize);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => placeIndicator(false));
    }
    return () => window.removeEventListener("resize", onResize);
  }, [placeIndicator]);

  // ----- Entrée + masquage au scroll vers le bas
  useGSAP(
    () => {
      const el = header.current;
      if (!el) return;

      if (ready && !reduced) {
        gsap.fromTo(
          el,
          { yPercent: -160 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: "expo.out",
            delay: 0.15,
            overwrite: true,
            clearProps: "transform",
          }
        );
      }

      let hidden = false;
      const show = () => {
        if (!hidden) return;
        hidden = false;
        gsap.to(el, { yPercent: 0, duration: 0.6, ease: "expo.out", overwrite: true });
      };
      const hide = () => {
        if (!ready || hidden || openRef.current || el.contains(document.activeElement)) return;
        hidden = true;
        gsap.to(el, { yPercent: -160, duration: 0.5, ease: "power3.in", overwrite: true });
      };

      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          el.classList.toggle("is-scrolled", y > 24);
          if (reduced) return;
          if (y < 160 || self.direction < 0) show();
          else if (self.direction > 0) hide();
        },
      });
      // Le header réapparaît dès que le focus clavier y entre
      el.addEventListener("focusin", show);
      return () => {
        st.kill();
        el.removeEventListener("focusin", show);
      };
    },
    { dependencies: [ready, reduced], revertOnUpdate: true }
  );

  // ----- Menu mobile plein écran
  useGSAP(
    () => {
      const el = menu.current;
      if (!el) return;
      gsap.set(el, { autoAlpha: 0 });
      const tl = gsap.timeline({ paused: true });
      tl.set(el, { autoAlpha: 1 })
        .fromTo(
          el,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.75, ease: "expo.inOut" }
        )
        .from(
          ".mobile-menu__link-inner",
          { yPercent: 115, duration: 0.8, ease: "expo.out", stagger: 0.07 },
          0.3
        )
        .fromTo(
          ".mobile-menu__foot > *",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
          0.55
        );
      tl.eventCallback("onReverseComplete", () => gsap.set(el, { autoAlpha: 0 }));
      menuTl.current = tl;
    },
    { scope: menu }
  );

  useEffect(() => {
    openRef.current = open;
    const tl = menuTl.current;
    const lenis = lenisRef.current;
    if (!tl) return;

    if (open) {
      if (lenis) lenis.stop();
      document.documentElement.classList.add("menu-open");
      if (reduced) tl.progress(1);
      else tl.timeScale(1).play();
    } else {
      if (lenis) lenis.start();
      document.documentElement.classList.remove("menu-open");
      if (reduced) {
        tl.progress(0).pause();
        gsap.set(menu.current, { autoAlpha: 0 });
      } else tl.timeScale(1.6).reverse();
    }
  }, [open, reduced, lenisRef]);

  // Fermeture : changement de page, touche Échap, passage en desktop
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 992px)");
    const onChange = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <>
      <header ref={header} className="site-header">
        <div className="container">
          <div className="site-header__bar">
            <TransitionLink href="/" label="Accueil" className="site-header__logo">
              Daniel Vale<span>.</span>
            </TransitionLink>

            <nav ref={nav} className="site-nav" aria-label="Navigation principale">
              <span ref={indicator} className="site-nav__indicator" aria-hidden="true" />
              <ul>
                {menuList.map(({ id, label, path }) => {
                  const active = isActive(path, pathname);
                  return (
                    <li key={id} className={active ? "is-active" : ""}>
                      <Magnetic strength={0.25}>
                        <TransitionLink
                          href={path}
                          label={label}
                          className="site-nav__link"
                          aria-current={active ? "page" : undefined}
                        >
                          {label}
                        </TransitionLink>
                      </Magnetic>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="site-header__actions">
              <Magnetic strength={0.3} className="site-header__cta">
                <TransitionLink href="/contact" label="Contact" className="theme-btn">
                  Contactez moi <RiShakeHandsFill size={15} />
                </TransitionLink>
              </Magnetic>
              <ThemeToggle />
              <button
                type="button"
                className={`menu-toggle ${open ? "is-open" : ""}`}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                onClick={() => setOpen((value) => !value)}
              >
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        ref={menu}
        id="mobile-menu"
        className="mobile-menu"
        data-lenis-prevent
        inert={!open}
        aria-hidden={!open}
      >
        <nav className="mobile-menu__nav" aria-label="Navigation mobile">
          <ul>
            {menuList.map(({ id, label, path }, index) => (
              <li key={id}>
                <TransitionLink
                  href={path}
                  label={label}
                  className={`mobile-menu__link ${
                    isActive(path, pathname) ? "is-active" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span className="mobile-menu__index">0{index + 1}</span>
                  <span className="mobile-menu__mask">
                    <span className="mobile-menu__link-inner">{label}</span>
                  </span>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__foot">
          <a href="https://www.linkedin.com/in/danielvale050403/" target="_blank" rel="noopener noreferrer">
            <RiLinkedinFill size={18} /> LinkedIn
          </a>
          <a href="https://github.com/d-vale" target="_blank" rel="noopener noreferrer">
            <RiGithubLine size={18} /> GitHub
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;

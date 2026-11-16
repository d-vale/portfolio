"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  RiCloseLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowRightUpLine,
  RiGithubFill,
  RiGlobalLine,
  RiFileTextLine,
  RiAwardLine,
  RiFigmaLine,
  RiVideoLine,
  RiLinkedinLine,
} from "@remixicon/react";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import TransitionLink from "@/components/motion/TransitionLink";
import { useMotion } from "@/components/motion/MotionProvider";
import { gsap, useGSAP } from "@/lib/gsap";

// Luminance relative d'une couleur hexadécimale (#rgb ou #rrggbb)
const isLightColor = (hex) => {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? value.replace(/./g, "$&$&") : value;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(full.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.45;
};

const ICONS = {
  github: RiGithubFill,
  figma: RiFigmaLine,
  website: RiGlobalLine,
  certificate: RiAwardLine,
  video: RiVideoLine,
  linkedin: RiLinkedinLine,
  file: RiFileTextLine,
};

export default function ProjectClient({ project, next }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const root = useRef(null);
  const lightbox = useRef(null);
  const opener = useRef(null);
  const { ready, reduced, lenisRef } = useMotion();

  const images = project.images || [];
  const categories = Array.isArray(project.category)
    ? project.category
    : [project.category];

  // Couleur d'accent du projet
  useEffect(() => {
    const style = document.documentElement.style;
    if (project?.color) {
      style.setProperty("--primary-color", project.color);
      // Texte sombre sur les couleurs d'accent claires (lisibilité des boutons)
      style.setProperty("--on-primary", isLightColor(project.color) ? "#111" : "#fff");
    } else {
      style.removeProperty("--primary-color");
      style.removeProperty("--on-primary");
    }
    return () => {
      style.removeProperty("--primary-color");
      style.removeProperty("--on-primary");
    };
  }, [project]);

  const navigateImage = useCallback(
    (direction) => {
      if (!images.length) return;
      setCurrentImageIndex((prev) =>
        direction === "next"
          ? (prev + 1) % images.length
          : (prev - 1 + images.length) % images.length
      );
    },
    [images.length]
  );

  const closeLightbox = useCallback(() => {
    const el = lightbox.current;
    if (!el || reduced) {
      setLightboxOpen(false);
      return;
    }
    gsap.to(el, {
      autoAlpha: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setLightboxOpen(false),
    });
  }, [reduced]);

  // Lightbox : clavier + blocage du scroll (Lenis)
  useEffect(() => {
    if (!lightboxOpen) return;
    const lenis = lenisRef.current;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateImage("prev");
      if (e.key === "ArrowRight") navigateImage("next");
      if (e.key === "Tab") {
        // Le focus reste dans la galerie tant qu'elle est ouverte
        const el = lightbox.current;
        const focusable = el ? el.querySelectorAll("button") : [];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!el.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.documentElement.classList.add("lightbox-open");
    if (lenis) lenis.stop();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.documentElement.classList.remove("lightbox-open");
      if (lenis) lenis.start();
      if (opener.current && opener.current.focus) opener.current.focus();
    };
  }, [lightboxOpen, lenisRef, closeLightbox, navigateImage]);

  // Ouverture de la lightbox
  useGSAP(
    () => {
      if (!lightboxOpen || reduced || !lightbox.current) return;
      gsap.fromTo(lightbox.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 });
      gsap.fromTo(
        ".lightbox-container",
        { scale: 0.9, y: 30 },
        { scale: 1, y: 0, duration: 0.7, ease: "expo.out" }
      );
    },
    { dependencies: [lightboxOpen, reduced] }
  );

  // Fondu à chaque changement d'image
  useGSAP(
    () => {
      if (!lightboxOpen || reduced || !lightbox.current) return;
      gsap.fromTo(
        ".lightbox-image img",
        { autoAlpha: 0, scale: 0.97 },
        { autoAlpha: 1, scale: 1, duration: 0.45, ease: "power3.out" }
      );
    },
    { dependencies: [currentImageIndex] }
  );

  // ----- Animations de la page
  useGSAP(
    () => {
      if (!ready || reduced) return;

      // Image de couverture : dévoilement puis parallaxe au scroll
      gsap.fromTo(
        ".single-project-image",
        { clipPath: "inset(100% 0% 0% 0% round 28px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 28px)",
          duration: 1.5,
          ease: "expo.out",
          delay: 0.35,
        }
      );
      gsap.fromTo(
        ".single-project-image img",
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: ".single-project-image",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Fiche d'informations : lignes en cascade
      gsap.from(".single-info", {
        opacity: 0,
        x: -30,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".single-project-page-left", start: "top 85%", once: true },
      });

      // Galerie : dévoilement par masque
      gsap.utils.toArray(".image-container", root.current).forEach((item, i) => {
        const img = item.querySelector("img");
        const scrollTrigger = { trigger: item, start: "top 92%", once: true };
        gsap.fromTo(
          item,
          { clipPath: "inset(100% 0% 0% 0% round 18px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 18px)",
            duration: 1.3,
            ease: "expo.out",
            delay: (i % 2) * 0.12,
            scrollTrigger,
            clearProps: "clipPath",
          }
        );
        gsap.fromTo(
          img,
          { scale: 1.35 },
          {
            scale: 1,
            duration: 1.7,
            ease: "expo.out",
            delay: (i % 2) * 0.12,
            scrollTrigger,
            clearProps: "transform",
          }
        );
      });
    },
    { scope: root, dependencies: [ready, reduced, project.slug], revertOnUpdate: true }
  );

  const openLightbox = (index) => {
    opener.current = document.activeElement;
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div ref={root} className="single-project-page-design">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center pb-30 project-hero">
              <Reveal>
                <p className="project-hero__cats">{categories.join(", ")}</p>
              </Reveal>
              <SplitReveal as="h1" by="chars" delay={0.1}>
                {project.title}
              </SplitReveal>
            </div>
          </div>
        </div>
        {/* Image principale */}
        <div className="project-cover">
          <div className="single-project-image">
            <Image
              width={1095}
              height={1072}
              sizes="100vw"
              src={project.src}
              alt={project.title}
              priority
            />
          </div>
        </div>
        <div className="container pt-30">
          <div className="row">
            <div className="col-lg-4">
              <Reveal className="project-sticky">
                <div className="single-project-page-left">
                  <div className="single-info">
                    <p>Année</p>
                    <h3>{project.year}</h3>
                  </div>
                  <div className="single-info">
                    <p>Client</p>
                    <h3>{project.client}</h3>
                  </div>
                  <div className="single-info">
                    <p>Catégorie{categories.length > 1 ? "s" : ""}</p>
                    <h3>{categories.join(", ")}</h3>
                  </div>
                  <div className="single-info">
                    <p>Type de projet</p>
                    <h3>{project.projectType}</h3>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="col-lg-8">
              <Reveal delay={2}>
                <div className="single-project-page-right">
                  <h2>Description</h2>
                  <p style={{ whiteSpace: "pre-line" }}>{project.description}</p>

                  {/* Section des liens */}
                  {project.links && project.links.length > 0 && (
                    <div className="project-links">
                      <div className="links-container">
                        {project.links.map((link, index) => {
                          const Icon = ICONS[link.type] || RiGlobalLine;
                          return (
                            <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-link"
                              title={link.label}
                            >
                              <div className="link-icon">
                                <Icon size={24} />
                              </div>
                              <span className="link-label">{link.label}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
          {/* Galerie dynamique d'images */}
          {images.length > 0 && (
            <div className="row pt-30">
              {images.map((img, idx) => (
                <div className="col-lg-6" key={idx}>
                  <div className="single-image">
                    <button
                      type="button"
                      className="image-container"
                      onClick={() => openLightbox(idx)}
                      data-cursor-label="Agrandir"
                      aria-label={`Agrandir l'image ${idx + 1} sur ${images.length}`}
                    >
                      <Image
                        width={633}
                        height={679}
                        sizes="(min-width: 992px) 50vw, 100vw"
                        style={{ width: "100%", height: "auto" }}
                        src={img}
                        alt={`${project.title} — image ${idx + 1}`}
                      />
                      <span className="image-overlay">
                        <span>Cliquer pour agrandir</span>
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projet suivant */}
          {next && (
            <Reveal>
              <TransitionLink
                href={`/projet/${next.slug}`}
                label={next.title}
                className="next-project"
                data-cursor-label="Suivant"
              >
                <span className="next-project__kicker">Projet suivant</span>
                <span className="next-project__title">
                  {next.title}
                  <RiArrowRightUpLine aria-hidden="true" />
                </span>
              </TransitionLink>
            </Reveal>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && images.length > 0 && (
        <div
          ref={lightbox}
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Galerie du projet"
          data-lenis-prevent
          onClick={closeLightbox}
        >
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Fermer la galerie"
              autoFocus
            >
              <RiCloseLine size={30} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="lightbox-nav lightbox-prev"
                  onClick={() => navigateImage("prev")}
                  aria-label="Image précédente"
                >
                  <RiArrowLeftSLine size={30} />
                </button>

                <button
                  type="button"
                  className="lightbox-nav lightbox-next"
                  onClick={() => navigateImage("next")}
                  aria-label="Image suivante"
                >
                  <RiArrowRightSLine size={30} />
                </button>
              </>
            )}

            <div className="lightbox-image">
              <Image
                src={images[currentImageIndex]}
                alt={`${project.title} — image ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                style={{
                  maxWidth: "80vw",
                  maxHeight: "80vh",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>

            {images.length > 1 && (
              <div className="lightbox-counter">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

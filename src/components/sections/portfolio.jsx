"use client";
import React, { useMemo, useRef, useState } from "react";
import { RiArrowRightUpLine } from "@remixicon/react";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import TiltCard from "@/components/motion/TiltCard";
import TransitionLink from "@/components/motion/TransitionLink";
import { useMotion } from "@/components/motion/MotionProvider";
import { gsap, ScrollTrigger, Flip, useGSAP } from "@/lib/gsap";
import { projectsData } from "@/utlits/data/projectData";

const categoriesOf = (project) =>
  Array.isArray(project.category) ? project.category : [project.category];

const Portfolio = ({ className = "" }) => {
  const [category, setCategory] = useState("All");
  const root = useRef(null);
  const grid = useRef(null);
  const flipState = useRef(null);
  const prevHeight = useRef(0);
  const batchTriggers = useRef([]);
  const { ready, reduced } = useMotion();

  // Liste des catégories uniques, dans l'ordre d'apparition
  const categories = useMemo(() => {
    const list = ["All"];
    projectsData.forEach((project) =>
      categoriesOf(project).forEach((cat) => {
        if (!list.includes(cat)) list.push(cat);
      })
    );
    return list;
  }, []);

  // Tous les projets restent montés : le filtre masque, Flip anime le réagencement
  const projects = useMemo(() => [...projectsData].reverse(), []);
  const isVisible = (project) =>
    category === "All" || categoriesOf(project).includes(category);

  const handleCategoryClick = (item) => {
    if (item === category) return;
    if (!reduced && grid.current) {
      // Les cartes encore en attente d'apparition sont affichées avant le réagencement
      const cols = grid.current.querySelectorAll(".project-col");
      Flip.killFlipsOf(cols);
      batchTriggers.current.forEach((trigger) => trigger.kill());
      batchTriggers.current = [];
      gsap.killTweensOf(cols);
      gsap.set(cols, { clearProps: "transform,opacity,visibility" });
      flipState.current = Flip.getState(cols);
      prevHeight.current = grid.current.offsetHeight;
      gsap.killTweensOf(grid.current);
    }
    setCategory(item);
  };

  // ----- Entrée des cartes au scroll (par lots, en cascade)
  useGSAP(
    () => {
      if (!ready || reduced) return;
      const cards = gsap.utils.toArray(".project-col:not(.is-hidden)", grid.current);
      gsap.set(cards, { opacity: 0, y: 80 });
      const triggers = ScrollTrigger.batch(cards, {
        start: "top 94%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.1,
            overwrite: true,
            clearProps: "transform,opacity,visibility",
          });
          batch.forEach((card, i) => {
            const image = card.querySelector(".project-image");
            const img = card.querySelector(".project-image img");
            gsap.fromTo(
              image,
              { clipPath: "inset(0% 0% 100% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.3,
                ease: "expo.out",
                delay: 0.1 * i + 0.1,
                clearProps: "clipPath",
              }
            );
            gsap.fromTo(
              img,
              { scale: 1.4 },
              {
                scale: 1,
                duration: 1.7,
                ease: "expo.out",
                delay: 0.1 * i + 0.1,
                clearProps: "transform",
              }
            );
          });
        },
      });
      batchTriggers.current = triggers;
      return () => {
        triggers.forEach((trigger) => trigger.kill());
        batchTriggers.current = [];
      };
    },
    { scope: root, dependencies: [ready, reduced], revertOnUpdate: true }
  );

  // ----- Réagencement animé au changement de filtre
  useGSAP(
    () => {
      const state = flipState.current;
      flipState.current = null;
      if (!state || !grid.current) return;
      const el = grid.current;
      gsap.set(el, { clearProps: "height" });
      const nextHeight = el.offsetHeight;

      gsap.fromTo(
        el,
        { height: prevHeight.current },
        {
          height: nextHeight,
          duration: 0.8,
          ease: "expo.inOut",
          clearProps: "height",
          onComplete: () => ScrollTrigger.refresh(),
        }
      );

      Flip.from(state, {
        duration: 0.8,
        ease: "expo.inOut",
        absolute: true,
        stagger: 0.025,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { autoAlpha: 0, scale: 0.85 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.7,
              ease: "expo.out",
              delay: 0.15,
              clearProps: "opacity,visibility",
            }
          ),
        onLeave: (elements) =>
          gsap.to(elements, { autoAlpha: 0, scale: 0.85, duration: 0.4, ease: "power2.in" }),
      });
    },
    { scope: root, dependencies: [category] }
  );

  return (
    <section ref={root} id="portfolio" className={`projects-area ${className}`.trim()}>
      <div className="container">
        <div className="container-inner">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="section-title text-center">
                <SplitReveal as="h2" by="chars">
                  Travaux & Projets
                </SplitReveal>
                <Reveal delay={3}>
                  <p>
                    Plongez dans mes créations, où passion et précision se
                    rencontrent
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
          <Reveal>
            <ul
              className="project-filter filter-btns-one justify-content-left pb-15"
              aria-label="Filtrer les projets"
            >
              {categories.map((item) => (
                <li key={item} className={item === category ? "current" : ""}>
                  <button
                    type="button"
                    aria-pressed={item === category}
                    onClick={() => handleCategoryClick(item)}
                  >
                    {item === "All" ? "Tous" : item}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
          <div ref={grid} className="row project-masonry-active">
            {projects.map((project) => (
              <Card key={project.id} project={project} hidden={!isVisible(project)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

const Card = ({ project, hidden }) => {
  const { slug, title, color } = project;
  const categories = categoriesOf(project);

  return (
    <div
      className={`col-lg-4 col-md-6 project-col ${hidden ? "is-hidden" : ""}`}
      data-flip-id={`project-${project.id}`}
    >
      <TiltCard max={5}>
        <TransitionLink
          href={`/projet/${slug}`}
          label={title}
          className="project-item style-two"
          data-cursor-label="Voir"
          style={color ? { "--project-color": color } : undefined}
        >
          <div className="project-image">
            <img
              src={`/images/projects/thumbs/${slug}.jpg`}
              alt={`Aperçu du projet ${title}`}
              width={1200}
              height={780}
              loading="lazy"
              decoding="async"
            />
            <span className="details-btn" aria-hidden="true">
              <RiArrowRightUpLine />
            </span>
          </div>
          <div className="project-content">
            <span className="sub-title">{categories.join(", ")}</span>
            <h3>{title}</h3>
          </div>
        </TransitionLink>
      </TiltCard>
    </div>
  );
};

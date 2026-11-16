"use client";
import React, { useRef } from "react";
import { RiBookLine } from "@remixicon/react";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import { useMotion } from "@/components/motion/MotionProvider";
import { gsap, useGSAP } from "@/lib/gsap";
import experienceData from "@/utlits/data/experienceData";
import educationData from "@/utlits/data/educationData";

const Resume = () => {
  return (
    <section id="resume" className="resume-area">
      <div className="container">
        <div className="resume-items">
          <div className="row">
            {/* <!-- START EXPERIENCE RESUME DESIGN AREA --> */}
            <div className="col-xl-6 col-md-6">
              <Reveal className="h-100">
                <Timeline title="Expérience" items={experienceData} />
              </Reveal>
            </div>

            {/* <!-- // END EXPERIENCE RESUME DESIGN AREA -->
                        <!-- START EDUCATION RESUME DESIGN AREA --> */}
            <div className="col-xl-6 col-md-6">
              <Reveal delay={2} className="h-100">
                <Timeline title="Éducation" items={educationData} />
              </Reveal>
            </div>

            {/* <!-- // END EDUCATION RESUME DESIGN AREA --> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;

/** Colonne de parcours : le trait se dessine au scroll, les étapes apparaissent en cascade. */
const Timeline = ({ title, items }) => {
  const root = useRef(null);
  const { ready, reduced } = useMotion();

  useGSAP(
    () => {
      if (!ready || reduced) return;
      gsap.fromTo(
        ".resume-line__fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".resume-timeline",
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        }
      );
      gsap.utils.toArray(".resume-item", root.current).forEach((item) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        });
        tl.from(item.querySelector(".icon"), {
          scale: 0,
          rotate: -45,
          duration: 0.8,
          ease: "back.out(1.8)",
          clearProps: "transform",
        }).from(
          item.querySelectorAll(".content > *"),
          {
            autoAlpha: 0,
            x: 30,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.08,
            clearProps: "transform,opacity,visibility",
          },
          0.1
        );
      });
    },
    { scope: root, dependencies: [ready, reduced], revertOnUpdate: true }
  );

  return (
    <div ref={root} className="single-resume h-100">
      <SplitReveal as="h2" by="chars">
        {title}
      </SplitReveal>
      <div className="resume-timeline">
        <span className="resume-line" aria-hidden="true">
          <span className="resume-line__fill" />
        </span>
        {items.map((item, index) => (
          <Card key={`${item.title}-${index}`} {...item} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ year, title, institution, icon }) => {
  // Détermine si l'icon est une string (image) ou un composant React (icône)
  const isImageIcon = typeof icon === "string";

  return (
    <div className="resume-item">
      <div className="icon">
        {isImageIcon ? (
          <img
            src={icon}
            alt=""
            style={{
              width: "24px",
              height: "24px",
              objectFit: "contain",
            }}
          />
        ) : (
          React.createElement(icon || RiBookLine)
        )}
      </div>
      <div className="content">
        <span className="years">{year}</span>
        <h4>{title}</h4>
        <span className="company"> {institution} </span>
      </div>
    </div>
  );
};

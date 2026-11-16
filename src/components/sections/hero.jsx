"use client";
import React from "react";
import { RiDownloadLine } from "@remixicon/react";
import PartnersMarquee from "./partnersMarquee";
import ProfileCard from "./profileCard";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import Magnetic from "@/components/motion/Magnetic";

const Hero = () => {
  return (
    <section id="about" className="about-area">
      <div className="container">
        <div className="row">
          {/* <!-- START ABOUT IMAGE DESIGN AREA --> */}
          <div className="col-lg-4">
            <Reveal className="h-100">
              <ProfileCard />
            </Reveal>
          </div>
          {/* <!-- / END ABOUT IMAGE DESIGN AREA -->
                    <!-- START ABOUT TEXT DESIGN AREA --> */}
          <div className="col-lg-8">
            <Reveal delay={2}>
              <div className="about-content-part hero-intro">
                <p className="hero-kicker">Bonjour !</p>
                <SplitReveal as="h2" by="words" delay={0.35}>
                  Je suis Daniel Vale, passionné d'informatique et de
                  développement d'applications web.
                </SplitReveal>
                <div className="adress-field">
                  <ul>
                    <li className="d-flex align-items-center">
                      <span className="status-dot" aria-hidden="true" />
                      Disponible
                    </li>
                  </ul>
                </div>
                <div className="hero-btns">
                  <Magnetic>
                    <a
                      href="/docs/DanielVale_CurriculumVitae.pdf"
                      className="theme-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Télécharger mon CV{" "}
                      <i>
                        <RiDownloadLine size={16} />
                      </i>
                    </a>
                  </Magnetic>
                </div>
              </div>
            </Reveal>
            <Reveal delay={4}>
              <PartnersMarquee />
            </Reveal>
          </div>
          {/* <!-- / END ABOUT TEXT DESIGN AREA --> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;

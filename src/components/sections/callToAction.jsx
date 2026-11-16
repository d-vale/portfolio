"use client";
import React from "react";
import { RiMailSendLine } from "@remixicon/react";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import Magnetic from "@/components/motion/Magnetic";
import TransitionLink from "@/components/motion/TransitionLink";

const CallToAction = () => {
  return (
    <section className="call-to-action-area">
      <div className="container">
        <div className="row">
          {/* <!-- START ABOUT TEXT DESIGN AREA --> */}
          <div className="col-lg-12">
            <Reveal variant="scale">
              <div className="about-content-part call-to-action-part text-center">
                <span className="cta-glow" aria-hidden="true" />
                <SplitReveal as="h2" mode="scrub">
                  Intéressé par mon profil ?
                </SplitReveal>
                <p>Contactez-moi pour transformer vos idées en réalité.</p>{" "}
                <div className="hero-btns">
                  <Magnetic strength={0.45}>
                    <TransitionLink href="/contact" label="Contact" className="theme-btn theme-btn--lg">
                      Discutons-en{" "}
                      <i>
                        <RiMailSendLine size={18} />
                      </i>
                    </TransitionLink>
                  </Magnetic>
                </div>
              </div>
            </Reveal>
          </div>
          {/* <!-- / END ABOUT TEXT DESIGN AREA --> */}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

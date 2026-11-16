"use client";
import React from "react";
import { RiMailSendLine } from "@remixicon/react";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import Magnetic from "@/components/motion/Magnetic";
import TransitionLink from "@/components/motion/TransitionLink";
import ProfileCard from "./profileCard";

const Summery = () => {
  return (
    <section id="about" className="about-single-area innerpage-single-area">
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
            <Reveal delay={2} className="h-100">
              <div className="about-content-part about-bio h-100">
                <SplitReveal as="h2" by="words" delay={0.3}>
                  Bonjour, moi c'est Daniel
                </SplitReveal>
                <SplitReveal as="p" by="lines" delay={0.45}>
                  Dès mon plus jeune âge, je suis passionné par le
                  développement. Aujourd'hui, je me souviens encore des longues
                  négociations avec mes parents pour que je lâche mon
                  ordinateur... Malheureusement pour eux, cela n'a jamais
                  vraiment fonctionné, mais heureusement pour moi, cette passion
                  est devenue une véritable vocation que je peux désormais
                  exercer comme métier.
                </SplitReveal>
                <SplitReveal as="p" by="lines" delay={0.55}>
                  Aujourd'hui software engineer, fort de ma formation de
                  médiamaticien et de mon bachelor en ingénierie des médias, je
                  peux non seulement développer des solutions digitales, mais
                  aussi les concevoir, les gérer et les promouvoir. Mon profil à
                  la fois technique et commercial est un véritable atout dans
                  mon domaine.
                </SplitReveal>
                <SplitReveal as="p" by="lines" delay={0.65}>
                  J'aime me surpasser et apprendre constamment de nouvelles
                  choses. L'utilisation de technologies innovantes et la volonté
                  de se dépasser sont pour moi les clés du succès dans mon
                  domaine.
                </SplitReveal>

                <div className="hero-btns">
                  <Magnetic>
                    <TransitionLink href="/contact" label="Contact" className="theme-btn">
                      Contactez-moi{" "}
                      <i>
                        <RiMailSendLine size={16} />
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

export default Summery;

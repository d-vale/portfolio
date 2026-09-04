import React from "react";
import { RiMailSendLine, RiLinkedinFill, RiGithubLine } from "@remixicon/react";
import SlideUp from "@/utlits/animations/slideUp";
import Link from "next/link";

const Summery = () => {
  return (
    <section id="about" className="about-single-area innerpage-single-area">
      <div className="container">
        <div className="row">
          {/* <!-- START ABOUT IMAGE DESIGN AREA --> */}
          <div className="col-lg-4">
            <SlideUp>
              <div className="about-image-part">
                <img src={"/images/about/profile.jpg"} alt="About Me" />
                <h2>Daniel Vale</h2>
                <p>Software Engineer 💻</p>
                <div className="about-social text-center">
                  <ul>
                    <li>
                      <Link href="https://www.linkedin.com/in/danielvale050403/" target="_blank">
                        <RiLinkedinFill size={20} />
                      </Link>
                    </li>
                    <li>
                      <Link href="https://github.com/d-vale" target="_blank">
                        <RiGithubLine size={20} />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </SlideUp>
          </div>
          {/* <!-- / END ABOUT IMAGE DESIGN AREA -->
                    <!-- START ABOUT TEXT DESIGN AREA --> */}
          <div className="col-lg-8">
            <SlideUp>
              <div className="about-content-part">
                <h2>Bonjour, moi c'est Daniel</h2>
                <p>
                  Dès mon plus jeune âge, je suis passionné par le
                  développement. Aujourd'hui, je me souviens encore des longues
                  négociations avec mes parents pour que je lâche mon
                  ordinateur... Malheureusement pour eux, cela n'a jamais
                  vraiment fonctionné, mais heureusement pour moi, cette passion
                  est devenue une véritable vocation que je peux désormais
                  exercer comme métier.
                </p>
                <p>
                  Aujourd'hui software engineer, fort de ma formation de
                  médiamaticien et de mon bachelor en ingénierie des médias, je
                  peux non seulement développer des solutions digitales, mais
                  aussi les concevoir, les gérer et les promouvoir. Mon profil à
                  la fois technique et commercial est un véritable atout dans
                  mon domaine.
                </p>
                <p>
                  J'aime me surpasser et apprendre constamment de nouvelles
                  choses. L'utilisation de technologies innovantes et la volonté
                  de se dépasser sont pour moi les clés du succès dans mon
                  domaine.
                </p>

                <div className="hero-btns">
                  <Link href="/contact" className="theme-btn">
                    Contactez-moi{" "}
                    <i>
                      {" "}
                      <RiMailSendLine size={16} />{" "}
                    </i>
                  </Link>
                </div>
              </div>
            </SlideUp>
          </div>
          {/* <!-- / END ABOUT TEXT DESIGN AREA --> */}
        </div>
      </div>
    </section>
  );
};

export default Summery;

"use client";
import React from "react";
import Link from "next/link";
import {
  RiFacebookCircleFill,
  RiTwitterXLine,
  RiLinkedinFill,
  RiGithubLine,
  RiCircleFill,
  RiDownloadLine,
} from "@remixicon/react";
import PartnersMarquee from "./partnersMarquee";
import SlideUp from "@/utlits/animations/slideUp";

const Hero = () => {
  return (
    <section id="about" className="about-area">
      <div className="container">
        <div className="row">
          {/* <!-- START ABOUT IMAGE DESIGN AREA --> */}
          <div className="col-lg-4">
            <SlideUp>
              <div className="about-image-part">
                <img src={"/images/about/profile.jpg"} alt="About Me" />
                <h2>Daniel Vale</h2>
                <p>Étudiant en ingénierie des médias 💻</p>
                <div className="about-social text-center">
                  <ul>
                    <li>
                      <Link
                        href="https://www.linkedin.com/in/danielvale050403/"
                        target="_blank"
                      >
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
                <p>Bonjour !</p>
                <h2>
                  Je suis Daniel Vale, passionné d'informatique et de développement d'applications web.
                </h2>
                <div className="adress-field">
                  <ul>
                    <li className="d-flex align-items-center">
                      <i>
                        <RiCircleFill size={14} />
                      </i>{" "}
                      Recherche un travail de bachelor
                    </li>
                  </ul>
                </div>
                <div className="hero-btns">
                  <Link
                    href="/docs/DanielVale_CurriculumVitae.pdf"
                    className="theme-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Télécharger mon CV{" "}
                    <i>
                      <RiDownloadLine size={16} />
                    </i>
                  </Link>
                </div>
              </div>
            </SlideUp>
            <SlideUp>
              <PartnersMarquee />
            </SlideUp>
          </div>
          {/* <!-- / END ABOUT TEXT DESIGN AREA --> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;

"use client";
import React, { useRef } from "react";
import { RiLinkedinFill, RiGithubLine } from "@remixicon/react";
import TiltCard from "@/components/motion/TiltCard";
import Magnetic from "@/components/motion/Magnetic";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMotion } from "@/components/motion/MotionProvider";

/** Carte profil (photo, nom, rôle, réseaux) partagée par l'accueil et la page À propos. */
const ProfileCard = () => {
  const root = useRef(null);
  const { ready, reduced } = useMotion();

  useGSAP(
    () => {
      if (!ready || reduced) return;
      gsap
        .timeline({ delay: 0.25 })
        .fromTo(
          ".profile-photo",
          { clipPath: "inset(100% 0% 0% 0% round 18px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 18px)",
            duration: 1.4,
            ease: "expo.out",
            clearProps: "clipPath",
          }
        )
        .fromTo(
          ".profile-photo img",
          { scale: 1.35 },
          { scale: 1, duration: 1.8, ease: "expo.out", clearProps: "transform" },
          0
        )
        .from(
          ".profile-meta > *",
          { opacity: 0, y: 24, duration: 0.9, ease: "expo.out", stagger: 0.09 },
          0.35
        );
    },
    { scope: root, dependencies: [ready, reduced], revertOnUpdate: true }
  );

  return (
    <TiltCard max={6}>
      <div ref={root} className="about-image-part">
        <div className="profile-photo">
          <img
            src="/images/about/profile-800.jpg"
            alt="Portrait de Daniel Vale"
            width={800}
            height={1070}
          />
        </div>
        <div className="profile-meta">
          <h2>Daniel Vale</h2>
          <p>Software Engineer 💻</p>
          <div className="about-social text-center">
            <ul>
              <li>
                <Magnetic strength={0.4}>
                  <a
                    href="https://www.linkedin.com/in/danielvale050403/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <RiLinkedinFill size={20} />
                  </a>
                </Magnetic>
              </li>
              <li>
                <Magnetic strength={0.4}>
                  <a
                    href="https://github.com/d-vale"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <RiGithubLine size={20} />
                  </a>
                </Magnetic>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

export default ProfileCard;

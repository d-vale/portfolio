"use client";
import React, { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import distinctionData from "@/utlits/data/distinctionData";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import Magnetic from "@/components/motion/Magnetic";
import { useMotion } from "@/components/motion/MotionProvider";
import { gsap, useGSAP } from "@/lib/gsap";

const Distinctions = () => {
  const root = useRef(null);
  const { ready, reduced } = useMotion();

  // Les années défilent comme un compteur à l'arrivée dans l'écran
  useGSAP(
    () => {
      if (!ready || reduced) return;
      gsap.utils.toArray(".distinction-item .year", root.current).forEach((el) => {
        const target = parseInt(el.dataset.year, 10);
        if (Number.isNaN(target)) return;
        const counter = { value: target - 25 };
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value));
          },
          onComplete: () => {
            el.textContent = String(target);
          },
        });
      });
    },
    { scope: root, dependencies: [ready, reduced], revertOnUpdate: true }
  );

  return (
    <section ref={root} className="distinctions-area">
      <div className="container">
        <div className="container-inner">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="section-title text-center">
                <Reveal>
                  <p>Récompenses</p>
                </Reveal>
                <SplitReveal as="h2" by="chars">
                  Prix et distinctions
                </SplitReveal>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Reveal>
                <Swiper
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    767: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 3,
                    },
                  }}
                  spaceBetween={30}
                  loop={true}
                  grabCursor={true}
                  navigation={{
                    nextEl: ".distinction-next",
                    prevEl: ".distinction-prev",
                  }}
                  pagination={{
                    el: ".distinctions-pagination",
                    clickable: true,
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                  }}
                  modules={[Navigation, Pagination]}
                >
                  {distinctionData.map((distinction, index) => (
                    <SwiperSlide key={`${distinction.title}-${index}`}>
                      <DistinctionCard
                        year={distinction.year}
                        title={distinction.title}
                        institution={distinction.institution}
                        description={distinction.description}
                        icon={distinction.icon}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Reveal>

              {/* Flèches de navigation (desktop uniquement) */}
              <Reveal>
                <div className="slider-arrows text-center pt-40">
                  <Magnetic strength={0.4}>
                    <button
                      type="button"
                      className="distinction-prev arrow"
                      aria-label="Distinction précédente"
                    >
                      <RiArrowLeftSLine />
                    </button>
                  </Magnetic>
                  <Magnetic strength={0.4}>
                    <button
                      type="button"
                      className="distinction-next arrow"
                      aria-label="Distinction suivante"
                    >
                      <RiArrowRightSLine />
                    </button>
                  </Magnetic>
                </div>
              </Reveal>

              {/* Pagination (mobile uniquement) */}
              <div className="distinctions-pagination"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Distinctions;

const DistinctionCard = ({ year, title, institution, description, icon }) => {
  const isImageIcon = typeof icon === "string";

  return (
    <div className="distinction-item">
      <div className="distinction-header">
        <div className="icon">
          {isImageIcon ? (
            <img src={icon} alt="" style={{ width: "40px", height: "40px" }} />
          ) : (
            React.createElement(icon)
          )}
        </div>
        <span className="year" data-year={year}>
          {year}
        </span>
      </div>
      <div className="distinction-content">
        <h5>{title}</h5>
        <span className="institution">{institution}</span>
        {description ? <p className="description">{description}</p> : null}
      </div>
    </div>
  );
};

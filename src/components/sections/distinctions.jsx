"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import distinctionData from "@/utlits/data/distinctionData";
import SlideUp from "@/utlits/animations/slideUp";

const Distinctions = () => {
  return (
    <section className="distinctions-area">
      <div className="container">
        <div className="container-inner">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <SlideUp>
                <div className="section-title text-center">
                  <p>Récompenses</p>
                  <h2>Prix et distinctions</h2>
                </div>
              </SlideUp>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
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
                navigation={{
                  nextEl: ".distinction-next",
                  prevEl: ".distinction-prev",
                }}
                pagination={{
                  el: ".distinctions-pagination",
                  clickable: true,
                  bulletClass: 'swiper-pagination-bullet',
                  bulletActiveClass: 'swiper-pagination-bullet-active',
                }}
                modules={[Navigation, Pagination]}
              >
                {distinctionData.map((distinction) => (
                  <SwiperSlide key={distinction.id}>
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
              
              {/* Flèches de navigation (desktop uniquement) */}
              <SlideUp>
                <div className="slider-arrows text-center pt-40">
                  <button className="distinction-prev arrow">
                    <RiArrowLeftSLine />
                  </button>
                  <button className="distinction-next arrow">
                    <RiArrowRightSLine />
                  </button>
                </div>
              </SlideUp>

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
    <SlideUp>
      <div className="distinction-item">
        <div className="distinction-header">
          <div className="icon">
            {isImageIcon ? (
              <img
                src={icon}
                alt={title}
                style={{ width: "40px", height: "40px" }}
              />
            ) : (
              React.createElement(icon)
            )}
          </div>
          <span className="year">{year}</span>
        </div>
        <div className="distinction-content">
          <h5>{title}</h5>
          <span className="institution">{institution}</span>
          <p className="description">{description}</p>
        </div>
      </div>
    </SlideUp>
  );
};

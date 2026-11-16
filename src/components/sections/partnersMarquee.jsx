"use client";
import React from "react";
import { partnersData } from "@/utlits/data/partnersData";
import VelocityMarquee from "@/components/motion/VelocityMarquee";

const PartnersMarquee = () => {
  return (
    <div className="about-content-part-bottom">
      <h2>Ils m'ont fait confiance</h2>
      <div className="company-list">
        <VelocityMarquee speed={45} className="partners-marquee">
          {partnersData.map((partner) => (
            <img
              key={partner.name}
              height={partner.height}
              src={partner.logo}
              alt={partner.name}
              className="partner-logo"
            />
          ))}
        </VelocityMarquee>
      </div>
    </div>
  );
};

export default PartnersMarquee;

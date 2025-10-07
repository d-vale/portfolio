import React from "react";
import Marquee from "react-fast-marquee";
import { partnersData } from "@/utlits/data/partnersData";

const PartnersMarquee = () => {
  return (
    <div className="about-content-part-bottom">
      <h2>Ils m'ont fait confiance</h2>
      <div className="company-list">
        <div className="scroller">
          <div className="scroller__inner">
            <Marquee>
              {partnersData.map((partner) => (
                <img
                  key={partner.name}
                  height={partner.height}
                  src={partner.logo}
                  alt={partner.name}
                  style={{ marginRight: 32 }}
                />
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersMarquee;

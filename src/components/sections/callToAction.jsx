import React from "react";
import Link from "next/link";
import { RiMailSendLine } from "@remixicon/react";
import SlideUp from "@/utlits/animations/slideUp";

const CallToAction = () => {
  return (
    <section className="call-to-action-area">
      <div className="container">
        <div className="row">
          {/* <!-- START ABOUT TEXT DESIGN AREA --> */}
          <div className="col-lg-12">
            <SlideUp>
              <div className="about-content-part call-to-action-part text-center">
                <h2>Intéressé par mon profil ?</h2>
                <p>Contactez-moi pour transformer vos idées en réalité.</p>{" "}
                <div className="hero-btns">
                  <Link href="/contact" className="theme-btn">
                    Discutons-en{" "}
                    <i>
                      <RiMailSendLine size={16} />
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

export default CallToAction;

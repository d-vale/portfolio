"use client";
import React from "react";
import VelocityMarquee from "@/components/motion/VelocityMarquee";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="main-footer">
      <div className="footer-marquee" aria-hidden="true">
        <VelocityMarquee speed={70} copies={4}>
          <span className="footer-marquee__item">Daniel Vale</span>
          <span className="footer-marquee__sep">✦</span>
          <span className="footer-marquee__item footer-marquee__item--outline">
            Software Engineer
          </span>
          <span className="footer-marquee__sep">✦</span>
        </VelocityMarquee>
      </div>
      <div className="footer-bottom pt-50 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="copyright-text">
                <p suppressHydrationWarning>
                  Copyright @{year},{" "}
                  <a
                    href="https://www.linkedin.com/in/danielvale050403/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Daniel Vale
                  </a>{" "}
                  All Rights Reserved.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="copyright-text extra-copyright">
                <p>
                  Réalisé par{" "}
                  <a
                    href="https://www.linkedin.com/in/danielvale050403/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Daniel Vale
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

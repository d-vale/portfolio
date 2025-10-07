"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RiArrowRightUpLine } from "@remixicon/react";
import SlideUp from "@/utlits/animations/slideUp";
import { projectsData } from "@/utlits/data/projectData";
import Image from "next/image";

const animations = ["slideIn", "fadeIn", "scaleUp"];

const getRandomAnimation = () => {
  const randomIndex = Math.floor(Math.random() * animations.length);
  return animations[randomIndex];
};

const Portfolio = ({ className }) => {
  const [category, setCategory] = useState("All");
  const [animationKey, setAnimationKey] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState(
    getRandomAnimation()
  );

  const handleCategoryClick = (item) => {
    setCategory(item);
    setAnimationKey((prev) => prev + 1); // force rerender pour animations
    setCurrentAnimation(getRandomAnimation());
  };

  // ------ filter unique category (support array)
  const filteredCategory = ["All"];
  projectsData.forEach(({ category }) => {
    if (Array.isArray(category)) {
      category.forEach((cat) => {
        if (!filteredCategory.includes(cat)) {
          filteredCategory.push(cat);
        }
      });
    } else {
      if (!filteredCategory.includes(category)) {
        filteredCategory.push(category);
      }
    }
  });
  // ------ filter unique category

  const filteredProjects =
    category === "All"
      ? projectsData
      : projectsData.filter((image) =>
          Array.isArray(image.category)
            ? image.category.includes(category)
            : image.category === category
        );

  return (
    <section id="portfolio" className={`projects-area ${className}`}>
      <div className="container">
        <div className="container-inner">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <SlideUp>
                <div className="section-title text-center">
                  <h2>Travaux & Projets</h2>
                  <p>
                    Plongez dans mes créations, où passion et précision se
                    rencontrent
                  </p>
                </div>
              </SlideUp>
            </div>
          </div>
          <SlideUp>
            <ul className="project-filter filter-btns-one justify-content-left pb-15">
              {filteredCategory.map((item, id) => (
                <li
                  key={id}
                  onClick={() => handleCategoryClick(item)}
                  className={item === category ? "current" : ""}
                >
                  {item}
                </li>
              ))}
            </ul>
          </SlideUp>
          <div className="row project-masonry-active overflow-hidden">
            {filteredProjects.map(({ category, id, src, title, color }) => (
              <Card
                key={id + "-" + animationKey}
                id={id}
                category={category}
                src={src}
                title={title}
                color={color}
                animationClass={currentAnimation}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

const Card = ({ category, title, src, animationClass, id, color }) => {
  return (
    <div className={`col-lg-4 col-md-6 item branding game ${animationClass}`}>
      <SlideUp delay={id}>
        <div className="project-item style-two">
          <div className="project-image">
            <Image
              width={383}
              height={249}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              src={src}
              alt="Project"
            />
            <Link
              href={`/projet/${id}`}
              className="details-btn"
              style={color ? { backgroundColor: color } : {}}
            >
              <RiArrowRightUpLine />
            </Link>
          </div>
          <div className="project-content">
            <span className="sub-title">
              {Array.isArray(category) ? category.join(", ") : category}
            </span>
            <h3>{title}</h3>
          </div>
        </div>
      </SlideUp>
    </div>
  );
};

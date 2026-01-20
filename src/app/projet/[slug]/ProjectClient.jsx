"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  RiCloseLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiGithubFill,
  RiGlobalLine,
  RiFileTextLine,
  RiAwardLine,
  RiFigmaLine,
  RiVideoLine,
  RiLinkedinLine,
} from "@remixicon/react";

export default function ProjectClient({ project }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (project?.color) {
      document.documentElement.style.setProperty(
        "--primary-color",
        project.color
      );
      return () =>
        document.documentElement.style.setProperty(
          "--primary-color",
          "#ba0000"
        );
    }
  }, [project]);

  // Fermer la lightbox avec la touche Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
      }
      if (e.key === "ArrowLeft") {
        navigateImage("prev");
      }
      if (e.key === "ArrowRight") {
        navigateImage("next");
      }
    };

    if (lightboxOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [lightboxOpen]);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateImage = (direction) => {
    if (!project.images) return;

    if (direction === "next") {
      setCurrentImageIndex((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    }
  };

  // Fonction pour obtenir l'icône appropriée
  const getIcon = (type) => {
    switch (type) {
      case "github":
        return <RiGithubFill size={24} />;
      case "figma":
        return <RiFigmaLine size={24} />;
      case "website":
        return <RiGlobalLine size={24} />;
      case "certificate":
        return <RiAwardLine size={24} />;
      case "video":
        return <RiVideoLine size={24} />;
      case "linkedin":
        return <RiLinkedinLine size={24} />;
      case "file":
        return <RiFileTextLine size={24} />;
      default:
        return <RiGlobalLine size={24} />;
    }
  };

  return (
    <>
      <div className="single-project-page-design">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center pb-30">
              <p>
                {Array.isArray(project.category)
                  ? project.category.join(", ")
                  : project.category}
              </p>
              <h1>{project.title}</h1>
            </div>
          </div>
        </div>
        {/* Image principale */}
        <div className="single-project-image">
          <Image
            width={1095}
            height={1072}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            src={project.src}
            alt={project.title}
          />
        </div>
        <div className="container pt-30">
          <div className="row">
            <div className="col-lg-4">
              <div className="single-project-page-left wow fadeInUp delay-0-2s">
                <div className="single-info">
                  <p>Année</p>
                  <h3>{project.year}</h3>
                </div>
                <div className="single-info">
                  <p>Client</p>
                  <h3>{project.client}</h3>
                </div>
                <div className="single-info">
                  <p>
                    Catégorie
                    {Array.isArray(project.category) &&
                    project.category.length > 1
                      ? "s"
                      : ""}
                  </p>
                  <h3>
                    {Array.isArray(project.category)
                      ? project.category.join(", ")
                      : project.category}
                  </h3>
                </div>
                <div className="single-info">
                  <p>Type de projet</p>
                  <h3>{project.projectType}</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="single-project-page-right wow fadeInUp delay-0-4s">
                <h2>Description</h2>
                <p style={{ whiteSpace: 'pre-line' }}>{project.description}</p>

                {/* Section des liens */}
                {project.links && project.links.length > 0 && (
                  <div className="project-links">
                    <div className="links-container">
                      {project.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          title={link.label}
                        >
                          <div className="link-icon">{getIcon(link.type)}</div>
                          <span className="link-label">{link.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Galerie dynamique d'images */}
          <div className="row pt-30">
            {project.images &&
              project.images.map((img, idx) => (
                <div className="col-lg-6" key={idx}>
                  <div
                    className={`single-image wow fadeInUp delay-0-${
                      (idx + 2) * 2
                    }s`}
                  >
                    <div
                      className="image-container"
                      onClick={() => openLightbox(idx)}
                      style={{ cursor: "pointer" }}
                    >
                      <Image
                        width={633}
                        height={679}
                        sizes="100%"
                        style={{ width: "100%", height: "auto" }}
                        src={img}
                        alt={`gallery-${idx + 1}`}
                      />
                      <div className="image-overlay">
                        <span>Cliquer pour agrandir</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && project.images && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-container">
            <button className="lightbox-close" onClick={closeLightbox}>
              <RiCloseLine size={30} />
            </button>

            {project.images.length > 1 && (
              <>
                <button
                  className="lightbox-nav lightbox-prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("prev");
                  }}
                >
                  <RiArrowLeftSLine size={30} />
                </button>

                <button
                  className="lightbox-nav lightbox-next"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("next");
                  }}
                >
                  <RiArrowRightSLine size={30} />
                </button>
              </>
            )}

            <div className="lightbox-image">
              <Image
                src={project.images[currentImageIndex]}
                alt={`Gallery image ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                style={{
                  maxWidth: "80vw",
                  maxHeight: "80vh",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>

            {project.images.length > 1 && (
              <div className="lightbox-counter">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

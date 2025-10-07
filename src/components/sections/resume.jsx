import React from "react";
import { RiBookLine } from "@remixicon/react";
import SlideUp from "@/utlits/animations/slideUp";
import experienceData from "@/utlits/data/experienceData";
import educationData from "@/utlits/data/educationData";
import distinctionData from "@/utlits/data/distinctionData";

const Resume = () => {
  return (
    <section id="resume" className="resume-area">
      <div className="container">
        <div className="resume-items">
          <div className="row">
            {/* <!-- START EXPERIENCE RESUME DESIGN AREA --> */}
            <div className="col-xl-6 col-md-6">
              <div className="single-resume">
                <h2>Éxperience</h2>
                <div className="experience-list">
                  {experienceData.map((experience) => (
                    <Card
                      key={experience.id}
                      year={experience.year}
                      title={experience.title}
                      institution={experience.institution}
                      icon={experience.icon}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* <!-- // END EXPERIENCE RESUME DESIGN AREA -->
                        <!-- START EDUCATION RESUME DESIGN AREA --> */}
            <div className="col-xl-6 col-md-6">
              <div className="experience-list">
                <div className="single-resume">
                  <h2>Education</h2>
                  {educationData.map((education) => (
                    <Card
                      key={education.id}
                      year={education.year}
                      title={education.title}
                      institution={education.institution}
                      icon={education.icon}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* <!-- // END EDUCATION RESUME DESIGN AREA --> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;

const Card = ({ year, title, institution, icon }) => {
  // Détermine si l'icon est une string (image) ou un composant React (icône)
  const isImageIcon = typeof icon === "string";

  return (
    <SlideUp>
      <div className="resume-item">
        <div className="icon">
          {isImageIcon ? (
            <img
              src={icon}
              alt={title}
              style={{ width: "24px", height: "24px" }}
            />
          ) : (
            React.createElement(icon || RiBookLine)
          )}
        </div>
        <div className="content">
          <span className="years">{year}</span>
          <h4>{title}</h4>
          <span className="company"> {institution} </span>
        </div>
      </div>
    </SlideUp>
  );
};

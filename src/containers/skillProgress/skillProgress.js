import React, { useEffect, useRef } from "react";
import "./Progress.scss";
import {illustration, techStack} from "../../portfolio";
import {Fade} from "react-awesome-reveal";
import Build from "../../assets/lottie/build";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";

export default function StackProgress() {
  const progressRefs = useRef({});

  useEffect(() => {
    const timer = setTimeout(() => {
      techStack.experience.forEach((exp, i) => {
        if (progressRefs.current[i]) {
          progressRefs.current[i].style.width = exp.progressPercentage;
        }
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (techStack.viewSkillBars) {
    return (
      <Fade direction="up" triggerOnce>
        <div className="skills-container">
          <div className="skills-bar">
            <h1 className="skills-heading">Proficiency</h1>
            {techStack.experience.map((exp, i) => {
              return (
                <div key={i} className="skill">
                  <p>{exp.Stack}</p>
                  <div className="meter">
                    <span
                      ref={el => (progressRefs.current[i] = el)}
                      style={{ width: 0 }}
                    ></span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="skills-image">
            {illustration.animated ? (
              <DisplayLottie animationData={Build} />
            ) : (
              <img
                alt="Skills"
                src={require("../../assets/images/skill.svg")}
              />
            )}
          </div>
        </div>
      </Fade>
    );
  }
  return null;
}

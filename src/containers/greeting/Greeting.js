import React, {useContext} from "react";
import emoji from "react-easy-emoji";
import "./Greeting.scss";
import landingPerson from "../../assets/lottie/landingPerson";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import {illustration, greeting} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import ScrollAnimation from "../../components/scrollAnimation/ScrollAnimation";
import GlassMorphism from "../../components/glassmorphism/GlassMorphism";

export default function Greeting() {
  const {isDark} = useContext(StyleContext);
  if (!greeting.displayGreeting) {
    return null;
  }
  return (
    <div className="greet-main" id="greeting">
      <div className="greeting-main">
        <ScrollAnimation type="fadeInLeft" duration={0.8}>
          <div className="greeting-text-div">
            <GlassMorphism className="greeting-text-container">
              <div>
                <h1
                  className={isDark ? "dark-mode greeting-text" : "greeting-text"}
                >
                  {" "}
                  {greeting.title}{" "}
                  <span className="wave-emoji">{emoji("👋")}</span>
                </h1>
                <p
                  className={
                    isDark
                      ? "dark-mode greeting-text-p"
                      : "greeting-text-p subTitle"
                  }
                >
                  {greeting.subTitle}
                </p>
                <div id="resume" className="empty-div"></div>
                <SocialMedia />
                <div className="button-greeting-div">
                  <Button text="Contact me" href="#contact" />
                  {greeting.resumeLink && (
                    <a
                      href={require("./resume.pdf")}
                      download="Resume.pdf"
                      className="download-link-button"
                    >
                      <Button text="Download my resume" />
                    </a>
                  )}
                </div>
              </div>
            </GlassMorphism>
          </div>
        </ScrollAnimation>
        <ScrollAnimation type="fadeInRight" duration={0.8} delay={0.2}>
          <div className="greeting-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={landingPerson} />
            ) : (
              <img
                alt="man sitting on table"
                src={require("../../assets/images/manOnTable.svg")}
              ></img>
            )}
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}

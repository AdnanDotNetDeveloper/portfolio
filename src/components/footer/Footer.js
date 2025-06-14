import React, {useContext} from "react";
import "./Footer.scss";
import {Fade} from "react-awesome-reveal";
import emoji from "react-easy-emoji";
import StyleContext from "../../contexts/StyleContext";

export default function Footer() {
  const {isDark} = useContext(StyleContext);
  return (
    <Fade direction="up" triggerOnce>
      <div className="footer-div">
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          {emoji("Made with ❤️ by Adnan Jameel")}
        </p>
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          Theme by{" "}
          <a
            href="https://github.com/AdnanDotNetDeveloper"
            target="_blank"
            rel="noreferrer"
          >
            Adnan Jameel
          </a>
        </p>
      </div>
    </Fade>
  );
}

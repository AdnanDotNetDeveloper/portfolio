import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Top.scss";

export default function Top() {
  const [isVisible, setIsVisible] = useState(false);
  
  function TopEvent() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  
  // When the user scrolls down 20px from the top of the document, show the button
  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }
  
  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);
    scrollFunction(); // Initial check
    
    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);
  
  // Button animation variants
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    },
    hover: {
      scale: 1.1,
      boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.9
    }
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={TopEvent}
          id="topButton"
          title="Go to top"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <i className="fas fa-chevron-up" aria-hidden="true"></i>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

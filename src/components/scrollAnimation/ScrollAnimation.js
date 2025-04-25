import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import './ScrollAnimation.scss';

const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  },
  fadeInUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 }
  },
  fadeInDown: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 }
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 }
  },
  fadeInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 }
  },
  zoomIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 }
  },
  slideUp: {
    initial: { y: 100 },
    animate: { y: 0 }
  },
  slideDown: {
    initial: { y: -100 },
    animate: { y: 0 }
  },
  slideLeft: {
    initial: { x: -100 },
    animate: { x: 0 }
  },
  slideRight: {
    initial: { x: 100 },
    animate: { x: 0 }
  }
};

const ScrollAnimation = ({
  children,
  type = 'fadeInUp',
  duration = 0.5,
  delay = 0,
  className = '',
  threshold = 0.1,
  once = true
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce: once });
  
  const animation = animations[type] || animations.fadeInUp;
  
  useEffect(() => {
    if (inView) {
      controls.start('animate');
    } else if (!once) {
      controls.start('initial');
    }
  }, [controls, inView, once]);
  
  return (
    <motion.div
      ref={ref}
      className={`scroll-animation ${className}`}
      initial="initial"
      animate={controls}
      variants={animation}
      transition={{ 
        duration, 
        delay, 
        ease: 'easeOut' 
      }}
    >
      {children}
    </motion.div>
  );
};

ScrollAnimation.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf([
    'fadeIn',
    'fadeInUp',
    'fadeInDown',
    'fadeInLeft',
    'fadeInRight',
    'zoomIn',
    'slideUp',
    'slideDown',
    'slideLeft',
    'slideRight'
  ]),
  duration: PropTypes.number,
  delay: PropTypes.number,
  className: PropTypes.string,
  threshold: PropTypes.number,
  once: PropTypes.bool
};

export default ScrollAnimation; 
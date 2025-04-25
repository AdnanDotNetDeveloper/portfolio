import React, { useEffect } from 'react';
import "./CursorEffect.scss";

const CursorEffect = () => {
  useEffect(() => {
    const cursor = document.querySelector('.cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    const moveCursor = (e) => {
      const mouseY = e.clientY;
      const mouseX = e.clientX;
      
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      
      setTimeout(() => {
        cursorTrail.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }, 80);
    };
    
    const addCursorHover = () => {
      cursor.classList.add('cursor-hover');
      cursorTrail.classList.add('cursor-trail-hover');
    };
    
    const removeCursorHover = () => {
      cursor.classList.remove('cursor-hover');
      cursorTrail.classList.remove('cursor-trail-hover');
    };
    
    window.addEventListener('mousemove', moveCursor);
    
    const hoverable = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    hoverable.forEach(item => {
      item.addEventListener('mouseenter', addCursorHover);
      item.addEventListener('mouseleave', removeCursorHover);
    });
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      hoverable.forEach(item => {
        item.removeEventListener('mouseenter', addCursorHover);
        item.removeEventListener('mouseleave', removeCursorHover);
      });
    };
  }, []);
  
  return (
    <>
      <div className="cursor"></div>
      <div className="cursor-trail"></div>
    </>
  );
};

export default CursorEffect; 
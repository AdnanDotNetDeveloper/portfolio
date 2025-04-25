import React, { useEffect, useRef, useContext } from 'react';
import './AnimatedBackground.scss';
import StyleContext from '../../contexts/StyleContext';

const AnimatedBackground = ({ children }) => {
  const canvasRef = useRef(null);
  const { isDark } = useContext(StyleContext);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particlesArray = [];
    const numberOfParticles = Math.min(100, Math.floor(window.innerWidth * 0.05));
    
    const colors = isDark 
      ? ['rgba(74, 0, 224, 0.3)', 'rgba(142, 45, 226, 0.3)', 'rgba(74, 0, 224, 0.2)']
      : ['rgba(74, 0, 224, 0.1)', 'rgba(142, 45, 226, 0.1)', 'rgba(74, 0, 224, 0.05)'];
    
    // Create particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles
    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };
    
    init();
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      // Draw connections
      connectParticles();
      
      requestAnimationFrame(animate);
    };
    
    // Connect particles with lines
    const connectParticles = () => {
      const maxDistance = 150;
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = isDark 
              ? `rgba(142, 45, 226, ${opacity * 0.15})` 
              : `rgba(74, 0, 224, ${opacity * 0.05})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesArray.length = 0;
      init();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);
  
  return (
    <div className="animated-background-container">
      <canvas ref={canvasRef} className="animated-background"></canvas>
      <div className="content">{children}</div>
    </div>
  );
};

export default AnimatedBackground; 
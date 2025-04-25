import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './GlassMorphism.scss';
import StyleContext from '../../contexts/StyleContext';

const GlassMorphism = ({ children, className, style }) => {
  const { isDark } = useContext(StyleContext);
  
  return (
    <div 
      className={`glass-container ${isDark ? 'glass-dark' : 'glass-light'} ${className || ''}`}
      style={style}
    >
      {children}
    </div>
  );
};

GlassMorphism.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default GlassMorphism; 
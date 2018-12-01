import React from 'react';
import './Bar.css';

  const Bar = ({wrapperStyles, valueStyles, title}) => {
    return (
      <div className= "Bar" style={wrapperStyles}>
        <div className="Bar-value" style={valueStyles}></div>
        <div className="Bar-title">{title}</div>
      </div>
    )
  }
export default Bar;
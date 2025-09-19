import React from 'react';

const KolamPattern8 = ({ size = 95, color = "#A0522D", opacity = 0.5 }) => (
  <svg width={size} height={size} viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity={opacity}>
      <path d="M47.5 5 L70 25 L90 47.5 L70 70 L47.5 90 L25 70 L5 47.5 L25 25 Z" stroke={color} strokeWidth="2" fill="none"/>
      <path d="M47.5 15 L60 30 L75 47.5 L60 65 L47.5 80 L35 65 L20 47.5 L35 30 Z" stroke={color} strokeWidth="1.5" fill="none"/>
      <path d="M47.5 25 L55 35 L65 47.5 L55 60 L47.5 70 L40 60 L30 47.5 L40 35 Z" stroke={color} strokeWidth="1" fill="none"/>
      <circle cx="47.5" cy="47.5" r="8" stroke={color} strokeWidth="1" fill="none"/>
      <line x1="47.5" y1="5" x2="47.5" y2="25" stroke={color} strokeWidth="1"/>
      <line x1="47.5" y1="70" x2="47.5" y2="90" stroke={color} strokeWidth="1"/>
      <line x1="5" y1="47.5" x2="25" y2="47.5" stroke={color} strokeWidth="1"/>
      <line x1="70" y1="47.5" x2="90" y2="47.5" stroke={color} strokeWidth="1"/>
      <line x1="25" y1="25" x2="35" y2="35" stroke={color} strokeWidth="1"/>
      <line x1="60" y1="60" x2="70" y2="70" stroke={color} strokeWidth="1"/>
      <line x1="70" y1="25" x2="60" y2="35" stroke={color} strokeWidth="1"/>
      <line x1="35" y1="60" x2="25" y2="70" stroke={color} strokeWidth="1"/>
      <circle cx="47.5" cy="15" r="3" fill={color}/>
      <circle cx="47.5" cy="80" r="3" fill={color}/>
      <circle cx="15" cy="47.5" r="3" fill={color}/>
      <circle cx="80" cy="47.5" r="3" fill={color}/>
      <circle cx="30" cy="30" r="2" fill={color}/>
      <circle cx="65" cy="30" r="2" fill={color}/>
      <circle cx="30" cy="65" r="2" fill={color}/>
      <circle cx="65" cy="65" r="2" fill={color}/>
    </g>
  </svg>
);

export default KolamPattern8;
import React from 'react';

const KolamPattern10 = ({ size = 80, color = "#783232", opacity = 0.5 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity={opacity}>
      <polygon points="40,10 60,30 60,50 40,70 20,50 20,30" stroke={color} strokeWidth="2" fill="none"/>
      <polygon points="40,20 50,30 50,50 40,60 30,50 30,30" stroke={color} strokeWidth="1.5" fill="none"/>
      <rect x="25" y="25" width="30" height="30" stroke={color} strokeWidth="1" fill="none"/>
      <rect x="32" y="32" width="16" height="16" stroke={color} strokeWidth="1" fill="none"/>
      <path d="M40 10 L40 25" stroke={color} strokeWidth="1"/>
      <path d="M40 55 L40 70" stroke={color} strokeWidth="1"/>
      <path d="M10 40 L25 40" stroke={color} strokeWidth="1"/>
      <path d="M55 40 L70 40" stroke={color} strokeWidth="1"/>
      <path d="M25 25 L15 15" stroke={color} strokeWidth="1"/>
      <path d="M55 55 L65 65" stroke={color} strokeWidth="1"/>
      <path d="M55 25 L65 15" stroke={color} strokeWidth="1"/>
      <path d="M25 55 L15 65" stroke={color} strokeWidth="1"/>
      <circle cx="40" cy="40" r="8" stroke={color} strokeWidth="1" fill="none"/>
      <circle cx="40" cy="40" r="4" fill={color}/>
      <circle cx="40" cy="10" r="2" fill={color}/>
      <circle cx="40" cy="70" r="2" fill={color}/>
      <circle cx="10" cy="40" r="2" fill={color}/>
      <circle cx="70" cy="40" r="2" fill={color}/>
    </g>
  </svg>
);

export default KolamPattern10;
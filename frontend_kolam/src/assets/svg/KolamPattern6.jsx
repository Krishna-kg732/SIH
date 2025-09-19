import React from 'react';

const KolamPattern6 = ({ size = 90, color = "#003049", opacity = 0.5 }) => (
  <svg width={size} height={size} viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity={opacity}>
      <polygon points="45,5 65,25 85,45 65,65 45,85 25,65 5,45 25,25" stroke={color} strokeWidth="2" fill="none"/>
      <polygon points="45,15 55,25 65,45 55,65 45,75 35,65 25,45 35,25" stroke={color} strokeWidth="1.5" fill="none"/>
      <polygon points="45,25 50,30 55,45 50,60 45,65 40,60 35,45 40,30" stroke={color} strokeWidth="1" fill="none"/>
      <line x1="45" y1="5" x2="45" y2="25" stroke={color} strokeWidth="1"/>
      <line x1="45" y1="65" x2="45" y2="85" stroke={color} strokeWidth="1"/>
      <line x1="5" y1="45" x2="25" y2="45" stroke={color} strokeWidth="1"/>
      <line x1="65" y1="45" x2="85" y2="45" stroke={color} strokeWidth="1"/>
      <line x1="25" y1="25" x2="35" y2="35" stroke={color} strokeWidth="1"/>
      <line x1="55" y1="55" x2="65" y2="65" stroke={color} strokeWidth="1"/>
      <line x1="65" y1="25" x2="55" y2="35" stroke={color} strokeWidth="1"/>
      <line x1="35" y1="55" x2="25" y2="65" stroke={color} strokeWidth="1"/>
      <circle cx="45" cy="45" r="4" fill={color}/>
      <circle cx="45" cy="15" r="2" fill={color}/>
      <circle cx="45" cy="75" r="2" fill={color}/>
      <circle cx="15" cy="45" r="2" fill={color}/>
      <circle cx="75" cy="45" r="2" fill={color}/>
    </g>
  </svg>
);

export default KolamPattern6;
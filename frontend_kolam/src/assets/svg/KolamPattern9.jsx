import React from 'react';

const KolamPattern9 = ({ size = 75, color = "#6B2224", opacity = 0.5 }) => (
  <svg width={size} height={size} viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity={opacity}>
      <path d="M37.5 5 Q50 20 65 37.5 Q50 55 37.5 70 Q25 55 10 37.5 Q25 20 37.5 5 Z" stroke={color} strokeWidth="2" fill="none"/>
      <path d="M37.5 15 Q45 25 55 37.5 Q45 50 37.5 60 Q30 50 20 37.5 Q30 25 37.5 15 Z" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="37.5" cy="37.5" r="12" stroke={color} strokeWidth="1" fill="none"/>
      <circle cx="37.5" cy="37.5" r="6" stroke={color} strokeWidth="1" fill="none"/>
      <path d="M37.5 25 L37.5 15" stroke={color} strokeWidth="1"/>
      <path d="M37.5 50 L37.5 60" stroke={color} strokeWidth="1"/>
      <path d="M25 37.5 L15 37.5" stroke={color} strokeWidth="1"/>
      <path d="M50 37.5 L60 37.5" stroke={color} strokeWidth="1"/>
      <path d="M30 30 L22 22" stroke={color} strokeWidth="1"/>
      <path d="M45 45 L53 53" stroke={color} strokeWidth="1"/>
      <path d="M45 30 L53 22" stroke={color} strokeWidth="1"/>
      <path d="M30 45 L22 53" stroke={color} strokeWidth="1"/>
      <circle cx="37.5" cy="5" r="2" fill={color}/>
      <circle cx="37.5" cy="70" r="2" fill={color}/>
      <circle cx="5" cy="37.5" r="2" fill={color}/>
      <circle cx="70" cy="37.5" r="2" fill={color}/>
      <circle cx="37.5" cy="37.5" r="3" fill={color}/>
    </g>
  </svg>
);

export default KolamPattern9;
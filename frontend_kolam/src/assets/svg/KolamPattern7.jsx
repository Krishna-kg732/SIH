import React from 'react';

const KolamPattern7 = ({ size = 80, color = "#8B4513", opacity = 0.5 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity={opacity}>
      <rect x="10" y="10" width="60" height="60" stroke={color} strokeWidth="2" fill="none"/>
      <rect x="20" y="20" width="40" height="40" stroke={color} strokeWidth="1.5" fill="none"/>
      <rect x="30" y="30" width="20" height="20" stroke={color} strokeWidth="1" fill="none"/>
      <circle cx="40" cy="40" r="6" stroke={color} strokeWidth="1" fill="none"/>
      <line x1="10" y1="10" x2="30" y2="30" stroke={color} strokeWidth="1"/>
      <line x1="70" y1="10" x2="50" y2="30" stroke={color} strokeWidth="1"/>
      <line x1="70" y1="70" x2="50" y2="50" stroke={color} strokeWidth="1"/>
      <line x1="10" y1="70" x2="30" y2="50" stroke={color} strokeWidth="1"/>
      <line x1="40" y1="10" x2="40" y2="30" stroke={color} strokeWidth="1"/>
      <line x1="40" y1="50" x2="40" y2="70" stroke={color} strokeWidth="1"/>
      <line x1="10" y1="40" x2="30" y2="40" stroke={color} strokeWidth="1"/>
      <line x1="50" y1="40" x2="70" y2="40" stroke={color} strokeWidth="1"/>
      <circle cx="20" cy="20" r="2" fill={color}/>
      <circle cx="60" cy="20" r="2" fill={color}/>
      <circle cx="20" cy="60" r="2" fill={color}/>
      <circle cx="60" cy="60" r="2" fill={color}/>
      <circle cx="40" cy="20" r="1.5" fill={color}/>
      <circle cx="40" cy="60" r="1.5" fill={color}/>
      <circle cx="20" cy="40" r="1.5" fill={color}/>
      <circle cx="60" cy="40" r="1.5" fill={color}/>
    </g>
  </svg>
);

export default KolamPattern7;
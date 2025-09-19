import React from 'react';

const KolamPattern5 = ({ size = 85, color = "#6B2224", opacity = 0.5 }) => (
  <svg width={size} height={size} viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity={opacity}>
      <circle cx="42.5" cy="42.5" r="40" stroke={color} strokeWidth="2" fill="none"/>
      <circle cx="42.5" cy="42.5" r="30" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="42.5" cy="42.5" r="20" stroke={color} strokeWidth="1" fill="none"/>
      <circle cx="42.5" cy="42.5" r="10" stroke={color} strokeWidth="1" fill="none"/>
      <line x1="2.5" y1="42.5" x2="82.5" y2="42.5" stroke={color} strokeWidth="1"/>
      <line x1="42.5" y1="2.5" x2="42.5" y2="82.5" stroke={color} strokeWidth="1"/>
      <line x1="12.5" y1="12.5" x2="72.5" y2="72.5" stroke={color} strokeWidth="1"/>
      <line x1="72.5" y1="12.5" x2="12.5" y2="72.5" stroke={color} strokeWidth="1"/>
      <circle cx="42.5" cy="12.5" r="3" fill={color}/>
      <circle cx="42.5" cy="72.5" r="3" fill={color}/>
      <circle cx="12.5" cy="42.5" r="3" fill={color}/>
      <circle cx="72.5" cy="42.5" r="3" fill={color}/>
      <circle cx="22.5" cy="22.5" r="2" fill={color}/>
      <circle cx="62.5" cy="22.5" r="2" fill={color}/>
      <circle cx="22.5" cy="62.5" r="2" fill={color}/>
      <circle cx="62.5" cy="62.5" r="2" fill={color}/>
    </g>
  </svg>
);

export default KolamPattern5;
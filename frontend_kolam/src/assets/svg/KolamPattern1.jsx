import React from 'react';

const KolamPattern1 = ({ size = 101, color = "#6B2224", opacity = 0.5 }) => (
  <svg width={size} height={size} viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity={opacity}>
      <path d="M51.5771 1.12308L64.0771 25.6231" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="51.6563" y1="50.6435" x2="39.0205" y2="25.659" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M39.0762 25.6233L51.6556 1.06416" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="51.3265" y1="50.664" x2="63.9624" y2="25.6795" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M51.5766 51.1229L64.0765 74.123" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="51.6563" y1="99.2589" x2="39.0205" y2="74.2744" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M39.0762 74.1232L51.5762 50.6232" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M52.0763 99.1229L63.9633 74.2948" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="51.0199" y1="50.2745" x2="26.0354" y2="62.9103" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="1.44105" y1="51.8947" x2="26.4256" y2="39.2589" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M26.5767 39.123L51.0768 50.623" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M2.07713 52.1232L25.5771 63.1232" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M99.6362 49.6592L75.0773 63.6232" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M52.0781 50.123L75.0422 38.6436" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M75.0765 38.6232L99.5765 49.623" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M52.0781 51.1232L75.0217 63.5872" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </g>
  </svg>
);

export default KolamPattern1;
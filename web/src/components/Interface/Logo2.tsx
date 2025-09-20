import React from "react";

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="120"
    height="40"
    viewBox="0 0 120 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id="grad1"
        x1="0"
        y1="0"
        x2="120"
        y2="40"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4f46e5" />
        <stop offset="1" stopColor="#6366f1" />
      </linearGradient>
    </defs>
    <rect width="120" height="40" rx="8" fill="url(#grad1)" />
    <text
      x="60"
      y="26"
      textAnchor="middle"
      fill="white"
      fontSize="20"
      fontWeight="700"
      fontFamily="Poppins, sans-serif"
      letterSpacing="1.5"
    >
      LocalBook
    </text>
  </svg>
);

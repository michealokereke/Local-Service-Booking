// components/Logo.tsx
import React from "react";

const Logo: React.FC<{ size?: number; className?: string }> = ({
  size = 64,
  className = "",
}) => {
  return (
    <svg
      className={className}
      width="120"
      height="120"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Local Service Booking Logo"
      stroke="currentColor"
      style={{ width: size, height: size }}
    >
      <circle
        cx="50"
        cy="50"
        r="43"
        strokeWidth="12"
        className="animate-pulse-slow"
      />
      <path
        d="M30 60 L50 35 L70 60 Z"
        fill="currentColor"
        className="transform-gpu hover:rotate-2 transition-transform duration-500"
      />
    </svg>
  );
};

export default Logo;
//d="M40 70 L60 40 L80 70 Z"

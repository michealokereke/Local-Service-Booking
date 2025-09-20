// components/Logo.tsx
import React from "react";

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Local Service Booking Logo"
    >
      <defs>
        <linearGradient id="gradient1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      <circle
        cx="60"
        cy="60"
        r="54"
        stroke="url(#gradient1)"
        strokeWidth="12"
        className="animate-pulse-slow"
      />
      <path
        d="M40 70 L60 40 L80 70 Z"
        fill="url(#gradient2)"
        className="transform-gpu hover:rotate-6 transition-transform duration-500"
      />
    </svg>
  );
};

export default Logo;

import React from "react";

interface CarSVGProps {
  color?: string;
  width?: number;
  height?: number;
}

const DEFAULT_WIDTH = 80
const DEFAULT_HEIGHT = 40

export default function CarSVG({ color = '#ffffff', width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT }: CarSVGProps) {
  return (
      <svg
          width={width}
          height={height}
          viewBox="0 0 80 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        {/* body */}
        <rect x="4" y="16" width="72" height="16" rx="4" fill={color} />
        {/* cabin */}
        <path d="M20 16 L28 6 L52 6 L60 16 Z" fill={color} opacity="0.85" />
        {/* windows */}
        <path d="M30 8 L28 14 H50 L48 8 Z" fill="#1a1d27" opacity="0.7" />
        {/* wheels */}
        <circle cx="18" cy="32" r="7" fill="#1a1d27" />
        <circle cx="18" cy="32" r="3.5" fill="#3a3d52" />
        <circle cx="62" cy="32" r="7" fill="#1a1d27" />
        <circle cx="62" cy="32" r="3.5" fill="#3a3d52" />
        {/* headlight */}
        <rect x="72" y="20" width="4" height="6" rx="1" fill="#ffd43b" opacity="0.9" />
      </svg>
  );
}
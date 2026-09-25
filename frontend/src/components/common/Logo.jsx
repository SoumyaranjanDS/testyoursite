import React from "react";

const Logo = ({ className = "w-8 h-8 text-current" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Base Side Walls */}
    <path
      d="M12 15L2 10V16L12 21L22 16V10L12 15Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 15V21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Floating Top Lid */}
    <path
      d="M12 3L22 8L12 13L2 8L12 3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Nested Inner Square */}
    <path
      d="M12 5.5L17 8L12 10.5L7 8L12 5.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Data Link Connections */}
    <path
      d="M7 12.5V10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M17 12.5V10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 15V13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Central Core */}
    <circle cx="12" cy="8" r="1" fill="currentColor" />
  </svg>
);

export default Logo;

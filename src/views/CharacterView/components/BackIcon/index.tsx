import React from "react";

export default function BackIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className="h-8 w-8 stroke-black"
    >
      <rect width="256" height="256" fill="none" stroke="none" />
      <polyline
        points="80 136 32 88 80 40"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <path
        d="M80,200h88a56,56,0,0,0,56-56h0a56,56,0,0,0-56-56H32"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"

      />
    </svg>
  );
}

// DiagonalBox.jsx
import React from "react";

export default function DiagonalBox({
  size = 20, // px
  stroke = 1, // line thickness
  color = "black",
  className = "",
}) {
  return (
    <div
      className={`inline-flex items-center justify-center border rounded-sm ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: 1,
        borderColor: "currentColor",
        background: "transparent",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        {/* Permanent diagonal (top-right → bottom-left) */}
        <line
          x1="24"
          y1="0"
          x2="0"
          y2="24"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

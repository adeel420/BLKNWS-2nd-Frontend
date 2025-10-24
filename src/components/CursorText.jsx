import React, { useEffect, useState } from "react";

export default function CursorText({ isMuted, sectionRef }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();

      // check if mouse is inside this section
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (inside) {
        setPos({ x: e.clientX, y: e.clientY });
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [sectionRef]);

  if (!visible) return null; // hide outside section

  return (
    <div
      className="hidden md:block "
      style={{
        position: "fixed",
        top: pos.y,
        left: pos.x,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 9999,
        fontSize: "14px",
        fontWeight: "bold",
        color: "white",
        background: "rgba(0,0,0,0.6)",
        padding: "2px 6px",
        borderRadius: "4px",
      }}
    >
      {isMuted ? "Unmute" : "Mute"}
    </div>
  );
}

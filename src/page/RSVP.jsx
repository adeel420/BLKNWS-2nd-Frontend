import React, { useRef, useState } from "react";
import Popup from "../components/Popup";
import CursorText from "../components/CursorText";
import { assets } from "../assets/assets";
import { MdKeyboardArrowDown, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import Header from "../components/Header";

const RSVP = () => {
  const [popup, setPopup] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const sectionRef = useRef(null);

  return (
    <>
      {/* Main Content */}
      <div className="bg-[black] relative">
        <div className="relative w-full h-[100vh] overflow-hidden">
          {/* Background Video */}
          <div className="flex items-center justify-center w-full h-full relative z-[1]">
            <video
              src={assets.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-[380px] h-[380px] md:w-[630px] md:h-[630px] object-cover"
            ></video>
          </div>

          {/* Header - Medium z-index */}
          <div className="absolute inset-0 flex flex-col justify-between z-[99999] md:z-[50] pointer-events-none">
            <div className="pointer-events-auto">
              <Header />
            </div>
          </div>

          {/* Cursor Text */}
          {!popup && (
            <div className="absolute inset-0 z-[5]">
              <CursorText isMuted={isMuted} sectionRef={sectionRef} />
            </div>
          )}
        </div>

        {/* Additional Sections */}
        <div className="bg-black relative" ref={sectionRef}>
          {/* Your other content here */}
        </div>
      </div>

      {/* Popup - Highest z-index (renders last so it's on top) */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999] top-[50%] md:top-[0] pointer-events-none md:ml-[-9%] ">
        <div className="pointer-events-auto">
          <Popup setPopup={setPopup} />
        </div>
      </div>
    </>
  );
};

export default RSVP;

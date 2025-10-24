import React, { useRef, useState } from "react";
// import First_Section from "../component/First_Section";
import Popup from "../components/Popup";
import CursorText from "../components/CursorText";
import { assets } from "../assets/assets";
import { MdKeyboardArrowDown, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import Header from "../components/Header";

const RSVP = () => {
  const [popup, setPopup] = useState(true);
  // const [audioStarted, setAudioStarted] = useState(false);
  // const [isMuted, setIsMuted] = useState(false);
  // const sectionRef = useRef(null);
  // const [isHoveringBuffer, setIsHoveringBuffer] = useState(false);
  // const audioRef = useRef(null);

  // const handleToggleAudio = () => {
  //   if (audioRef.current) {
  //     if (audioRef.current.paused) {
  //       audioRef.current.play();
  //       setIsMuted(false);
  //     } else {
  //       audioRef.current.muted = !audioRef.current.muted;
  //       setIsMuted(audioRef.current.muted);
  //     }
  //   }
  // };

  // const handleStartAudio = () => {
  //   if (audioRef.current && !audioStarted) {
  //     audioRef.current
  //       .play()
  //       .then(() => setAudioStarted(true))
  //       .catch((err) => console.log("Autoplay blocked:", err));
  //   }
  // };
  return (
    <>
      <div
        className="bg-[black]"
        style={{ zIndex: "-111111111111111111111111111111111111111111111111" }}
        // onClick={handleStartAudio}
      >
        <div className="relative w-full h-[100vh] overflow-hidden">
          {/* <audio ref={audioRef} src={assets.audio} lohandleToggleAudio op autoPlay /> */}

          {/* Background Video */}
          <div className="flex items-center justify-center w-full h-full relative">
            <video
              src={assets.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-[380px] h-[380px] md:w-[630px] md:h-[630px] object-cover z-[1]"
            ></video>
          </div>

          {/* Header */}
          <div className="absolute inset-0 flex flex-col justify-between z-[3]">
            <Header />
          </div>

          {/* Cursor Text */}
          <div className="bg-black relative">
            {!popup && <CursorText isMuted={isMuted} sectionRef={sectionRef} />}
          </div>
        </div>
      </div>
      {/* Popup */}
      {/* ✅ Popup now appears above hero section */}

      {/* Popup visually above everything but doesn't block header clicks */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999] top-[50%] md:top-[0] pointer-events-none md:ml-[-6%] ">
        <div className="pointer-events-auto">
          <Popup setPopup={setPopup} />
        </div>
      </div>

      <div className="bg-black relative">
        {/* aapka purana section code yahan */}

        {/* CursorText sirf is section ke andar visible hoga */}
        {!popup && <CursorText isMuted={isMuted} sectionRef={sectionRef} />}
      </div>
    </>
  );
};

export default RSVP;

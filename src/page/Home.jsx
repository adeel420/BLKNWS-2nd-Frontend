import React, { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import { assets } from "../assets/assets";
import CursorText from "../components/CursorText";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import { initializeGlobalAudio, getGlobalAudio } from "../utils/audioContext";

const Home = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const sectionRef = useRef(null);
  const [isHoveringBuffer, setIsHoveringBuffer] = useState(false);
  const [popup, setPopup] = useState(false);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize global audio on mount
  useEffect(() => {
    initializeGlobalAudio(assets.audio);
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleToggleAudio = () => {
    const audio = getGlobalAudio();
    if (!audio) return;

    if (!audioStarted) {
      audio
        .play()
        .then(() => {
          setAudioStarted(true);
          audio.muted = false;
          setIsMuted(false);
        })
        .catch((err) => console.log("Autoplay blocked:", err));
    } else {
      audio.muted = !audio.muted;
      setIsMuted(audio.muted);
    }
  };

  const handleStartAudio = () => {
    const audio = getGlobalAudio();
    if (audio && !audioStarted) {
      audio
        .play()
        .then(() => {
          setAudioStarted(true);
          setIsMuted(false);
        })
        .catch((err) => console.log("Autoplay blocked:", err));
    }
  };

  return (
    <div className="bg-black">
      <div className="w-[95%] md:w-[100%]">
        {/* ======================= HERO SECTION ======================= */}
        <div
          className="bg-[black]"
          style={{
            zIndex: "-111111111111111111111111111111111111111111111111",
          }}
          onClick={handleStartAudio}
        >
          <div className="relative w-full h-[100vh] disk-vid overflow-hidden">
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
              <div
                className="w-[380px] h-[380px] rounded-full md:w-[600px] md:h-[500px] absolute object-cover z-20"
                onClick={handleToggleAudio}
                ref={sectionRef}
              ></div>
            </div>

            {/* Header */}
            <div className="absolute w-[105%] ml-[-7px] md:ml-0 sm:w-[105%] md:w-[100%] inset-0 flex flex-col justify-between z-[3]">
              <Header
                audioStarted={audioStarted}
                setAudioStarted={setAudioStarted}
                isMuted={isMuted}
                setIsMuted={setIsMuted}
                isHoveringBuffer={isHoveringBuffer}
                setIsHoveringBuffer={setIsHoveringBuffer}
              />
            </div>

            {/* Cursor Text */}
            <div className="bg-black relative">
              {!popup && (
                <CursorText isMuted={isMuted} sectionRef={sectionRef} />
              )}
            </div>
          </div>
        </div>

        {/* ======================= COMING SOON SECTION ======================= */}
        <section className="bg-black text-white flex flex-col items-center px-0 sm:px-6 lg:px-12 py-0 md:py-16">
          <img
            src={assets.textLogo}
            alt="BLKNWS Logo"
            className="h-[70px] self-center ml-[-20px] md:ml-0 sm:h-[100px] md:h-[130px] object-contain mb-4"
          />

          <p
            className="font-bold text-base sm:text-lg md:text-xl tracking-wide"
            style={{ fontFamily: "VTC Du Bois, sans-serif" }}
          >
            Coming Soon
          </p>

          <p
            className="text-center max-w-[95%] sm:max-w-[600px] md:max-w-[800px] mt-4 text-xs sm:text-sm md:text-base leading-relaxed"
            style={{ fontFamily: "VTC Du Bois, sans-serif" }}
          >
            Adapted from Kahlil Joseph's renowned video art installation,
            <span className="font-semibold"> BLKNWS: Terms & Conditions </span>
            is a distinctive cinematic experience that mirrors the sonic
            textures of a record album, weaving fiction and history in an
            immersive journey where the fictionalized figures of W. E. B Du Bois
            and Marcus Garvey join artists, musicians, Joseph's family, and even
            Twitter chats, in a vision for black consciousness.
          </p>

          <div className="relative w-full max-w-[800px] mt-8 aspect-video rounded-2xl overflow-hidden shadow-lg">
            {!isPlaying && (
              <img
                src={assets.thumbnail}
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            <video
              ref={videoRef}
              src={assets.videoWatch}
              controls
              playsInline
              className={`w-full h-full object-cover transition-opacity duration-700 ${
                isPlaying ? "opacity-100" : "opacity-0"
              }`}
            />

            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <button
                  onClick={() => {
                    handlePlay();
                    const audio = getGlobalAudio();
                    if (audio) {
                      audio.muted = true;
                      setIsMuted(true);
                    }
                  }}
                  className="text-white flex flex-col items-center gap-0 md:gap-2 font-semibold text-sm sm:text-5xl cursor-pointer"
                >
                  <span>
                    <img
                      src={assets.play}
                      className="h-[18px] mb-2 w-[18px] md:h-[40px] md:w-[40px]"
                    />
                  </span>
                  <span>WATCH</span>
                  <span>TEASER</span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* popup */}
        <div className="bg-black ml-3 md:ml-0 w-[97%] pt-8">
          <Popup />
        </div>
      </div>
    </div>
  );
};

export default Home;

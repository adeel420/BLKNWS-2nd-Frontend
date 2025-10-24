import React, { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import { assets } from "../assets/assets";
import CursorText from "../components/CursorText";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import { initializeGlobalAudio, getGlobalAudio } from "../utils/audioContext";
import { Play } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const sectionRef = useRef(null);
  const [isHoveringBuffer, setIsHoveringBuffer] = useState(false);
  const [popup, setPopup] = useState(false);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
        <div className="bg-[black] relative" onClick={handleStartAudio}>
          <div className="relative w-full h-[100vh] disk-vid overflow-hidden">
            {/* Background Video - z-index: 1 */}
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

            {/* Clickable overlay for audio toggle - z-index: 2 */}
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full md:w-[600px] md:h-[500px] z-[2] cursor-pointer"
              onClick={handleToggleAudio}
              ref={sectionRef}
            ></div>

            {/* Header - z-index: 30 (highest, so links work) */}
            <div className="absolute w-[105%] ml-[-7px] md:ml-0 sm:w-[105%] md:w-[100%] top-0 left-0 right-0 z-30 pointer-events-none">
              <div className="pointer-events-auto">
                <Header
                  audioStarted={audioStarted}
                  setAudioStarted={setAudioStarted}
                  isMuted={isMuted}
                  setIsMuted={setIsMuted}
                  isHoveringBuffer={isHoveringBuffer}
                  setIsHoveringBuffer={setIsHoveringBuffer}
                />
              </div>
            </div>

            {/* Cursor Text - z-index: 20 */}
            <div className="absolute inset-0 z-20 pointer-events-none">
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
            <div className="relative w-full h-full">
              <img
                src={assets.thumbnail}
                className="absolute inset-0 mt-12 md:mt-0 w-full h-full object-contain md:object-cover object-top md:object-center bg-black"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 z-[1]" />

              {/* Play Button Overlay - z-index increased */}
              <button
                onClick={() => setIsPopupOpen(true)}
                className="absolute cursor-pointer top-[58%] md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 md:p-6 transition-all hover:scale-110 shadow-lg z-[2]"
                aria-label="Play Video"
              >
                <Play className="w-5 h-5 md:w-12 md:h-12 text-black fill-black cursor-pointer" />
              </button>
            </div>

            {/* Video Popup */}
            {isPopupOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                {/* Close button */}
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10 cursor-pointer"
                  aria-label="Close Video"
                >
                  &times;
                </button>

                {/* Video Container */}
                <div className="relative w-full max-w-5xl aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/bfSphlAyHLs?si=LoGD1ZYtFAc7XICT&autoplay=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
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

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdVolumeOff, MdVolumeUp } from "react-icons/md";
import SignupPopup from "./SignupPopup";
import { getGlobalAudio } from "../utils/audioContext";

const Header = ({
  audioStarted = null,
  setAudioStarted = null,
  isMuted = null,
  setIsMuted = null,
  isHoveringBuffer = false,
  setIsHoveringBuffer = null,
}) => {
  const [popup, setPopup] = useState(false);
  const token = localStorage.getItem("token");
  const [localHovering, setLocalHovering] = useState(false);

  // Local state for non-homepage
  const [localAudioStarted, setLocalAudioStarted] = useState(false);
  const [localIsMuted, setLocalIsMuted] = useState(false);

  const location = useLocation();
  const isHomepage = location.pathname === "/";

  // Use passed props if on homepage, otherwise use local state
  const currentAudioStarted =
    isHomepage && audioStarted !== null ? audioStarted : localAudioStarted;
  const currentSetAudioStarted =
    isHomepage && setAudioStarted ? setAudioStarted : setLocalAudioStarted;

  const currentIsMuted =
    isHomepage && isMuted !== null ? isMuted : localIsMuted;
  const currentSetIsMuted =
    isHomepage && setIsMuted ? setIsMuted : setLocalIsMuted;

  const isHovering = isHomepage ? isHoveringBuffer : localHovering;
  const setIsHovering =
    isHomepage && setIsHoveringBuffer ? setIsHoveringBuffer : setLocalHovering;

  // Sync header with global audio on route change
  useEffect(() => {
    const audio = getGlobalAudio();
    if (audio) {
      currentSetAudioStarted(!audio.paused);
      currentSetIsMuted(audio.muted);
    }
  }, [location.pathname]);

  const handleToggleAudio = () => {
    const audio = getGlobalAudio();
    if (!audio) return;

    if (!currentAudioStarted) {
      audio
        .play()
        .then(() => {
          currentSetAudioStarted(true);
          audio.muted = false;
          currentSetIsMuted(false);
        })
        .catch((err) => console.log("Autoplay blocked:", err));
    } else {
      audio.muted = !audio.muted;
      currentSetIsMuted(audio.muted);
    }
  };

  const handleStartAudio = () => {
    const audio = getGlobalAudio();
    if (audio && !currentAudioStarted) {
      audio
        .play()
        .then(() => {
          currentSetAudioStarted(true);
          currentSetIsMuted(false);
        })
        .catch((err) => console.log("Autoplay blocked:", err));
    }
  };

  return (
    <>
      <header
        className="w-full bg-transparent ml-[-8px] md:ml-0 text-white z-50 px-2 sm:px-2 py-4"
        onClick={handleStartAudio}
      >
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-center md:justify-between gap-5 sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-3 relative">
            <div
              className="relative cursor-pointer flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9"
              onClick={handleToggleAudio}
            >
              {currentIsMuted ? (
                <MdVolumeOff className="text-white text-lg sm:text-xl md:text-2xl hover:text-gray-300 transition-colors" />
              ) : (
                <MdVolumeUp className="text-white text-lg sm:text-xl md:text-2xl hover:text-gray-300 transition-colors" />
              )}
            </div>

            <div className="text-white">
              <h1 className="text-[8px] sm:text-[10px] md:text-[14px] font-semibold whitespace-nowrap">
                De Onde Vem
              </h1>
              <h1 className="text-[8px] sm:text-[10px] md:text-[14px] text-[#A6A6A6] whitespace-nowrap">
                Avila Santo
              </h1>
            </div>
          </div>

          <nav
            className="
              flex 
              justify-between mr-[-9px] items-center 
              gap-5 sm:gap-6 md:gap-8 
              text-[8px] sm:text-sm md:text-[16px] 
              font-bold
            "
          >
            <Link to="/" className="hover:text-gray-300 transition-colors">
              HOME
            </Link>
            <Link to="/watch" className="hover:text-gray-300 transition-colors">
              WATCH
            </Link>
            <Link
              to={token ? "/community" : `/signup`}
              className="hover:text-gray-300 transition-colors"
            >
              COMMUNITY
            </Link>
            <Link
              to="/credits"
              className="hover:text-gray-300 transition-colors"
            >
              CREDITS
            </Link>
            <Link to="/rsvp" className="hover:text-gray-300 transition-colors">
              RSVP
            </Link>
          </nav>
        </div>

        <div className="z-40">
          {popup && <SignupPopup onClose={() => setPopup(false)} />}
        </div>
      </header>
    </>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdVolumeOff, MdVolumeUp, MdMenu, MdClose } from "react-icons/md";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const [localAudioStarted, setLocalAudioStarted] = useState(false);
  const [localIsMuted, setLocalIsMuted] = useState(false);

  const location = useLocation();
  const isHomepage = location.pathname === "/";

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

  useEffect(() => {
    const audio = getGlobalAudio();
    if (audio) {
      currentSetAudioStarted(!audio.paused);
      currentSetIsMuted(audio.muted);
    }
  }, [location.pathname]);

  // ✅ Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
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
      <header className="w-full bg-transparent ml-[-8px] md:ml-0 text-white z-50 px-2 sm:px-2 py-4 relative">
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-5 sm:gap-6">
          {/* Left Section: Audio + Title */}
          <div className="flex items-center gap-2 sm:gap-3 relative">
            <div
              className="relative cursor-pointer flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9"
              onClick={(e) => {
                e.stopPropagation();
                handleStartAudio();
                handleToggleAudio();
              }}
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

          {/* Desktop Nav */}
          <nav
            className="
              hidden md:flex 
              justify-between items-center 
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

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none z-[10000]"
            >
              {menuOpen ? (
                <MdClose className="text-2xl text-white" />
              ) : (
                <MdMenu className="text-2xl text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div
            className="
              fixed top-[72px] left-0 right-0
              bg-black/95 backdrop-blur-md 
              md:hidden flex flex-col items-center 
              py-6 space-y-5 z-[9999]
              text-base font-semibold
            "
          >
            {[
              { label: "HOME", to: "/" },
              { label: "WATCH", to: "/watch" },
              { label: "COMMUNITY", to: token ? "/community" : "/signup" },
              { label: "CREDITS", to: "/credits" },
              { label: "RSVP", to: "/rsvp" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="hover:text-gray-300 transition-colors w-full text-center py-2 relative z-[10000]"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}

        <div className="z-40">
          {popup && <SignupPopup onClose={() => setPopup(false)} />}
        </div>
      </header>
    </>
  );
};

export default Header;

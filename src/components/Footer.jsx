import { assets } from "../assets/assets";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  return (
    <footer className="bg-black text-white flex flex-col z-40 relative items-center justify-center gap-5 sm:gap-6 py-12 sm:py-16 px-4">
      <div className="flex flex-row ml-[-8px] md:ml-[-26px] items-center gap-8 text-[11px] text-xs sm:text-sm">
        <Link
          to="/rsvp"
          className="px-1 flex gap-2 md:gap-4 items-center justify-center sm:px-2 py-1.5 sm:py-2 cursor-pointer transition text-center flex-1"
        >
          <span>R</span>
          <span>S</span>
          <span>V</span>
          <span>P</span>
        </Link>

        <Link
          to="https://www.youtube.com/watch?v=bfSphlAyHLs&feature=youtu.be"
          target="_blank"
          className="px-1 flex gap-2 md:gap-4 items-center justify-center sm:px-2 py-1.5 sm:py-2 cursor-pointer transition text-center"
        >
          T E A S E R
        </Link>

        <Link
          to="/privacy-policy"
          target="_blank"
          className="px-1 flex gap-2 md:gap-4 items-center justify-center sm:px-2 py-1.5 sm:py-2 cursor-pointer transition text-center whitespace-nowrap"
        >
          PRIVACY POLICY
        </Link>
      </div>

      <p className="text-center text-xs ml-[-8px] md:ml-[-26px] sm:text-sm md:text-base">
        © 2025 Rich Spirit, LLC. All rights reserved
      </p>

      <img
        src={assets.coloredLogo}
        alt="Rich Spirit Logo"
        className="h-8 sm:h-10 md:h-10 ml-[-8px] md:ml-[-26px] w-auto object-contain"
      />

      <div className="text-white flex ml-0 md:ml-[-26px] items-center gap-6">
        <a
          href="https://www.tiktok.com/@richspirit____?_t=ZP-8zmho9NNJLb&_r=1"
          target="_blank"
          className="text-3xl cursor-pointer"
        >
          <FaTiktok />
        </a>
        <a
          href="https://www.instagram.com/richspiritstudio/"
          target="_blank"
          className="text-3xl cursor-pointer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.youtube.com/watch?v=bfSphlAyHLs&feature=youtu.be"
          target="_blank"
          className="text-3xl cursor-pointer"
        >
          <FaYoutube />
        </a>
        <a
          href="https://x.com/richspiritfilm"
          target="_blank"
          className="text-3xl cursor-pointer"
        >
          <FaXTwitter />
        </a>
      </div>
      {/* Optional Popup */}
      {/* <div className="text-black">{popup && <Popup setPopup={setPopup} />}</div> */}
    </footer>
  );
};

export default function FooterWrapper() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? (
        <div className="relative z-50 mt-[-350px] md:mt-0">
          <Footer />
        </div>
      ) : (
        <Footer />
      )}
    </>
  );
}

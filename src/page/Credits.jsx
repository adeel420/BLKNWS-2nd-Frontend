import Header from "../components/Header";
import { assets } from "../assets/assets";
import React, { useEffect, useRef } from "react";

const Credits = () => {
  const credits = (
    <div className="flex flex-col  items-center gap-6 text-center px-6">
      <div className="mt-3">
        <p
          className="font-bold text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          Starring
        </p>
        <p
          className="font-normal text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          Kaneza Schall, Hope Giselle, Shaunette Renée Wilson, Peter Jay
          Fernandez
        </p>
      </div>

      <div className="">
        <p
          className="font-bold text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          Casting By
        </p>
        <p
          className="font-normal text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          Aisha Coley
        </p>
      </div>

      <div className="">
        <p
          className="font-bold text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          Music Supervisors{" "}
        </p>
        <p
          className="font-normal text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          Lauren Marie Mikus and Bruce Gilbert
        </p>
      </div>

      <div className="">
        <p
          className="font-bold text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          Music By
        </p>
        <p
          className="font-normal text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          Klein
        </p>
      </div>

      <div className="">
        <p
          className="font-bold text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          Costume Designers
        </p>
        <p
          className="font-normal text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          Mobolaji Dawodu, IB Kamara, Grace Wales Bonner
        </p>
      </div>

      <div className="">
        <p
          className="font-bold text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          Edited by
        </p>
        <p
          className="font-normal text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          Luke Lynch, Paul Rogers, Ace, Kahlil Joseph
        </p>
      </div>

      <div className="">
        <p
          className="font-bold text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          Director of Photography
        </p>
        <p
          className="font-normal text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          Bradford Young
        </p>
      </div>

      <div className="">
        <p
          className="font-bold text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          Executive Producers
        </p>
        <p
          className="font-normal text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          James Shani, Anikah Mclaren, David Linde, Steven Soderbergh
        </p>
      </div>

      <div className="">
        <p
          className="font-bold text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          Produced by
        </p>
        <p
          className="font-normal text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          Onye Anyanwu, Kahlil Joseph, Amy Greenleaf, Nic Gonda
        </p>
      </div>

      <div className="">
        <p
          className="font-bold text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          Written by
        </p>
        <p
          className="font-normal text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          Kahlil Joseph, Saidiya Hartman, Irvin Hunt, Madebo Fatunde, Kristen
          Adele Calhoun
        </p>
        <p
          className="font-normal text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "VTC Du Bois, sans-serif" }}
        >
          Christina Sharpe, Kaneza Schaal
        </p>
      </div>
    </div>
  );

  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let autoScroll;

    const startAutoScroll = () => {
      autoScroll = setInterval(() => {
        if (
          container.scrollTop + container.clientHeight >=
          container.scrollHeight - 5
        ) {
          // reset back to start when reaching bottom
          container.scrollTop = 0;
        } else {
          container.scrollTop += 1; // adjust speed (px per tick)
        }
      }, 40); // smaller = faster scroll
    };

    startAutoScroll();

    // pause while user is scrolling manually, then restart
    const handleUserScroll = () => {
      clearInterval(autoScroll);
      startAutoScroll();
    };

    container.addEventListener("scroll", handleUserScroll);

    return () => {
      clearInterval(autoScroll);
      container.removeEventListener("scroll", handleUserScroll);
    };
  }, []);
  return (
    <div className="bg-black">
      <Header />
      <div className="bg-black pt-0">
        <div
          className="relative bg-black text-white h-screen w-full overflow-hidden"
          style={{
            backgroundImage: `url(${assets.endImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Scrolling Container */}
          <div className="absolute bottom-0 w-full h-full overflow-hidden">
            {/* Desktop: Auto-scroll via CSS animation */}
            <div className="hidden md:flex animate-scrollUp flex-col">
              {credits}
              {credits} {/* duplicate for loop */}
            </div>

            {/* Mobile: Auto-scroll + manual scroll */}
            <div
              ref={scrollRef}
              className="flex md:hidden flex-col overflow-y-auto h-full px-4 max-w-[90%] mx-auto"
            >
              {credits}
              {credits}
              {credits}
              {credits} {/* multiple copies for looping */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;

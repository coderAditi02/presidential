"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const windowHeight = window.innerHeight;

        // Calculate scroll progress within the section
        if (sectionTop < windowHeight && rect.bottom > 0) {
          const progress = (windowHeight - sectionTop) / (windowHeight + rect.height);
          setScrollY(progress);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate parallax offsets
  const video1Offset = scrollY * -60; // Moves upward
  const video2Offset = scrollY * 60;  // Moves downward

  return (
    <section ref={sectionRef} id="overview" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4  ">

          {/* Left Column - Content */}
          <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0 relative lg:top-12 mb-12 lg:mb-0">
            <p className="text-gradient-to-r from-[#FACB65] to-[#D8AE51]   text-sm md:text-2xl font-semibold  mb-2">Overview</p>
            <h2 className="text-3xl md:text-5xl font-normal text-[#15243D] mb-6">
              Presidential Park
            </h2>
            <p className="text-gray-600 text-sm md:text-lg leading-relaxed">
              Spread across 10 acres of pristine land in the serene foothills of Maval, Talegaon Pune, Presidential Park is where considered luxury meets the calm of open nature. Every plot has been thoughtfully planned to give you space, privacy, and a connection to the landscape that high-rise living simply cannot offer. Whether you are building your forever home or making a sound long-term investment, Presidential Park stands as Talegaon's most distinguished address.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent("open-lead-popup"));
                }}
                className="relative inline-flex items-center gap-6 px-6 py-3 bg-[#15243D] text-[#FACB65] text-lg font-bold transition-all duration-300 rounded-lg group shadow-xl overflow-hidden mt-6 cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-b from-[#FACB65] to-[#D8AE51] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <span className="relative z-10 group-hover:text-[#15243D] transition-colors duration-500">Download Brochure</span>
              </button>
            </motion.div>

          </div>

          {/* Right Column - Prominent Videos */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 w-full max-w-[950px] mx-auto lg:ml-auto lg:mr-0">
            {/* Video 1 */}
            <div
              className="relative w-full aspect-[2/3] overflow-hidden rounded-2xl shadow-xl transition-transform duration-500 ease-out"
              style={{ transform: `translateY(${video1Offset}px)` }}
            >
              <img
                src="/about/pune_real_2.jpeg"
                className="w-full h-full object-cover"
                alt="Pune Real Estate"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
            </div>

            {/* Video 2 */}
            <div
              className="relative w-full aspect-[2/3] overflow-hidden rounded-2xl shadow-xl transition-transform duration-500 ease-out md:mt-1"
              style={{ transform: `translateY(${video2Offset}px)` }}
            >
              <video
                src="/about/PRESIDENTIAL AI .mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

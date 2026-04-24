"use client";
import { motion, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Typing animation component
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("");
  const count = useMotionValue(0);

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      duration: 2,
      delay: delay,
      ease: "linear",
      onUpdate: (latest) => {
        setDisplayText(text.slice(0, Math.round(latest)));
      },
    });
    return controls.stop;
  }, [count, text, delay]);

  return (
    <span className="inline-block">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[2px] h-[1em] bg-white ml-1 align-middle"
      />
    </span>
  );
}

const bannerImages = [
  "/Home/hero-1.png",
  "/Home/hero-2.png",
  "/Home/hero-3.png",
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 6000); // 6 seconds for each slide
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Auto Sliding Banner Section */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#15243D]">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "linear" }}
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${bannerImages[currentIndex]})` }}
            />
            {/* Overlays for depth and readability */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
          className="text-center max-w-4xl"
        >
          {/* Subtitle */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="text-[#DEC79A] text-sm md:text-base font-medium tracking-[0.2em] mb-4 uppercase"
          >
            Starting From ₹49 Lacs*
          </motion.p>

          {/* Main Heading with Typing Animation */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight pb-2"
          >
            <TypewriterText text="Highway Touch Premium NA Plots" delay={0.5} />
          </motion.h1>

          {/* Quote */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, delay: 2.5 }}
            className="text-white/90 text-base md:text-lg mb-10  font-light tracking-wide"
          >
            &ldquo;Phase 1 Sold Out - Phase 2 Now Open&rdquo;
          </motion.p>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-4 md:gap-6"
          >
            {/* Primary Action: I am Interested */}
            <motion.button
              onClick={() => window.dispatchEvent(new CustomEvent("open-lead-popup"))}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-8 py-3 cursor-pointer rounded-md text-md tracking-[0.2em] uppercase font-medium overflow-hidden group backdrop-blur-md"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(222,199,154,0.6)",
              }}
            >
              {/* Hover Gradient Fill */}
              <span className="absolute inset-0 bg-gradient-to-b from-[#FACB65] to-[#D8AE51] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />

              {/* Text */}
              <span className="relative z-10 text-white group-hover:text-[#15243D] transition-colors duration-500">
                I am Interested
              </span>
            </motion.button>

            {/* Secondary Button */}
            <a
              href="#overview"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("overview");
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
              className="relative px-8 py-3 rounded-md text-md tracking-[0.2em] uppercase font-medium overflow-hidden group backdrop-blur-md"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              {/* Hover Fill */}
              <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />

              {/* Text */}
              <span className="relative z-10 text-white group-hover:text-[#15243D] transition-colors duration-500">
                Get More Details
              </span>
            </a>
          </motion.div>

          {/* Slide Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.6 }}
            className="flex gap-3 items-center"
          >
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-[2px] transition-all duration-500 rounded-full ${index === currentIndex ? "w-12 bg-[#DEC79A]" : "w-6 bg-white/20"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>
      </main>

      {/* Decorative side text or element for premium feel */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:block">
        <div className="flex flex-col items-center gap-4">
          <div className="w-[1px] h-20 bg-[#DEC79A]/40" />
          <span className="text-[#DEC79A] text-[10px] tracking-[0.5em] uppercase vertical-text -rotate-180" style={{ writingMode: 'vertical-rl' }}>
            Luxury Living
          </span>
          <div className="w-[1px] h-20 bg-[#DEC79A]/40" />
        </div>
      </div>
    </div>
  );
}

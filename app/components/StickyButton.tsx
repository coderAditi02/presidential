"use client";
import { motion } from "framer-motion";

export default function StickyButton() {
  return (
    <motion.button
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
      onClick={() => window.dispatchEvent(new CustomEvent("open-lead-popup"))}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[90] bg-gradient-to-b from-[#FACB65] to-[#D8AE51] text-[#15243D] px-2 md:px-3 py-4 md:py-2 rounded-l-2xl shadow-[-5px_0_30px_rgba(0,0,0,0.3)] hover:bg-[#c9b085] transition-all duration-300 group cursor-pointer border-l border-y border-white/20"
      style={{ writingMode: 'vertical-rl' }}
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase rotate-180 whitespace-nowrap ml-1 md:ml-1.5">
          I am Interested
        </span>
      </div>

      {/* Glossy hover effect */}
    </motion.button>
  );
}

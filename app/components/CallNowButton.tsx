"use client";

import { Phone } from "lucide-react";

const CallNowButton = () => {
    return (
        <a
            href="tel:+919975211184"
            className="fixed bottom-[80px] left-6 sm:bottom-[106px] sm:left-10 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#15243D] text-[#FACB65] rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(21,36,61,0.4)] z-[80] transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_16px_rgba(21,36,61,0.6)] border border-[#DEC79A]/30 outline-none"
            aria-label="Call Now"
        >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
        </a>
    );
};

export default CallNowButton;

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";

interface CtaButtonProps {
    text: string;
    onClick?: () => void;
    href?: string;
    variant?: "primary" | "secondary" | "outline";
    icon?: "none" | "arrow" | "download";
    className?: string;
    fullWidth?: boolean;
}

export default function CtaButton({
    text,
    onClick,
    href,
    variant = "primary",
    icon = "none",
    className = "",
    fullWidth = false
}: CtaButtonProps) {
    const baseStyles = "inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-xl cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 group relative overflow-hidden";

    const variantStyles = {
        primary: "bg-[#DEC79A] text-[#15243D] hover:bg-[#c9b085]",
        secondary: "bg-[#15243D] text-[#DEC79A] hover:bg-[#1a2d4a]",
        outline: "border-2 border-[#DEC79A]/50 text-[#DEC79A] hover:bg-[#DEC79A] hover:text-[#15243D] backdrop-blur-sm"
    };

    const widthStyle = fullWidth ? "w-full" : "w-fit";

    const content = (
        <>
            <span className="relative z-10">{text}</span>
            {icon === "arrow" && (
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            )}
            {icon === "download" && (
                <Download className="w-4 h-4 relative z-10" />
            )}
            
            {/* Hover Shine Effect for Primary and Secondary */}
            {(variant === "primary" || variant === "secondary") && (
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            )}
        </>
    );

    if (href) {
        return (
            <Link 
                href={href} 
                className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`}
                onClick={onClick}
            >
                {content}
            </Link>
        );
    }

    return (
        <motion.button
            onClick={onClick}
            whileTap={{ scale: 0.95 }}
            className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`}
        >
            {content}
        </motion.button>
    );
}

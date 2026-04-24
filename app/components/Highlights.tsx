"use client";

import { useEffect, useRef, useState } from "react";

interface HighlightCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const highlights: HighlightCard[] = [
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      </svg>
    ),
    title: "Prime Location",
    description: "Conveniently on old Mumbai–Pune highway with easy access to PCMC & PMC, surrounded by nature.",
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Luxury Amenities",
    description: "Clubhouse, swimming pool, meditation area and many more for a lavish lifestyle experience.",
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Top-Notch Facilities",
    description: "Proximity to Pimpri Chinchwad University and Pawa Multispeciality Hospital nearby.",
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Spacious Plots",
    description: "A range of plot sizes with ample space and full flexibility to design your dream home.",
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "Quality Infrastructure",
    description: "Well-planned infrastructure and round-the-clock security ensure a truly safe environment.",
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Legal Assurance",
    description: "PMRDA approval, individual sale deeds & RERA registration guarantee full transparency.",
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: "Flexible Payment",
    description: "Pre-launch rates and flexible payment schedules make buying simple and convenient.",
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Exclusive Community",
    description: "Limited plots ensure an intimate and close-knit neighborhood atmosphere for all.",
  },
];

function Cell({
  highlight,
  index,
  visible,
  isRightCol,
}: {
  highlight: HighlightCard;
  index: number;
  visible: boolean;
  isRightCol: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-8 md:p-10 border-t border-[#DEC79A]/10 transition-colors duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.55s ease ${index * 90}ms, transform 0.55s ease ${index * 90}ms, background 0.3s ease`,
        background: hovered ? "rgba(222,199,154,0.04)" : "transparent",
        borderRight: isRightCol ? "none" : "1px solid rgba(222,199,154,0.1)",
      }}
    >
      {/* Gold sweep bar on hover */}
      <div
        className="absolute top-0 left-0 h-[2px] transition-all duration-500 ease-out"
        style={{
          width: hovered ? "100%" : "0%",
          background: "linear-gradient(90deg, #DEC79A, transparent)",
        }}
      />

      {/* Number + Icon */}
      <div className="flex items-center justify-between mb-5">
        <span
          className="text-[52px] leading-none font-light select-none transition-colors duration-300"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: hovered ? "rgba(222,199,154,0.3)" : "rgba(222,199,154,0.1)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="w-11 h-11 rounded-full border border-[#DEC79A]/30 flex items-center justify-center text-[#DEC79A] flex-shrink-0">
          {highlight.icon}
        </div>
      </div>

      {/* Title */}
      <h3
        className="text-[#f0e6d0] text-[19px] md:text-[21px] font-normal mb-3 leading-snug"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {highlight.title}
      </h3>

      {/* Description */}
      <p className="text-[#8a9bb5] text-[13px] md:text-[14px] leading-relaxed font-light">
        {highlight.description}
      </p>
    </div>
  );
}

export default function Highlights() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cellsVisible, setCellsVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o1 = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.3 }
    );
    const o2 = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setCellsVisible(true); },
      { threshold: 0.05 }
    );
    if (headerRef.current) o1.observe(headerRef.current);
    if (gridRef.current) o2.observe(gridRef.current);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  return (
    <>
      {/*
        Add this to your app/layout.tsx <head> for the font:
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
      */}

      <section
        id="highlights"
        className="relative bg-[#0c1a2e] py-20 md:py-16 overflow-hidden"
      >
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          {/* Giant ghost background word */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap leading-none z-0"
            style={{
              top: "280px",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(80px, 18vw, 220px)",
              fontWeight: 500,
              color: "rgba(209, 186, 139, 0.03)",
            }}
          >
            HIGHLIGHTS
          </div>

          {/* Header */}
          <div
            ref={headerRef}
            className="flex text-center items-center justify-center mb-16"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >

            <h2 className="text-3xl md:text-4xl lg:text-5xl text-center font-normal text-[#FACB65] tracking-tight">
              Project Highlights
            </h2>

            {/* <div
              aria-hidden="true"
              className="hidden md:block leading-none self-end pb-1 select-none"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "100px",
                fontWeight: 400,
                color: "rgba(222,199,154,0.1)",
              }}
            >
              08
            </div> */}
          </div>

          {/* Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-4"
          >
            {highlights.map((h, i) => (
              <Cell
                key={h.title}
                highlight={h}
                index={i}
                visible={cellsVisible}
                isRightCol={i % 2 === 1}
              />
            ))}
          </div>

          {/* Bottom rule */}
          <div className="border-t border-[#DEC79A]/10" />
        </div>
      </section>
    </>
  );
}
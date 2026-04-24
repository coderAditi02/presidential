"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const locations = [
  {
    title: "Education",
    description: "",
    items: ["0 min Pimpri-Chinchwad University",
      "7 min Kendriya Vidyalaya",
      "10 min DY Patil University",
      "10 min St. Ann High School",
      "11 min Eden International School",
      "12 min Podar International School",
      "13 min Hutchings High School",],
    buttonColor: "bg-gradient-to-b from-[#FACB65] to-[#D8AE51] text-[#15243D]",
    image: "/about/education.jpeg",
  },
  {
    title: "Key Locations",
    description: "",
    items: [
      "0 min from Old Mumbai Pune Highway",
      "0 min from Pimpri Chinchwad University bus stop",
      "7 min from Talegaon",
      "12 min from Dehu Phata",
      "20 min from Wakad",
      "20 min from Lonavala",
    ],
    buttonColor: "bg-gradient-to-b from-[#FACB65] to-[#D8AE51] text-[#15243D]",
    image: "/about/location.jpeg",
  },
  {
    title: "Hospitals",
    description: "",
    items: ["4 min Kate Hospital",
      "15 min Pioneer Hospital",
      "15 min Bade Accidental and Multi-speciality hospital",
      "16 min Pawana Multi-speciality Hospital",],
    buttonColor: "bg-gradient-to-b from-[#FACB65] to-[#D8AE51] text-[#15243D]",
    image: "/about/hospital.jpeg",
  },
];

function LocationCard({
  title,
  description,
  items = [],
  buttonColor,
  image,
  index,
}: {
  title: string;
  description: string;
  items?: string[];
  buttonColor: string;
  image: string;
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200);
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-[32px] overflow-hidden bg-[#1D2B45] border border-white/5 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
    >
      <div className="flex flex-col md:flex-row min-h-[350px] md:min-h-[350px]">
        {/* Content Side */}
        <div className="w-full md:w-2/5 p-8 md:p-12 lg:p-8 flex flex-col justify-center order-2 md:order-1">
          <h3 className="text-3xl md:text-4xl lg:text-2xl font-semibold text-white tracking-tight">
            {title}
          </h3>
          <p className="text-white/70 text-base md:text-base leading-relaxed mb-2 max-w-xl">
            {description}
          </p>

          {/* Location List - Horizontal Grid if populated */}
          {items && items.length > 0 && (
            <ul className="flex flex-col gap-3 md:gap-4 mb-8 text-left">
              {items.map((item, i) => (
                <li key={i} className="flex items-start md:items-center gap-2 text-white/50 text-sm md:text-md">
                  <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-gradient-to-b from-[#FACB65] to-[#D8AE51] mt-1.5 md:mt-0" />
                  <span className="leading-relaxed md:leading-normal">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click from firing
              window.dispatchEvent(new CustomEvent("open-lead-popup"));
            }}
            className={`${buttonColor} px-6 py-3 rounded-xl cursor-pointer font-bold text-sm transition-all duration-500 flex items-center gap-3 shadow-lg hover:shadow-2xl hover:-translate-y-1 w-fit group/btn relative overflow-hidden`}
          >
            <span className="absolute inset-0 bg-[#15243D] origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500" />
            <span className="relative z-10 group-hover/btn:text-white border-white transition-colors duration-500 flex items-center gap-3">
              Explore More
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </span>
          </button>
        </div>

        {/* Image Side - Horizontal/Landscape focus */}
        <div className="w-full md:w-3/5 h-[250px] md:h-auto order-1 md:order-2 overflow-hidden">
          <div className="relative w-full h-full">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Overlay gradients for depth */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-[#1D2B45] via-transparent to-transparent opacity-40 md:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D2B45]/50 to-transparent md:hidden" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Location() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(1); // Start with middle card
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleTabClick = (index: number, smooth = true) => {
    setActiveTab(index);
    const card = cardRefs.current[index];
    const container = scrollContainerRef.current;
    if (card && container) {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const containerCenter = container.clientWidth / 2;
      container.scrollTo({
        left: cardCenter - containerCenter,
        behavior: smooth ? "smooth" : "instant",
      });
    }
  };

  // Center middle card on load without scrolling the page
  useEffect(() => {
    if (!isLoaded) {
      const timer = setTimeout(() => {
        handleTabClick(1, false);
        setIsLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle scroll to update active tab
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const centerScroll = scrollLeft + containerWidth / 2;

      cardRefs.current.forEach((card, index) => {
        if (card) {
          const cardLeft = card.offsetLeft;
          const cardCenter = cardLeft + card.clientWidth / 2;
          if (Math.abs(centerScroll - cardCenter) < card.clientWidth / 2) {
            setActiveTab(index);
          }
        }
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="location"
      className="py-20 md:py-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-8 md:mb-12 transition-all duration-1000 ease-out ${headerVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#15243D] tracking-tight">
            A Location That&apos;s Already A Landmark{" "}
          </h2>
        </div>

        {/* Tab Buttons */}
        <div
          className={`flex justify-center gap-2 md:gap-6 transition-all duration-1000 delay-300 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          {locations.map((location, index) => {
            const isActive = activeTab === index;

            return (
              <button
                key={location.title}
                onClick={() => handleTabClick(index)}
                className={`relative inline-flex items-center justify-center px-8 py-3 rounded-lg text-xs md:text-sm font-medium uppercase tracking-[0.2em] transition-all duration-500 shadow-xl cursor-pointer overflow-hidden
    ${isActive
                    ? "bg-[#15243D] text-white scale-105"
                    : "bg-gradient-to-b from-[#FACB65] to-[#EAC442] text-[#15243D]"
                  }`}
              >
                <span className="relative z-10">
                  {location.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-8 mt-16"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {locations.map((location, index) => {
            // Dynamic positioning: centered card moves up, others stay lower
            const isCentered = activeTab === index;
            const verticalOffset = isCentered ? "-translate-y-8" : "translate-y-8";
            return (
              <div
                key={location.title}
                ref={(el) => { cardRefs.current[index] = el; }}
                onClick={() => handleTabClick(index)}
                className={`snap-center shrink-0 w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] cursor-pointer transition-all duration-700 ease-out ${verticalOffset}`}
              >
                <LocationCard
                  {...location}
                  index={index}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

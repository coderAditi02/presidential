"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const amenities = [
    {
        id: 1,
        title: "Sand Pit",
        description: "Outdoor fitness area surrounded by landscape.",
        image: "/amenities/10.jpg",
    },
    {
        id: 2,
        title: "Swimming Pool",
        description: "State-of-the-art cardiovascular and strength training equipment.",
        image: "/amenities/Private Pools.jpg",
    },
    {
        id: 3,
        title: "Yoga Deck",
        description: "Peaceful environment for mental and physical wellness.",
        image: "/amenities/2.jpg",
    },
    {
        id: 4,
        title: "Garden GYM",
        description: "Dedicated parking and paths for cycling enthusiasts.",
        image: "/amenities/garden_gym.jpeg",
    },
    {
        id: 5,
        title: "Barbeque Area",
        description: "Scenic pathways for your morning and evening routines.",
        image: "/amenities/4.jpg",
    },
    {
        id: 6,
        title: "Net Cricket",
        description: "Organic herb garden for a sustainable lifestyle.",
        image: "/amenities/5.jpg",
    },
    {
        id: 7,
        title: "Water Fountain",
        description: "Elegant fountains and water features for relaxation.",
        image: "/amenities/6.jpg",
    },
    {
        id: 8,
        title: "Gazebo Covered Seating",
        description: "Elegant outdoor seating for relaxation and social gatherings.",
        image: "/amenities/7.jpg",
    },
    {
        id: 9,
        title: "Indoor Games",
        description: "Engaging indoor activities including billiards and board games.",
        image: "/amenities/9.jpg",
    }, {
        id: 10,
        title: "Multi Purpose Hall",
        description: "Versatile space for community events, celebrations, and gatherings.",
        image: "/amenities/8.jpg",
    },
];

const AUTO_PLAY_DURATION = 3; // seconds

export default function Aminities() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    // Auto-play interval
    useEffect(() => {
        const startTime = Date.now();
        const interval = setInterval(() => {
            const currentProgress = ((Date.now() - startTime) / 1000 / AUTO_PLAY_DURATION) * 100;

            if (currentProgress >= 100) {
                setActiveIndex((prev) => (prev + 1) % amenities.length);
                setProgress(0);
            } else {
                setProgress(currentProgress);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [activeIndex]);

    const handleItemClick = (index: number) => {
        setActiveIndex(index);
        setProgress(0);
    };

    return (
        <section id="amenities" className="bg-gradient-to-r from-[#CBDFE8] to-[#DEDED6] py-10 sm:py-14 lg:py-16 overflow-visible">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
                <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-20 items-start">

                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
                        {/* Heading & Subtitle */}
                        <div className="space-y-3 sm:space-y-5">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-normal text-[#15243D] leading-[1.1]"
                            >
                                Professional <br />
                                Amenities
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-lg"
                            >
                                Thoughtfully designed health and wellness amenities that support daily fitness, mental peace, relaxation, and mindful living.
                            </motion.p>
                        </div>

                        {/* Image — visible only on mobile & tablet (below heading, above grid) */}
                        <div className="block lg:hidden">
                            <div className="relative h-[220px] sm:h-[300px] md:h-[360px] overflow-hidden rounded-2xl shadow-xl">
                                <AnimatePresence>
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
                                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                                        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                                        className="absolute inset-0"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                                        <img
                                            src={amenities[activeIndex].image}
                                            alt={amenities[activeIndex].title}
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Active amenity label on mobile image */}
                                        <div className="absolute bottom-4 left-4 z-20">
                                            <span className="bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full border border-white/30">
                                                {amenities[activeIndex].title}
                                            </span>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Amenities Grid */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                            {amenities.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.07 }}
                                    onClick={() => handleItemClick(index)}
                                    className={`relative group cursor-pointer p-2.5 sm:p-3 md:p-4 rounded-xl transition-all duration-500 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-2 ${activeIndex === index
                                            ? "border-[#15243D]/10 -translate-y-0.5 shadow-md"
                                            : "border-transparent hover:border-gray-100"
                                        }`}
                                >
                                    {/* Progress Line */}
                                    {activeIndex === index && (
                                        <motion.div
                                            className="absolute top-0 left-0 h-[3px] bg-[#15243D] rounded-t-xl z-10"
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ ease: "linear", duration: 0 }}
                                        />
                                    )}

                                    <div className="flex items-center gap-2.5 sm:gap-3">
                                        <div className={`w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full flex items-center justify-center transition-all duration-500 ${activeIndex === index
                                                ? "bg-[#15243D] text-white scale-105 shadow-sm"
                                                : "bg-[#f8f6f2] text-gray-400 group-hover:bg-[#15243D]/5 group-hover:text-[#15243D]"
                                            }`}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span className={`text-xs sm:text-sm md:text-base font-medium transition-colors duration-300 leading-tight ${activeIndex === index ? "text-[#15243D]" : "text-[#15243D]/70"
                                            }`}>
                                            {item.title}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content — sticky, desktop only */}
                    <div className="hidden lg:block w-full lg:w-1/2 sticky top-24 self-start">
                        <div className="relative h-[420px] xl:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
                            <AnimatePresence>
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                    transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                                    className="absolute inset-0"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                                    <img
                                        src={amenities[activeIndex].image}
                                        alt={amenities[activeIndex].title}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

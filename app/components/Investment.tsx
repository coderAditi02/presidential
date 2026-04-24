"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
    { src: "/investment/1.jpg", alt: "Architecture 1" },
    { src: "/investment/2.jpg", alt: "Architecture 2" },
    { src: "/investment/3.jpg", alt: "Architecture 3" },
    // { src: "https://images.unsplash.com/photo-1512915922686-57c11f9ad6b3?auto=format&fit=crop&q=80&w=600", alt: "Architecture 4" },
    { src: "/investment/4.jpg", alt: "Architecture 1" },
    { src: "/investment/5.jpg", alt: "Architecture 5" },
    { src: "/investment/6.jpg", alt: "Architecture 6" },
    { src: "/investment/7.jpg", alt: "Architecture 7" },
    { src: "/investment/8.jpg", alt: "Architecture 8" },
    { src: "/investment/9.jpg", alt: "Architecture 9" },
    { src: "/investment/10.jpg", alt: "Architecture 10" },

];

function ScrollingColumn({ columnImages, direction = "up", speed = 20 }: { columnImages: typeof images, direction?: "up" | "down", speed?: number }) {
    const duplicatedImages = [...columnImages, ...columnImages];

    return (
        <div className="relative h-full overflow-hidden">
            <motion.div
                animate={{
                    y: direction === "up" ? [0, -1000] : [-1000, 0],
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="space-y-4"
            >
                {duplicatedImages.map((img, i) => (
                    <div key={i} className={`relative rounded-xl overflow-hidden shadow-lg ${i % 2 === 0 ? "aspect-[3/4]" : "aspect-[3/5]"}`}>
                        <Image src={img.src} alt={img.alt} fill className="object-cover" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default function Investment() {
    return (
        <section id="investment" className="py-16 md:py-12 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Side: Auto-Scrolling Image Grid */}
                    <div className="w-full lg:w-1/2 relative">
                        {/* Dark blue container background matching reference */}
                        <div className="absolute inset-x-0 top-0 bottom-0 -m-4  rounded-3xl" />

                        <div className="relative z-10 grid grid-cols-3 gap-4 p-6 h-[450px] md:h-[550px] overflow-hidden mask-fade-edges">
                            <style jsx>{`
                                .mask-fade-edges {
                                    mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
                                }
                            `}</style>

                            <ScrollingColumn columnImages={[images[0], images[1], images[0], images[1]]} direction="up" speed={15} />
                            <ScrollingColumn columnImages={[images[2], images[3], images[2], images[3]]} direction="down" speed={18} />
                            <ScrollingColumn columnImages={[images[4], images[5], images[4], images[5]]} direction="up" speed={12} />
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2
                                className="text-4xl md:text-5xl lg:text-5xl font-normal text-[#15243D] leading-tight mb-2"
                                style={{ fontFamily: "'Times New Roman', Times, serif" }}
                            >
                                Great Investment<br />
                                <span className="text-[#FACB65] font-normal">Greater Advantage</span>
                            </h2>
                            {/* <p className="text-gray-500 text-sm italic tracking-widest uppercase ">Investment Opportunity</p> */}
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-gray-600 text-sm md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-light"
                        >
                            Presidential Park is a 10-acre gated community project offering an Phase 1 Jambhul - 1.82 FSI.
                            Being the largest NA plot community in the vicinity, it is the hottest investment opportunity
                            close to the city!
                        </motion.p>

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

                </div>
            </div>
        </section>
    );
}

"use client";

import React from 'react';
import { motion } from "framer-motion";

const MasterPlan = () => {
    return (
        <section id="master-plan" className="relative py-20 lg:py-24 bg-[#0C1421] overflow-hidden">
            {/* Background Image with Fixed/Scroll containment */}
            <div
                className="absolute inset-0 z-0 opacity-50"
                style={{
                    backgroundImage: 'url("/master/masterback.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Dual-directional gradient to ensure smooth transition at top and bottom */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0C1421] via-transparent to-[#0C1421]" />
            </div>

            {/* Side Decorative Line */}
            <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#DEC79A]/40 to-transparent hidden lg:block z-10" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center justify-center gap-4 mb-4"
                    >
                        <span className="text-[#DEC79A] text-lg">✦</span>
                        <h2 className="text-[#DEC79A] text-xs md:text-sm tracking-[0.4em] font-light uppercase">
                            MASTER PLAN
                        </h2>
                        <span className="text-[#DEC79A] text-lg">✦</span>
                    </motion.div>

                    <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-[#DEC79A] text-4xl md:text-5xl lg:text-6xl font-normal leading-tight"
                        style={{ fontFamily: "'Times New Roman', Times, serif" }}
                    >
                        Masterfully Designed Masterplan
                    </motion.h3>
                </div>

                {/* Main Masterplan Image Container */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className="relative max-w-6xl mx-auto flex justify-center group"
                >
                    <div className="relative rounded-lg overflow-hidden border border-white/10 bg-[#15243D]/30 backdrop-blur-sm shadow-2xl">
                        <motion.img
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.8 }}
                            src="/master/masterplan.jpeg"
                            alt="Presidential Park Master Plan"
                            className="w-full h-auto object-cover max-h-[85vh]"
                        />
                    </div>
                </motion.div>

                {/* Mobile Hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-12 flex justify-center lg:hidden"
                >
                    <p className="text-[#DEC79A]/50 text-[10px] uppercase tracking-widest animate-pulse">Pinch to explore details</p>
                </motion.div>
            </div>
        </section>
    );
};

export default MasterPlan;

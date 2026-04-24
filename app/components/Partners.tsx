"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Partners() {
  return (
    <section className="relative bg-[#10192D] py-16 overflow-hidden">
      
      {/* Background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'url("/contact/contact.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay",
        }}
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#15243D] via-transparent to-[#15243D] z-10" />

      <div className="max-w-6xl mx-auto px-4 relative z-20">
        
        {/* MAIN ROW */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          
          {/* Project By */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
          >
            <p className="text-[#FACB65] text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-3">
              Project By
            </p>

            <div className="leading-tight">
              <h2 className="text-white text-3xl md:text-4xl font-black uppercase">
                Oneness
              </h2>
              <h2 className="text-white text-3xl md:text-4xl font-black uppercase">
                Realtors
              </h2>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden md:block w-[1px] h-24 bg-[#FACB65] origin-center"
          />

          {/* Mobile Divider */}
          <div className="md:hidden w-16 h-[1px] bg-[#FACB65]" />

          {/* Strategic Partner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <p className="text-[#FACB65] text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-3">
              Strategic Partner
            </p>

            <Image
              src="/images/Falcon-log.png"
              alt="Falcon Realty"
              width={110}
              height={110}
              className="object-contain"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
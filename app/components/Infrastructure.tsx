"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const infraProjects = [
  {
    title: "PUNE RING ROAD",
    image: "/infrastructure/puneringroad.jpeg",
  },
  {
    title: "MUMBAI-PUNE EXPRESSWAY",
    image: "/infrastructure/2.jpg",
  },
  {
    title: "METRO EXTENSION",
    image: "/infrastructure/punemetro.jpeg",
  },
  {
    title: "PROPOSED AIRPORTS",
    image: "/infrastructure/airport.jpeg",
  },
  {
    title: "TALEGAON MIDC EXPANSION",
    image: "/infrastructure/5.jpg",
  },

];

export default function Infrastructure() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section id="infrastructure" className="bg-[#15243D] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-[#FACB65] text-center  text-2xl md:text-5xl mb-8 tracking-wider">
            Upcoming Infrastructure
          </h2>
          <p className="text-white/80 text-sm md:text-lg leading-relaxed  text-center">
            Vadgaon Maval, located near Talegaon, is poised for growth with several upcoming infrastructure projects  <br />
            that will enhance its connectivity, livability, and real estate potential.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {infraProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="flex flex-col group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="mt-4 text-center text-[#FACB65] text-[10px] md:text-sm text-sm md:text-lg leading-relaxedfont-bold tracking-widest uppercase leading-tight">
                {project.title}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

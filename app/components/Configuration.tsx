"use client";

import { motion } from "framer-motion";

const configurations = [
  {
    size: "1,500 - 2,000",
    unit: "Sq. Ft.",
    label: "Executive Plots",
    description: "Ideal for cozy weekend homes and compact luxury villas."
  },
  {
    size: "2,500 - 3,500",
    unit: "Sq. Ft.",
    label: "Premium Plots",
    description: "Generous space for grand residences with private gardens."
  },
  {
    size: "4,000+",
    unit: "Sq. Ft.",
    label: "Royal Estates",
    description: "Palatial plot sizes for ultimate privacy and sprawling estates."
  }
];

export default function Configuration() {
  return (
    <section id="configuration" className="py-24 bg-[#F8F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-px w-8 bg-[#DEC79A]" />
            <span className="text-[#DEC79A] text-xs font-bold tracking-[0.3em] uppercase">Plot Options</span>
            <div className="h-px w-8 bg-[#DEC79A]" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[#15243D] text-4xl md:text-5xl lg:text-6xl font-normal"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            Project Configuration
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {configurations.map((config, index) => (
            <motion.div
              key={config.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center text-center group hover:shadow-[0_30px_70px_rgba(0,0,0,0.1)] transition-all duration-500"
            >
              <span className="text-[#DEC79A] text-xs font-bold tracking-[0.2em] uppercase mb-6">{config.label}</span>
              
              <div className="mb-6 flex flex-col">
                <span className="text-5xl md:text-6xl font-serif text-[#15243D] mb-2">{config.size}</span>
                <span className="text-[#DEC79A] text-sm font-medium tracking-widest">{config.unit}</span>
              </div>
              
              <div className="w-12 h-px bg-gray-200 mb-6 group-hover:w-20 group-hover:bg-[#DEC79A] transition-all duration-500" />
              
              <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                {config.description}
              </p>
              
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-lead-popup"))}
                className="mt-10 text-[#15243D] text-xs font-bold tracking-widest uppercase border-b-2 border-[#DEC79A] pb-1 hover:text-[#DEC79A] transition-colors"
              >
                Inquire Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

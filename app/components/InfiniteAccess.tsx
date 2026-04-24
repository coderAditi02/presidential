"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Bus, GraduationCap, Fuel, TrainFront, Hospital,
  MapPin, Factory, Route, Shield, Trophy,
  Mountain, Building2, Map
} from "lucide-react";
import Image from "next/image";

const accessItems = [
  { icon: Bus, title: "Bus Stop", distance: "0.0 Km", time: "0 Min" },
  { icon: GraduationCap, title: "Pimpri Chinchwad University", distance: "0.1 Km", time: "1 Min" },
  { icon: Fuel, title: "Petrol Pump", distance: "0.1 Km", time: "1 Min" },
  { icon: TrainFront, title: "Kanhe Railway Station", distance: "2.0 Km", time: "4 Min" },
  { icon: Hospital, title: "Gramin Hospital", distance: "2.0 Km", time: "4 Min" },
  { icon: Map, title: "Ring Road", distance: "6.0 Km", time: "10 Mins" },
  { icon: Factory, title: "Talegaon MIDC", distance: "6.0 Km", time: "10 Min" },
  { icon: Route, title: "Pune Mumbai Express Way", distance: "7.0 Km", time: "12 Min" },
  { icon: Shield, title: "Police Station", distance: "8.0 Km", time: "14 Min" },
  { icon: GraduationCap, title: "D.Y. Patil", distance: "9.0 Km", time: "16 Min" },
  { icon: MapPin, title: "Dehu Phata", distance: "13.0 Km", time: "18 Min" },
  { icon: Trophy, title: "Maharashtra Cricket Stadium", distance: "15.0 Km", time: "20 Min" },
  { icon: Factory, title: "Chakan MIDC", distance: "18.0 Km", time: "24 Min" },
  { icon: Mountain, title: "Lonavala", distance: "20.0 Km", time: "26 Min" },
  { icon: Building2, title: "Talawade IT Park", distance: "20.0 Km", time: "26 Min" },
];

export default function InfiniteAccess() {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleItems = isExpanded ? accessItems : accessItems.slice(0, 6);

  return (
    <section id="connectivity" className="bg-[#15243D] py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">

          {/* Top Content */}
          <div className="w-full max-w-4xl text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-[#DEC79A] text-3xl md:text-5xl f mb-6 tracking-tight">
                Infinite Access
              </h2>
              <p className="text-white/70 text-sm md:text-lg leading-relaxed">
                Presidential Park offers seamless connectivity, making every destination easily accessible and every journey effortless.
              </p>
            </motion.div>

            {/* Access Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-6">
              {visibleItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#15243D] border border-[#DEC79A]/20 flex items-center justify-center mb-3 transition-all duration-300 group-hover:bg-[#DEC79A] group-hover:border-transparent">
                    <item.icon size={22} className="text-[#DEC79A] group-hover:text-[#15243D] transition-colors" />
                  </div>
                  <h4 className="text-white  font-medium mb-1 tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-[#DEC79A]/60   font-light">
                    {item.distance} <span className="mx-1 opacity-40">|</span> {item.time}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Toggle Button */}
            {accessItems.length > 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 flex justify-center"
              >
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="relative px-6 py-3 bg-[#15243D] text-[#DEC79A] text-xs font-bold tracking-widest rounded-lg border border-[#DEC79A]/30 transition-all duration-300 shadow-xl cursor-pointer group overflow-hidden"
                >
                  <span className="absolute inset-0 bg-[#DEC79A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <span className="relative z-10 group-hover:text-[#15243D] transition-colors duration-500">
                    {isExpanded ? "SHOW LESS" : "SHOW ALL"}
                  </span>
                </button>
              </motion.div>
            )}
          </div>

          {/* Bottom Image - Expanded width */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl h-[400px] md:h-[600px] relative rounded-3xl overflow-hidden bg-[#15243D]/30 border border-[#DEC79A]/10 shadow-2xl"
          >
            <div className="absolute inset-0">
              <Image
                src="/infiniteaccess/map.jpeg"
                alt="Infinite Access"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-110"
                priority
              />
              {/* Overlay Gradient for better integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A111F]/60 via-transparent to-transparent" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

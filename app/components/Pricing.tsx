"use client";

import { useEffect, useRef, useState } from "react";

export default function Pricing() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-16 bg-white"
    >
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-5xl  text-[#15243D]  tracking-tight mb-6 leading-snug">
            Book Your N.A. Plot Today & Secure Your Future!
          </h2>
          <div className="inline-block bg-[#15243D] text-[#FACB65] px-8 py-3 rounded-xl font-bold text-lg md:text-xl tracking-wide shadow-lg border border-[#DEC79A]/30">
            VILLA PLOTS STARTING AT ₹ 45 LACS* ONWARDS
          </div>
        </div>

        {/* Payment Plan */}
        <div className="">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#FACB65]"></div>
            <h3 className="text-xl md:text-2xl font-bold text-[#15243D] tracking-[0.2em] uppercase">Payment Plan</h3>
            <div className="w-2 h-2 rounded-full bg-[#FACB65]"></div>
          </div>

          <div className="overflow-x-auto rounded-xl shadow-lg border border-[#15243D]/10 bg-white">
            <table className="w-full text-center border-collapse min-w-[700px]">
              <thead>
                <tr className="text-[#FACB65] text-sm md:text-lg ">
                  <th className="py-4 px-4 font-semibold bg-[#15243D] border-r border-[#FACB65]/20">PLOT TYPE</th>
                  <th className="py-4 px-4 font-semibold bg-[#15243D] border-r border-[#FACB65]/20">AREA</th>

                  <th className="py-4 px-4 font-semibold bg-[#15243D]">TOTAL PLOT COST</th>
                </tr>
              </thead>
              <tbody className="text-[#15243D] font-bold text-base md:text-lg">
                <tr className="bg-[#F8F9FA] border-b border-[#15243D]/10">
                  <td className="py-5 px-4 border-r border-[#15243D]/10 uppercase">Royal<br />Garden</td>
                  <td className="py-5 px-4 border-r border-[#15243D]/10">1245 Sq.Ft</td>
                  <td className="py-5 px-4">49.99 LACS*</td>
                </tr>
                <tr className="bg-[#F8F9FA]">
                  <td className="py-5 px-4 border-r border-[#15243D]/10 uppercase">Elite Acres</td>
                  <td className="py-5 px-4 border-r border-[#15243D]/10">1614 Sq.Ft</td>
                  <td className="py-5 px-4 border-r border-[#15243D]/10">53.99 LACS*</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}

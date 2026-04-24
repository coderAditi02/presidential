"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Search } from "lucide-react";
import { countries, getEmojiFlag } from "../constants/countries";
import Image from "next/image";

export default function LeadPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    budget: "",
    message: ""
  });
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Default to India
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Show popup after 1 minute
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 60000); // 60 seconds = 1 minute

    // Listen for custom trigger events
    const handleOpenPopup = () => setIsVisible(true);
    window.addEventListener("open-lead-popup", handleOpenPopup);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("open-lead-popup", handleOpenPopup);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "number") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.number.length === 10 && formData.name && consent) {
      setSubmitted(true);
      setTimeout(() => handleClose(), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Blur/Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0A121E]/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[680px] max-h-[84vh] overflow-y-auto overflow-x-hidden bg-white border border-gray-200 shadow-[0_0_50px_rgba(0,0,0,0.1)] rounded-[24px] flex flex-col no-scrollbar"
          >
            <style>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>

            {/* Elegant Background Accents */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-60" />
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-gray-300 rounded-full blur-[120px] opacity-15 pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gray-300 rounded-full blur-[120px] opacity-10 pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center p-8 md:p-10 h-full">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute cursor-pointer top-5 right-5 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X size={20} strokeWidth={1.5} />
              </button>

              {/* Logo & Header */}
              <div className="mb-4 flex flex-col items-center text-center w-full">
                <div className="w-28 h-28 flex items-center justify-center">
                  <Image src="/images/main_logo.png" alt="Logo" width={180} height={180} className="object-contain" />
                </div>
                <h2 className="text-2xl font-serif text-gray-800 mb-2 tracking-wide">Register Your Interest</h2>
                <p className="text-xs text-gray-500 tracking-wider uppercase">Unlock Exclusive Pre-Launch Offers</p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="w-full space-y-3">
                  {/* First Row - Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name Input */}
                    <div className="relative">
                      <label className="block text-[12px] uppercase tracking-[0.2em] text-gray-600 mb-2 ml-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3.5 text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-gray-400 text-sm"
                        placeholder="Enter your name"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                      <label className="block text-[12px] uppercase tracking-[0.2em] text-gray-600 mb-2 ml-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3.5 text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-gray-400 text-sm"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Second Row - Phone and Budget */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Phone Input with Flag and Country Code */}
                    <div className="relative">
                      <label className="block text-[12px] uppercase tracking-[0.2em] text-gray-600 mb-2 ml-1">Phone Number</label>
                      <div className="flex bg-gray-50 border border-gray-300 rounded-xl focus-within:border-blue-500 focus-within:bg-white transition-all overflow-hidden relative">
                        {/* Country Selector */}
                        <div className="relative flex items-center border-r border-gray-300 shrink-0 bg-gray-100">
                          <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-1.5 pl-3 pr-2 py-3.5 text-gray-700 transition-colors hover:text-gray-900 cursor-pointer"
                          >
                            <span className="text-base leading-none">{getEmojiFlag(selectedCountry.code)}</span>
                            <span className="text-sm font-medium text-gray-800">{selectedCountry.dial_code}</span>
                            <ChevronDown size={14} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                          </button>

                          {/* Country Dropdown */}
                          <AnimatePresence>
                            {isDropdownOpen && (
                              <>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="fixed inset-0 z-40"
                                  onClick={() => setIsDropdownOpen(false)}
                                />
                                <motion.div
                                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                  className="absolute left-0 bottom-[calc(100%+8px)] w-[280px] max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-xl shadow-2xl z-50 no-scrollbar"
                                >
                                  <div className="sticky top-0 bg-white p-2 border-b border-gray-200 z-10">
                                    <div className="relative">
                                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                      <input
                                        type="text"
                                        placeholder="Search country..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 pl-9 pr-3 text-xs text-gray-800 outline-none focus:border-blue-500"
                                      />
                                    </div>
                                  </div>
                                  <div className="py-1">
                                    {countries
                                      .filter(c =>
                                        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        c.dial_code.includes(searchTerm)
                                      )
                                      .map((country) => (
                                        <button
                                          key={country.code}
                                          type="button"
                                          onClick={() => {
                                            setSelectedCountry(country);
                                            setIsDropdownOpen(false);
                                            setSearchTerm("");
                                          }}
                                          className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 transition-colors text-left"
                                        >
                                          <div className="flex items-center gap-3">
                                            <span className="text-lg">{getEmojiFlag(country.code)}</span>
                                            <span className="text-sm text-gray-800">{country.name}</span>
                                          </div>
                                          <span className="text-xs text-blue-600 font-medium">{country.dial_code}</span>
                                        </button>
                                      ))}
                                  </div>
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </div>

                        <input
                          type="text"
                          name="number"
                          value={formData.number}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-transparent px-4 py-3.5 text-gray-800 focus:outline-none placeholder:text-gray-400 text-sm"
                          placeholder="Mobile Number"
                        />
                      </div>
                    </div>

                    {/* Budget Dropdown */}
                    <div className="relative">
                      <label className="block text-[12px] uppercase tracking-[0.2em] text-gray-600 mb-2 ml-1">Tentative Budget</label>
                      <div className="relative">
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3.5 text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all appearance-none cursor-pointer text-sm"
                        >
                          <option value="" disabled className="bg-white">Select Budget Range</option>
                          <option value="40-60" className="bg-white">49 - 60 Lacs</option>
                          <option value="60-80" className="bg-white">60 - 80 Lacs</option>
                          <option value="80-1.2" className="bg-white">80 Lacs - 1.2 Cr</option>
                          <option value="1.2+" className="bg-white">Above 1.2 Cr</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>



                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-3 pt-2">
                    <div className="relative flex items-center h-5 mt-0.5">
                      <input
                        id="consent"
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                        className="w-4 h-4 rounded border-gray-300 bg-white text-blue-600 focus:ring-blue-500 focus:ring-offset-white cursor-pointer accent-blue-600"
                      />
                    </div>
                    <label htmlFor="consent" className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-wider cursor-pointer select-none">
                      I authorize Presidential Park and its representatives to contact me via phone, SMS, or email.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <div className="flex justify-center pt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-fit py-3 px-10 rounded-lg bg-[#FACB65] text-[#15243D] text-xs font-bold uppercase tracking-[0.2em] cursor-pointer transition-all duration-300  overflow-hidden relative group"
                      >
                        <span className="absolute inset-0 bg-[#15243D] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        <span className="relative z-10 group-hover:text-white transition-colors duration-500">Submit Inquiry</span>
                      </motion.button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center ">
                  <div className="w-20 h-20 rounded-full border-2 border-blue-600 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.2)] bg-blue-50">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="text-blue-600"
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </motion.div>
                  </div>
                  <h2 className="text-2xl text-gray-800 font-serif mb-3 tracking-wide">Thank You</h2>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-[250px]">
                    Your details have been received. Our luxury property expert will contact you shortly.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
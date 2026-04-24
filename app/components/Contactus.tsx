"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, X, ChevronDown, Search } from "lucide-react";
import { countries, getEmojiFlag } from "../constants/countries";

export default function ContactPage() {
  const plotOptions = [
    { label: "Royal Garden - 1245 Sq.Ft", value: "royal-garden" },
    { label: "Elite Acres - 1614 Sq.Ft", value: "elite-acres" }
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    plotType: "",
    consent: false
  });
  const [isPlotDropdownOpen, setIsPlotDropdownOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Default to India
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only digits
    if (value.length <= 10) {
      setFormData(prev => ({ ...prev, phone: value }));
      if (value.length === 10) setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.email) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    if (!formData.consent) {
      setError("Please provide your consent to contact");
      return;
    }

    // Success
    setError("");
    setShowSuccess(true);
    setFormData({ fullName: "", phone: "", email: "", plotType: "", consent: false });
  };

  return (
    <section id="contactus" className="relative">
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Fixed Background Image Container */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/contact/contact.jpeg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed', // This makes it 'sticky' relative to the viewport
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl mx-auto backdrop-blur-xl bg-black/30 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl"
          >
            <h2 className="text-[#DEC79A] text-3xl sm:text-4xl lg:text-5xl font-semibold mb-8 text-center" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              Get In Touch
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white outline-none focus:border-[#DEC79A]/60 transition-all duration-300"
                />
              </div>

              {/* Phone Input with Flag and Country Code */}
              <div className="relative group flex items-center bg-white/10 border border-white/20 rounded-xl px-4 transition-all duration-300 focus-within:border-[#DEC79A]/60">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-1.5 pr-3 border-r border-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="text-lg leading-none">{getEmojiFlag(selectedCountry.code)}</span>
                    <span className="text-sm font-medium">{selectedCountry.dial_code}</span>
                    <ChevronDown size={12} className={`text-white/40 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
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
                          className="absolute left-0 bottom-full mb-2 w-64 max-h-60 overflow-y-auto bg-[#1a2c4d] border border-white/10 rounded-xl shadow-2xl z-50 no-scrollbar"
                        >
                          <div className="sticky top-0 bg-[#1a2c4d] p-2 border-b border-white/10">
                            <div className="relative">
                              <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-white/40" />
                              <input
                                type="text"
                                placeholder="Search country..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-md py-1.5 pl-8 pr-3 text-xs text-white outline-none focus:border-[#DEC79A]/50"
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
                                  className="w-full flex items-center justify-between px-4 py-2 hover:bg-white/10 transition-colors text-left"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-lg">{getEmojiFlag(country.code)}</span>
                                    <span className="text-sm text-white/80">{country.name}</span>
                                  </div>
                                  <span className="text-xs text-[#DEC79A]/60 font-medium">{country.dial_code}</span>
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
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="w-full py-4 pl-3 bg-transparent text-white placeholder-white outline-none"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-1">
                <input
                  type="email"
                  placeholder="Email ID"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white outline-none focus:border-[#DEC79A]/60 transition-all duration-300"
                />
              </div>

              {/* Plot Type Select */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsPlotDropdownOpen(!isPlotDropdownOpen)}
                  className="w-full flex items-center justify-between px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-left outline-none transition-all duration-300 focus:border-[#DEC79A]/60 cursor-pointer"
                >
                  <span className={formData.plotType ? "text-white" : "text-white"}>
                    {formData.plotType
                      ? plotOptions.find(p => p.value === formData.plotType)?.label
                      : "Select Plot Type"}
                  </span>
                  <ChevronDown size={16} className={`text-white/40 transition-transform duration-300 ${isPlotDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isPlotDropdownOpen && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40"
                        onClick={() => setIsPlotDropdownOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-2 w-full bg-[#1a2c4d] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                      >
                        {plotOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, plotType: option.value });
                              setIsPlotDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-white/10 ${formData.plotType === option.value ? 'bg-white/5' : ''
                              }`}
                          >
                            <span className="text-sm text-white/80">{option.label}</span>
                            {formData.plotType === option.value && (
                              <CheckCircle2 size={14} className="text-[#DEC79A]" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-3 text-left">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="w-5 h-5 rounded border-white/20 bg-white/10 accent-[#DEC79A] cursor-pointer"
                  />
                </div>
                <label htmlFor="consent" className="text-white/60 text-[11px] sm:text-xs leading-tight cursor-pointer hover:text-white/80 transition-colors uppercase tracking-wider mt-1">
                  I consent to sharing my contact details for this enquiry.
                  {/* I authorize Presidential Park and its representatives to contact me via phone, SMS, or WhatsApp regarding my inquiry. */}
                </label>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-400 text-xs font-medium text-center"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

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
            </form>
          </motion.div>
        </div>

        {/* Success Popup Modal */}
        <AnimatePresence>
          {showSuccess && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4 md:px-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSuccess(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-[#15243D] border border-[#DEC79A]/30 p-8 md:p-12 rounded-[2rem] shadow-2xl max-w-md w-full text-center overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-[#DEC79A]/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#DEC79A]/10 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />

                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-[#FACB65]/10 rounded-full flex items-center justify-center border border-[#DEC79A]/20">
                    <CheckCircle2 className="w-10 h-10 text-[#FACB65]" />
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl text-[#FACB65] font-normal mb-4" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  Thank You!
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8">
                  Your inquiry has been submitted successfully. Our relationship manager will get in touch with you shortly.
                </p>

                <button
                  onClick={() => setShowSuccess(false)}
                  className="px-10 cursor-pointer py-3 bg-[#FACB65] text-[#15243D] text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#c9b085] transition-colors shadow-lg"
                >
                  Close
                </button>

                <button
                  onClick={() => setShowSuccess(false)}
                  className="absolute cursor-pointer top-4 right-4 text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

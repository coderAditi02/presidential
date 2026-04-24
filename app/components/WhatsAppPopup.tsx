"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, X } from "lucide-react";

const WhatsAppPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [phoneNumber] = useState("919834969704"); // ✅ Default WhatsApp number
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (!message.trim() || !phoneNumber.trim()) return;

        // Use the phone number directly (already formatted)
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");
        setMessage("");
    };

    return (
        <>
            {/* WhatsApp Floating Button */}
            <button
                onClick={() => setShowPopup(!showPopup)}
                className="fixed bottom-6 left-6 sm:bottom-10 sm:left-10 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#25D366] rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(37,211,102,0.4)] z-[80] transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_16px_rgba(37,211,102,0.6)] outline-none"
                aria-label="Chat on WhatsApp"
            >
                <Image
                    src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/whatsapp.svg"
                    alt="WhatsApp"
                    width={20}
                    height={20}
                    className="invert brightness-0"
                />
            </button>

            {/* WhatsApp Chat Popup */}
            <div
                className={`fixed left-4 sm:left-5 w-[280px] sm:w-[320px] bg-white rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] z-[81] font-sans transition-all duration-300 overflow-hidden ${showPopup
                    ? "bottom-[90px] sm:bottom-[110px] opacity-100 translate-y-0"
                    : "bottom-[70px] sm:bottom-[90px] opacity-0 translate-y-10 pointer-events-none"
                    }`}
            >
                {/* Header */}
                <div className="bg-[#075E54] text-white p-4 flex justify-between items-center font-semibold text-center">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/images/main_logo.png"
                            alt="Logo"
                            width={120}
                            height={32}
                            className="bg-white p-1 rounded h-10 w-auto"
                        />
                    </div>
                    <button
                        onClick={() => setShowPopup(false)}
                        className="cursor-pointer text-xl hover:opacity-75 transition-opacity"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Chat Body */}
                <div className="p-4 bg-[#ECE5DD] min-h-[150px] max-h-[250px] overflow-y-auto">
                    <div className="bg-[#DCF8C6] p-3 rounded-lg max-w-[85%] mb-2 text-sm shadow-sm text-slate-700 font-medium relative after:content-[''] after:absolute after:left-0 after:top-2 after:-ml-1 after:border-4 after:border-transparent after:border-r-[#DCF8C6] after:border-t-[#DCF8C6]">
                        Hey! 👋 Enter a message and send it to WhatsApp.
                    </div>
                </div>

                {/* Chat Input */}
                <div className="flex items-center gap-2 p-3 bg-white border-t border-gray-100">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 p-2.5 px-4 rounded-full border border-gray-200 outline-none text-sm focus:border-[#25D366] transition-colors bg-gray-50"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-[#25D366] text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow-md hover:bg-[#20bd5a] transition-colors group"
                        aria-label="Send message"
                    >
                        <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default WhatsAppPopup;

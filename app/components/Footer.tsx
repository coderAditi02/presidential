"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname !== "/") {
      e.preventDefault();
      router.push("/" + href);
    }
  };

  return (
    <footer className="bg-[#15243D] text-white py-10 md:py-14 border-t border-[#DEC79A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row - Grid Layout for Perfect Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4 items-center pb-10">
          
          {/* 1. Logo Section (Left) */}
          <div className="flex justify-center md:justify-start">
            <Link href="/" className="group">
              <div className="w-32 md:w-44 flex items-center justify-center transition-all duration-500 hover:scale-105">
                <Image src="/images/newlogo.png" alt="Logo" width={180} height={180} className="w-full h-auto" />
              </div>
            </Link>
          </div>

          {/* 2. Quick Links Section (Center) */}
          <div className="flex flex-col items-center space-y-4">
            <h4 className="text-[#FACB65] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] ">Navigation</h4>
            <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              {[
                { name: "Overview", href: "#overview" },
                { name: "Highlights", href: "#highlights" },
                { name: "Amenities", href: "#amenities" },
                { name: "Pricing", href: "#pricing" },
                { name: "Location", href: "#location" },
                { name: "Contact", href: "#contactus" }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-white text-sm hover:text-[#DEC79A] transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* 3. Contact & Location Section (Right) */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-end gap-8 md:gap-12">
            {/* Location */}
            <div className="text-center md:text-right space-y-2">
              <h4 className="text-[#FACB65] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] ">Location</h4>
              <p className="text-white text-sm leading-relaxed max-w-[200px]">
                Opp. Pimpri Chinchwad University, Talegaon, MH
              </p>
            </div>

            {/* Connect */}
            <div className="text-center md:text-right space-y-2">
              <h4 className="text-[#FACB65] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] ">Connect</h4>
              <div className="flex flex-col space-y-1">
                <a href="tel:+919975211184" className="text-white text-sm hover:text-[#DEC79A] transition-colors">
                  +91 9975211184
                </a>
                <a href="mailto:info@falconrealty.co.in" className="text-white text-sm hover:text-[#DEC79A] transition-colors">
                  info@falconrealty.co.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Divider + Copyright + Legal */}
        <div className="pt-8 border-t border-[#DEC79A]/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p className="text-white text-xs md:text-sm tracking-wide">
              © {new Date().getFullYear()} All rights reserved by Presidential Park.
            </p>
           
          </div>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/privacy-policy" 
              className="text-white hover:text-[#DEC79A] text-xs md:text-sm transition-colors duration-300"
            >
              Privacy Policy
            </Link>
          
          </div>
        </div>
      </div>
    </footer>
  );
}

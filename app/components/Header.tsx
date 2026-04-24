"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { name: "Overview", href: "#overview" },
  { name: "Highlights", href: "#highlights" },
  { name: "Amenities", href: "#amenities" },
  { name: "Pricing", href: "#pricing" },

  // { name: "Master Plan", href: "#master-plan" },
  // { name: "Connectivity", href: "#connectivity" },
  { name: "Gallery", href: "#gallery" },
  { name: "Location", href: "#location" },
  // { name: "Configuration", href: "#configuration" },
  { name: "Contact Us", href: "#contactus" },
];

export default function Header() {
  const [isOnLightBg, setIsOnLightBg] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // On page load/refresh, handle hash navigation or start at top
  useEffect(() => {
    // Disable browser scroll restoration so refresh always starts at top
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
      window.history.replaceState(null, '', window.location.pathname);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll("section, [data-header-theme]");
      const headerHeight = 80;
      let onLight = false;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const bgClass = section.className || "";
        const isLight = bgClass.includes("bg-white") ||
          bgClass.includes("bg-[#f5f5f5]") ||
          bgClass.includes("bg-gray-50") ||
          bgClass.includes("bg-[#F8F6F2]") ||
          bgClass.includes("bg-[#fcfbf9]");

        if (rect.top <= headerHeight && rect.bottom >= headerHeight && isLight) {
          onLight = true;
        }
      });

      setIsOnLightBg(onLight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside or on a link
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');

    if (pathname !== "/") {
      router.push("/" + href);
      setIsMenuOpen(false);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjust for header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      // Keep URL clean so page refresh always starts at the top
      window.history.replaceState(null, '', window.location.pathname);
    }
    setIsMenuOpen(false);
  };

  const isHomePage = pathname === "/";
  const headerBgClass = (isScrolled || !isHomePage)
    ? "bg-[#15243D] shadow-2xl py-2 md:py-2"
    : "bg-transparent py-1 md:py-2";

  const textColorClass = (isScrolled || !isHomePage || !isOnLightBg) ? "text-white" : "text-[#15243D]";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50  transition-all duration-500 ease-in-out ${headerBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between transition-all duration-500">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 group z-50">
            <div className={`w-[120px] md:w-[120px] flex items-center justify-center transition-all duration-500 ${isScrolled ? "scale-90" : "scale-100"}`}>
              <Image src="/images/newlogo.png" alt="Logo" width={300} height={300} className="w-full h-auto object-contain" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`transition-all duration-300 text-sm xl:text-base font-medium hover:text-[#DEC79A] relative group ${textColorClass} cursor-pointer`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#DEC79A] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 z-50 transition-colors duration-300 ${isMenuOpen ? "text-white" : textColorClass}`}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>

          {/* Right Side - Call To Action */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("open-lead-popup"));
              }}
              className="relative px-6 py-2.5 bg-gradient-to-b from-[#FACB65] to-[#D8AE51] text-[#15243D] text-sm font-bold rounded-xl transition-all duration-300 shadow-lg cursor-pointer overflow-hidden group"
            >
              {/* Animated Overlay */}
              <span className="absolute inset-0 bg-[#15243D] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              {/* Text */}
              <span className="relative z-10 transition-colors duration-500 group-hover:text-[#FACB65]">
                Schedule Site Visit
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#0A121E] z-40 transition-all duration-700 ease-in-out lg:hidden ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
      >
        <div className="flex flex-col h-full justify-center px-8 sm:px-12">
          {/* Menu Background Accents */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#15243D]/20 -skew-x-12 translate-x-1/4 pointer-events-none" />

          <nav className="relative z-10 flex flex-col gap-6 sm:gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-2xl sm:text-3xl font-light text-white hover:text-[#DEC79A] transition-all duration-300 transform cursor-pointer ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                  }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  {/* <span className="text-[#DEC79A] text-sm font-bold tracking-widest">0{i + 1}</span> */}
                  {link.name}
                </div>
              </a>
            ))}
          </nav>

          <div className={` relative z-10 transition-all duration-700 delay-500 transform ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            {/* <a
              href="tel:+911234567890"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#DEC79A] text-[#15243D] text-lg font-bold rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all w-fit"
            >
              Contact Agent
              <ArrowRight className="w-5 h-5" />
            </a> */}

            <div className="mt-12 flex gap-6 text-white/40 text-sm">
              <Link href="/privacy-policy" className="hover:text-[#DEC79A] transition-colors" onClick={() => setIsMenuOpen(false)}>Privacy Policy</Link>
              <p>Terms of Service</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

export interface GalleryCardProps {
  image?: string;
  title?: string;
  description?: string;
  label?: string;
  span?: string;
}

const DEFAULT_PARTICLE_COUNT = 15;
const DEFAULT_SPOTLIGHT_RADIUS = 600; // Larger radius to cover multiple cards
const DEFAULT_GLOW_COLOR = '222, 199, 154'; // Gold (#DEC79A)
const MOBILE_BREAKPOINT = 768;

const galleryData: GalleryCardProps[] = [
  {
    image: "/gallery/1.jpeg",
    title: '',
    label: '',
    span: 'md:col-span-2 md:row-span-2'
  },
  {
    image: "/gallery/2.jpeg",
    title: '',
    label: '',
    span: 'md:col-span-1 md:row-span-1'
  },
  {
    image: "/gallery/3.jpg",
    title: '',
    label: '',
    span: 'md:col-span-1 md:row-span-1'
  },
  {
    image: "/gallery/4.jpg",
    title: '',
    label: '',
    span: 'md:col-span-2 md:row-span-2'
  },
  {
    image: "/gallery/5.jpg",
    title: '',
    label: '',
    span: 'md:col-span-1 md:row-span-1'
  },
  {
    image: "/gallery/6.jpg",
    title: '',
    label: '',
    span: 'md:col-span-1 md:row-span-1'
  }
];

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 8px rgba(${color}, 0.8);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  onClick?: () => void;
}> = ({
  children,
  className = '',
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);

  const initializeParticles = useCallback(() => {
    if (!cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        onComplete: () => particle.remove()
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (memoizedParticles.current.length === 0) initializeParticles();

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 60,
          y: (Math.random() - 0.5) * 60,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true
        });
      }, index * 100);
      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      if (enableTilt) {
        gsap.to(element, { rotateX: 0, rotateY: 0, duration: 0.5 });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5;
      gsap.to(element, { rotateX, rotateY, duration: 0.2 });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, enableTilt]);

  return (
    <div ref={cardRef} className={`${className} relative`} onClick={onClick}>
      {children}
    </div>
  );
};

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeLightbox = () => setSelectedIndex(null);
  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % galleryData.length : null));
  };
  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + galleryData.length) % galleryData.length : null));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') setSelectedIndex((prev) => (prev !== null ? (prev + 1) % galleryData.length : null));
      if (e.key === 'ArrowLeft') setSelectedIndex((prev) => (prev !== null ? (prev - 1 + galleryData.length) % galleryData.length : null));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    // Create global spotlight for the section background
    const spotlight = document.createElement('div');
    spotlight.className = 'section-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: ${DEFAULT_SPOTLIGHT_RADIUS * 2}px;
      height: ${DEFAULT_SPOTLIGHT_RADIUS * 2}px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${DEFAULT_GLOW_COLOR}, 0.12) 0%,
        rgba(${DEFAULT_GLOW_COLOR}, 0.05) 30%,
        transparent 70%
      );
      z-index: 1;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const isOver = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (!isOver) {
        gsap.to(spotlight, { opacity: 0, duration: 0.5 });
        grid.querySelectorAll('.gallery-card').forEach(card => {
          (card as HTMLElement).style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      gsap.to(spotlight, {
        opacity: 1,
        left: e.clientX,
        top: e.clientY,
        duration: 0.2,
        ease: 'power2.out'
      });

      const cards = grid.querySelectorAll('.gallery-card');
      cards.forEach(card => {
        const cardElem = card as HTMLElement;
        const cardRect = cardElem.getBoundingClientRect();
        
        // Calculate relative mouse position for the radial gradient
        const relX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
        const relY = ((e.clientY - cardRect.top) / cardRect.height) * 100;
        
        // Calculate distance to card center to determine intensity
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        
        // Intensity decreases with distance, but covers multiple cards
        let intensity = 0;
        if (dist < DEFAULT_SPOTLIGHT_RADIUS) {
          intensity = Math.pow(1 - (dist / DEFAULT_SPOTLIGHT_RADIUS), 1.5);
        }

        cardElem.style.setProperty('--glow-x', `${relX}%`);
        cardElem.style.setProperty('--glow-y', `${relY}%`);
        cardElem.style.setProperty('--glow-intensity', intensity.toString());
        cardElem.style.setProperty('--glow-radius', `${DEFAULT_SPOTLIGHT_RADIUS}px`);
      });
    };

    const handleMouseLeave = () => {
      gsap.to(spotlight, { opacity: 0, duration: 0.5 });
      grid.querySelectorAll('.gallery-card').forEach(card => {
        (card as HTMLElement).style.setProperty('--glow-intensity', '0');
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
      spotlight.remove();
    };
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="py-20 bg-[#15243D] overflow-hidden relative">
      <style>{`
        .gallery-card::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 4px; /* Thicker border highlight */
          background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
              rgba(${DEFAULT_GLOW_COLOR}, calc(var(--glow-intensity) * 1)) 0%,
              rgba(${DEFAULT_GLOW_COLOR}, calc(var(--glow-intensity) * 0.3)) 40%,
              transparent 70%);
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 10;
          opacity: 1;
          transition: border-width 0.3s ease;
        }
        
        .gallery-card:hover::after {
            padding: 6px; /* Even thicker on direct hover */
        }

        .particle {
          pointer-events: none;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl text-center text-white font-light leading-tight">
            Life at <span className="text-[#FACB65] font-normal">Presidential Park</span>
          </h2>
        </div>

        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px]"
        >
          {galleryData.map((item, index) => (
            <ParticleCard
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`gallery-card group relative rounded-3xl overflow-hidden bg-[#1a2d4a]/50 backdrop-blur-sm border border-[#2F293A] transition-all duration-700 hover:-translate-y-2 cursor-pointer ${item.span || ''}`}
              glowColor={DEFAULT_GLOW_COLOR}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-[#15243D] via-transparent to-transparent opacity-80" /> */}
              
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <span className="text-[#DEC79A] text-[10px] uppercase tracking-widest font-bold mb-1 block opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  {item.label}
                </span>
                <h3 className="text-white text-xl font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {item.title}
                </h3>
              </div>
              
              {/* CSS Variables Holder */}
              <div className="absolute inset-0 z-0 pointer-events-none" style={{
                '--glow-x': '50%',
                '--glow-y': '50%',
                '--glow-intensity': '0',
                '--glow-radius': '600px'
              } as React.CSSProperties} />
            </ParticleCard>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#15243D]/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 text-white/70 hover:text-[#DEC79A] transition-colors p-2"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <button 
              onClick={showPrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#DEC79A] transition-colors p-4 z-50 bg-black/20 hover:bg-black/40 rounded-full"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>

            <button 
              onClick={showNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#DEC79A] transition-colors p-4 z-50 bg-black/20 hover:bg-black/40 rounded-full"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>

            <motion.img
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={galleryData[selectedIndex].image}
              alt={galleryData[selectedIndex].title || 'Gallery Image'}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            {(galleryData[selectedIndex].title || galleryData[selectedIndex].label) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-8 left-0 right-0 text-center pointer-events-none"
              >
                {galleryData[selectedIndex].label && (
                  <span className="text-[#DEC79A] text-xs uppercase tracking-widest font-bold mb-2 block">
                    {galleryData[selectedIndex].label}
                  </span>
                )}
                {galleryData[selectedIndex].title && (
                  <h3 className="text-white text-2xl font-light">
                    {galleryData[selectedIndex].title}
                  </h3>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

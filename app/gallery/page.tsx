"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Header />
      {/* Spacer for fixed header */}
      <div className="h-20 bg-[#15243D]" /> 
      <Gallery />
      <Footer />
    </main>
  );
}

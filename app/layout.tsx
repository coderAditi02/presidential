import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Presidential Park - Luxury Living",
  description: "Experience luxury living amidst nature's finest landscapes at Presidential Park",

   icons: {
    icon: "/images/presidentialfavicon.png", // or /favicon.png
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
        {children}
      </body>
    </html>
  );
}

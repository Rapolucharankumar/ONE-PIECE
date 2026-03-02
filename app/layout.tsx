import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AnimatedParticles from "@/components/AnimatedParticles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "One Piece Universe",
  description: "The ultimate compendium for One Piece characters, episodes, and releases.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} antialiased bg-[#0f0f1a] text-white min-h-screen flex flex-col relative overflow-x-hidden`}>
        <AnimatedParticles />
        <Navbar />
        <main className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 xl:px-20 flex-grow relative z-10 pt-28 pb-10">
          {children}
        </main>
      </body>
    </html>
  );
}

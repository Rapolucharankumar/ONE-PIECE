import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg-primary text-foreground min-h-screen flex flex-col`}>
        <Navbar />
        <main className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 xl:px-20 flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}

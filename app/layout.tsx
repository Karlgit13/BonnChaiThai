import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bonn Chai Thai | Exquisite Dining in Stockholm",
  description: "Experience the true essence of Thai culinary artistry. A family-run fine dining establishment where heritage meets luxury.",
};

import { AuthProvider } from "@/context/AuthContext";
import ChatBot from "@/components/ai/ChatBot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-black text-zinc-200`}
      >
        <AuthProvider>
          {children}
          <div className="relative z-50">
            <ChatBot />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const planetCosmos = localFont({
  src: "../public/fonts/PLANK___.ttf",
  display: "swap",
  variable: "--font-planet-cosmos",
});

export const metadata: Metadata = {
  title: "DR. Green Thumb",
  description: "High Quality Weed That's Out of This World.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${planetCosmos.variable} antialiased`}

      
      >
        {children}
      </body>

    </html>
  );
}

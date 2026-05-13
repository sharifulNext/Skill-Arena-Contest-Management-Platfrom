import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/ui/navbar/Navbar";
import Footer from "@/components/home/Footer";

// Fonts Configuration
const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contest Platform | Your Ultimate Contest Platform",
  description: "Find and manage the best programming contests in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning     
      className={cn(
        "h-full antialiased",
        geistSans.variable,
        geistMono.variable,
        notoSans.variable,
        playfairDisplayHeading.variable
      )}
    >
      <body className="min-h-full flex flex-col font-sans bg-white dark:bg-slate-950">
        {/* <Providers> */}
          {/* Wrapper for Layout Structure */}
          <div className="flex flex-col min-h-screen">
            <Navbar />
            
            {/* Main Content Area */}
            <main className="flex-grow pt-24 pb-20 md:pb-32 px-4 max-w-7xl mx-auto w-full">
              {children}
            </main>

            {/* <Footer /> */}
            <Footer/>
          </div>
        {/* </Providers> */}
      </body>
    </html>
  );
}
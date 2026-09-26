import type { ReactNode } from "react";
import { Inter, Oswald } from "next/font/google";
import Footer from "../components/Footer";
import Providers from "../components/Providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "FitLog | Workout Library",
  description:
    "A focused workout library and daily training planner for tracking every set.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="m-0 min-h-screen bg-[#0C0D10]">
        <Providers>
          <div className="flex min-h-screen flex-col bg-[#0C0D10]">
            <div className="flex flex-1 flex-col bg-[#0C0D10]">
              {children}
            </div>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
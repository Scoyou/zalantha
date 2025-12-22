import type { Metadata } from "next";
import { Cinzel, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "./ui/navbar";
import { Footer } from "./ui/footer";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next";


const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
});
const displayFont = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Knights of Zalantha",
  description: "Knights of Zalantha LARP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${bodyFont.variable} ${displayFont.variable} font-sans`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

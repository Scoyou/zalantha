import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Navbar } from "./ui/navbar";
import { Footer } from "./ui/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PageTransition from "./ui/page-transition";

const bodyFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});
const displayFont = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "Knights of Zalantha",
    template: "%s | Knights of Zalantha",
  },
  description:
    "Knights of Zalantha is a Utah LARP where Utah knights and adventurers explore the realm of Zalantha.",
  keywords: [
    "Utah LARP",
    "Utah knights",
    "Zalantha",
    "Knights of Zalantha",
    "Live Action Role Play",
    "LARP Utah",
    "fantasy LARP",
    "Davis County LARP",
  ],
  openGraph: {
    title: "Knights of Zalantha",
    description:
      "Knights of Zalantha is a Utah LARP where Utah knights and adventurers explore the realm of Zalantha.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Knights of Zalantha",
    description:
      "Knights of Zalantha is a Utah LARP where Utah knights and adventurers explore the realm of Zalantha.",
  },
};

const cloudfrontUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;
const cloudfrontOrigin = cloudfrontUrl ? new URL(cloudfrontUrl).origin : null;
const shouldUseSpeedInsights =
  process.env.VERCEL_ENV === "production" ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Knights of Zalantha",
      url: siteUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Knights of Zalantha",
      url: siteUrl,
    },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        {cloudfrontOrigin ? (
          <link rel="preconnect" href={cloudfrontOrigin} />
        ) : null}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(() => {
  try {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored === "dark" || stored === "light" ? stored : prefersDark ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="site-main">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        {shouldUseSpeedInsights ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}

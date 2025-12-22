import type { Metadata } from "next";
import { headers } from "next/headers";
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
  title: "Knights of Zalantha",
  description: "Knights of Zalantha LARP",
};

const cloudfrontUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;
const cloudfrontOrigin = cloudfrontUrl ? new URL(cloudfrontUrl).origin : null;
const shouldUseSpeedInsights =
  process.env.VERCEL_ENV === "production" ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = headers().get("x-nonce") ?? undefined;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        {cloudfrontOrigin ? (
          <link rel="preconnect" href={cloudfrontOrigin} />
        ) : null}
        <script
          nonce={nonce}
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

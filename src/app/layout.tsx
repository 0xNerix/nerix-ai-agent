import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import '@rainbow-me/rainbowkit/styles.css';
import { Analytics } from "@vercel/analytics/next";
import { PWAInstallPrompt } from "@/components/layout/pwa-install-prompt";
import { GTMScript } from "@/components/consent/gtm-script";
import { ConsentProvider } from "@/components/consent/consent-provider";
import { CookieBanner } from "@/components/consent/cookie-banner";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  metadataBase: new URL('https://www.nerixai.com'),
  title: {
    default: "Nerix — Break the AI's Logic, Win BNB Prize Pools & Collect Power NFTs",
    template: "%s | Nerix AI"
  },
  description: "Challenge Nerix AI using natural language. Win BNB prize pools, earn evolving NFTs with gameplay bonuses, and compete in blockchain-based AI challenges — fully on-chain.",
  keywords: [
    "AI gaming", "BNB Chain gaming", "natural language AI", "AI challenges", 
    "blockchain gaming", "Web3 gaming", "GameFi", "AI prompt engineering",
    "crypto gaming", "BNB prize pools", "evolving NFTs", "AI competitions",
    "on-chain gaming", "decentralized gaming", "AI strategy games", "prompt challenges",
    "AI security games", "intelligent gaming", "digital asset gaming", "crypto rewards",
    "AI bug bounty", "prompt engineering challenges", "AI testing games", "ai games", 
    "play to earn", "nft games", "crypto prizes", "ai powered gaming",
    "binance smart chain games", "gaming tournaments", "ai challenge game",
    "play against ai", "ai hacking competition", "ethical hacking ai",
    "ai vulnerability testing", "security bug bounty", "ai strategy game",
    "ai battle arena",
  ],
  authors: [{ name: "Nerix" }],
  creator: "Nerix",
  publisher: "Nerix",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://www.nerixai.com"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.nerixai.com",
    siteName: "Nerix AI",
    title: "Break the AI's Logic. Win BNB. Collect Power NFTs.",
    description: "Challenge Nerix AI using natural language. Win BNB prize pools, collect evolving NFTs with gameplay bonuses, and compete in blockchain AI challenges — fully on-chain.",
    images: [
      {
        url: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/og-image.png",
        secureUrl: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nerix Platform",
        type: "image/png"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Break the AI's Logic. Win BNB. Collect Power NFTs.",
    description: "Use natural language to challenge a self-evolving AI. Win the full BNB prize pool and collect evolving NFTs that grow stronger each round — fully on-chain.",
    creator: "@NerixAI",
    images: ["https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/og-image.png"]
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-96x96.png", sizes: "96x96" }
    ],
    apple: [
      { url: "/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-icon-180x180.png", sizes: "180x180" }
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-icon-precomposed.png",
        sizes: "180x180"
      },
      {
        rel: "icon",
        url: "/android-icon-192x192.png",
        sizes: "192x192"
      },
      {
        rel: "icon",
        url: "/ms-icon-310x310.png",
        sizes: "310x310"
      },
      {
        rel: "icon",
        url: "/ms-icon-70x70.png",
        sizes: "70x70"
      },
      {
        rel: "icon",
        url: "/ms-icon-150x150.png",
        sizes: "150x150"
      }
    ]
  },
  manifest: '/site.webmanifest'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`} suppressHydrationWarning>
        <GTMScript />
        <ConsentProvider>
          <Providers
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main className="flex-1">
              {children}
            </main>
            <PWAInstallPrompt />
            <CookieBanner />
          </Providers>
        </ConsentProvider>
        <Analytics />
      </body>
    </html>
  );
}
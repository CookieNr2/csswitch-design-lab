import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/custom/layout/Navbar";
import Footer from "@/components/custom/layout/Footer";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  // Resolves the relative image URLs below into absolute ones for crawlers.
  metadataBase: new URL(siteUrl),
  title: {
    default: "CSSwitch Design Lab",
    template: "%s | CSSwitch Design Lab",
  },
  description: "Customize and optimize your CSSwitch settings with ease.",
  icons: { icon: "/csswitch-favicon.png" },
  openGraph: {
    type: "website",
    siteName: "CSSwitch Design Lab",
    title: "CSSwitch Design Lab",
    description: "Customize and optimize your CSSwitch settings with ease.",
    images: [{ url: "/csswitch-banner.png", width: 700, height: 394 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CSSwitch Design Lab",
    description: "Customize and optimize your CSSwitch settings with ease.",
    images: ["/csswitch-banner.png"],
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // `dark` is fixed on: the app has no theme toggle, and it makes shadcn's
    // own `dark:` variants resolve against the palette in globals.css.
    <html lang="en" className={`dark font-sans ${notoSans.variable}`}>
      {/*
        Extensions such as Grammarly and ColorZilla stamp attributes onto
        <body> before React hydrates, which React reports as a mismatch. This
        suppresses the warning for this element's own attributes only -- it
        does not extend to children, so real mismatches still surface.
      */}
      {/* min-h-dvh rather than a height rule on html/body in the stylesheet. */}
      <body
        suppressHydrationWarning
        className="flex min-h-dvh flex-col bg-neutral-900 text-white"
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;

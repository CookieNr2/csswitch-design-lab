import type { Metadata } from "next";
import { Noto_Sans, Questrial } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-questrial",
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
    <html lang="en" className={`${notoSans.variable} ${questrial.variable}`}>
      {/*
        Extensions such as Grammarly and ColorZilla stamp attributes onto
        <body> before React hydrates, which React reports as a mismatch. This
        suppresses the warning for this element's own attributes only -- it
        does not extend to children, so real mismatches still surface.
      */}
      <body suppressHydrationWarning>
        <main className="flex-shrink-0">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
};

export default RootLayout;

// Import Components and libraries
import type { Metadata } from "next";
import { Anton } from "next/font/google";
import { SiteVideoBackground } from "@/components/site-video-background";
import Footer from "@/components/footer";

// Import styles
import "./globals.scss";


// Configuration of the Anton Google Font.
// `display: "swap"` tells the browser to use a fallback font until Anton finishes loading,
// which avoids the FOIT (Flash Of Invisible Text) issue on slow connections.
const antonGoogleFontConfiguration = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});


// Site-wide metadata used by Next.js to generate the SEO tags inside every page's <head>.
export const metadata: Metadata = {
  metadataBase: new URL("https://streetworkin.com"),
  title: "StreetWork'in",
  description: "Communauté et ressources autour du street workout et du training outdoor.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "StreetWork'in",
    description: "Communauté et ressources autour du street workout et du training outdoor.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
    locale: "fr_FR",
  },
};


// Root layout shared by every page (home, login, register, espace, not-found).
// It mounts the background video once for the whole site and wraps every page with the footer.
// NOTE: Next.js requires the prop key to be named `children` — we rename it locally to a
// longer descriptive name using the JavaScript destructuring "rename" syntax (`children: ...`).
export default function RootLayout({
  children: childrenOfTheRootLayout,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={antonGoogleFontConfiguration.variable}>
      <body>
        <div className="site-shell">
          <SiteVideoBackground />
          <div className="site-content">
            {childrenOfTheRootLayout}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}

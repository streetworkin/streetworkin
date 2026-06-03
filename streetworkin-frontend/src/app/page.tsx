// Import Components and libraries
import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/header";
import ImageMarquee from "@/components/image-marquee";
import StreetWorkoutIntro from "@/components/street-workout-intro";
import Disciplines from "@/components/disciplines";
import Competitions from "@/components/competitions";
import TeamShowcase from "@/components/team-showcase";

// Import styles
import "./page.scss";

// Metadata used by Next.js for the SEO information of this page (browser tab title + meta description).
export const metadata: Metadata = {
  title: "Accueil — StreetWork'in",
  description:
    "Rejoins la communauté StreetWork'in, le réseau dédié au street workout et au training outdoor à Lyon.",
};


// Partner logos displayed inside the scrolling marquee at the bottom of the home page.
// TODO: replace the generic alt text with the real brand names once they are communicated
// (the previous brand names were FFSWF, Fit Lyon, FNSL, FNSWC, Monster Energy).
const LIST_OF_PARTNER_LOGOS_FOR_HOME_MARQUEE = [
  { imageFileSourceUrl: "/assets/partenaire_1.png", shortAltDescription: "Partenaire StreetWork'in 1" },
  { imageFileSourceUrl: "/assets/partenaire_2.png", shortAltDescription: "Partenaire StreetWork'in 2" },
  { imageFileSourceUrl: "/assets/partenaire_3.png", shortAltDescription: "Partenaire StreetWork'in 3" },
  { imageFileSourceUrl: "/assets/partenaire_4.png", shortAltDescription: "Partenaire StreetWork'in 4" },
  { imageFileSourceUrl: "/assets/partenaire_5.png", shortAltDescription: "Partenaire StreetWork'in 5" },
  { imageFileSourceUrl: "/assets/partenaire_6.png", shortAltDescription: "Partenaire StreetWork'in 6" },
  { imageFileSourceUrl: "/assets/partenaire_7.png", shortAltDescription: "Partenaire StreetWork'in 7" },
];


export default function Home() {
  return (
    <main className="site-content__inner">
      <Header />
      <div className="site-content__main">
        <section className="site-content__welcome">
          <div className="site-content__logo">
            <Image
              src="/assets/logog.png"
              alt="StreetWork'in Logo"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 650px, 800px"
              loading="eager"
            />
          </div>
        </section>

        <Disciplines />

        <StreetWorkoutIntro />

        <Competitions />

        <TeamShowcase />

        <section id="partners" className="partners" aria-label="Nos partenaires">
          <h2 className="partners__title">Nos Partenaires</h2>
          <ImageMarquee listOfImagesToScroll={LIST_OF_PARTNER_LOGOS_FOR_HOME_MARQUEE} />
        </section>
      </div>
    </main>
  );
}

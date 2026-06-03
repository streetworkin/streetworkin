// Import Components and libraries
import type { Metadata } from "next";
import Header from "@/components/header";
import MembershipTiers from "@/components/membership-tiers";
import MembershipCheckout from "@/components/membership-checkout";

// Import styles
import "./page.scss";

// Metadata used by Next.js for the SEO of this page.
export const metadata: Metadata = {
  title: "Nous rejoindre — StreetWork'in",
  description:
    "Rejoins la communauté StreetWork'in. Choisis ta formule (classique ou athlète) et finalise ton adhésion en toute sécurité via HelloAsso.",
};


export default function RegisterPage() {
  return (
    <main className="site-content__inner">
      <Header />
      <div className="site-content__main register">
        <MembershipTiers />
        <MembershipCheckout />
      </div>
    </main>
  );
}

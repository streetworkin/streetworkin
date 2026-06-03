// Import Components and libraries
import type { Metadata } from "next";
import Header from "@/components/header";

// Import styles
import "./page.scss";

// Metadata used by Next.js for the SEO of this page.
export const metadata: Metadata = {
  title: "Nos Espaces — StreetWork'in",
  description: "Découvre les espaces d'entraînement StreetWork'in à Lyon.",
};


export default function EspacePage() {
  return (
    <main className="espace">
      <Header />
      <section className="espace__hero">
        <h1 className="espace__title">Nos Espaces</h1>
      </section>
    </main>
  );
}

// Import Components and libraries
import type { Metadata } from "next";
import Button from "@/components/button";
import { APP_ROUTE_PATHS } from "@/constants/routes";

// Import styles
import "./not-found.scss";

// Metadata used by Next.js for the SEO of this page.
export const metadata: Metadata = {
  title: "Page introuvable — StreetWork'in",
  description: "La page que tu cherches n'existe pas ou a été déplacée.",
};


export default function NotFoundPage() {
  return (
    <main className="not-found">
      <section className="not-found__card">
        <h1 className="not-found__code">404</h1>
        <p className="not-found__message">
          Oups, cette page n&apos;existe pas ou a été déplacée.
        </p>
        <Button
          className="not-found__btn"
          optionalNavigationUrl={APP_ROUTE_PATHS.homePage}
          buttonContentToDisplay="Retour à l'accueil"
        />
      </section>
    </main>
  );
}

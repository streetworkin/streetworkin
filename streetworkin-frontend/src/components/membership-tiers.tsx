// Import Components and libraries
import {
  LIST_OF_MEMBERSHIP_FORMULAS,
  type OneMembershipFormula,
} from "@/constants/membership";

// Import styles
import "./ui/membership-tiers.scss";


// Icône check-circle inline — aucune dépendance ajoutée.
// `fill="currentColor"` → la couleur est héritée de la classe du parent.
const CHECK_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);


/**
 * Carte d'une formule d'adhésion — interne au composant
 * (pas exportée car spécifique à ce contexte).
 */
function TierCard({ formula }: { formula: OneMembershipFormula }) {
  return (
    <article
      className={`membership-tiers__card${formula.isPopularChoice ? " membership-tiers__card--popular" : ""}`}
    >
      {formula.isPopularChoice && (
        <span className="membership-tiers__badge-popular">Populaire</span>
      )}

      <h3 className="membership-tiers__card-title">{formula.formulaName}</h3>

      <p className="membership-tiers__price">
        <span className="membership-tiers__price-value">{formula.yearlyPriceInEuros}€</span>
        <span className="membership-tiers__price-period">/ {formula.timePeriodName}</span>
      </p>

      <p className="membership-tiers__audience">{formula.audienceDescription}</p>

      <ul className="membership-tiers__features">
        {formula.benefitsList.map((oneBenefit) => (
          <li key={oneBenefit} className="membership-tiers__feature">
            <span className="membership-tiers__check" aria-hidden="true">
              {CHECK_ICON}
            </span>
            <span className="membership-tiers__feature-text">{oneBenefit}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}


export default function MembershipTiers() {
  return (
    <section id="tiers" className="membership-tiers">
      <span className="membership-tiers__badge">Tarifs</span>

      <h2 className="membership-tiers__heading">
        Avantage{" "}
        <span className="membership-tiers__heading-accent">adhérents</span>
      </h2>

      <p className="membership-tiers__intro">
        Adapte ton adhésion selon tes besoins et objectifs avec StreetWork&apos;in.
      </p>

      <div className="membership-tiers__grid">
        {LIST_OF_MEMBERSHIP_FORMULAS.map((oneFormula) => (
          <TierCard key={oneFormula.formulaName} formula={oneFormula} />
        ))}
      </div>
    </section>
  );
}

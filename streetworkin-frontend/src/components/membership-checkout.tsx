"use client";
// Import Components and libraries
import { useState } from "react";
import {
  LIST_OF_CHECKOUT_TUNNEL_STEPS,
  LIST_OF_MEMBERSHIP_PAYMENT_OPTIONS,
  TOTAL_NUMBER_OF_REGISTERED_MEMBERS,
  type OneCheckoutStepIdentifier,
  type OneMembershipPaymentOption,
} from "@/constants/membership";

// Import styles
import "./ui/membership-checkout.scss";


// Icônes inline (bouclier, utilisateur, panier) — aucune dépendance ajoutée.
const SHIELD_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </svg>
);

const USER_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const CART_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);


// Dictionary that maps an option id to its currently chosen quantity (0 .. maximumQuantityPerPerson).
type QuantitiesPerOptionDictionary = Record<string, number>;


/**
 * Sélecteur de quantité : boutons - / valeur / +.
 * `disabled` côté -/+ géré pour respecter la limite (`maximumQuantityPerPerson`).
 */
function QuantitySelector({
  currentQuantityValue,
  maximumAllowedQuantity,
  onIncrement,
  onDecrement,
  optionDisplayName,
}: {
  currentQuantityValue: number;
  maximumAllowedQuantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  optionDisplayName: string;
}) {
  return (
    <div
      className="membership-checkout__quantity"
      role="group"
      aria-label={`Quantité pour ${optionDisplayName}`}
    >
      <button
        type="button"
        className="membership-checkout__quantity-btn"
        onClick={onDecrement}
        disabled={currentQuantityValue === 0}
        aria-label="Diminuer la quantité"
      >
        −
      </button>
      <span className="membership-checkout__quantity-value" aria-live="polite">
        {currentQuantityValue}
      </span>
      <button
        type="button"
        className="membership-checkout__quantity-btn membership-checkout__quantity-btn--plus"
        onClick={onIncrement}
        disabled={currentQuantityValue >= maximumAllowedQuantity}
        aria-label="Augmenter la quantité"
      >
        +
      </button>
    </div>
  );
}


/**
 * Carte d'une option d'adhésion (paiement annuel ou mensuel) avec son sélecteur.
 * Le "total" affiché en bas (pour le mensuel) recalcule en fonction de la quantité.
 */
function OptionCard({
  paymentOption,
  currentQuantityValue,
  onIncrement,
  onDecrement,
}: {
  paymentOption: OneMembershipPaymentOption;
  currentQuantityValue: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  const isMonthlyBilling = paymentOption.billingPeriodName === "mois";
  const computedTotalOverOneYear = isMonthlyBilling
    ? currentQuantityValue * paymentOption.unitPriceInEuros * 12
    : currentQuantityValue * paymentOption.unitPriceInEuros;

  return (
    <article className="membership-checkout__option">
      <h4 className="membership-checkout__option-name">{paymentOption.optionDisplayName}</h4>
      <p className="membership-checkout__option-description">
        {paymentOption.longDescriptionText}
      </p>

      <p className="membership-checkout__option-limit">
        <span className="membership-checkout__option-limit-icon" aria-hidden="true">
          {CART_ICON}
        </span>
        Limité à {paymentOption.maximumQuantityPerPerson} par personne
      </p>

      <p className="membership-checkout__option-price">
        <span className="membership-checkout__option-price-value">
          {paymentOption.unitPriceInEuros.toLocaleString("fr-FR", {
            minimumFractionDigits: paymentOption.unitPriceInEuros % 1 === 0 ? 0 : 2,
          })}
          €
        </span>
        {isMonthlyBilling && (
          <span className="membership-checkout__option-price-period"> Par mois</span>
        )}
      </p>

      {isMonthlyBilling && (
        <p className="membership-checkout__option-total">
          (Soit {computedTotalOverOneYear.toLocaleString("fr-FR", { minimumFractionDigits: 0 })}
          € au total sur 12 mois)
        </p>
      )}

      <QuantitySelector
        currentQuantityValue={currentQuantityValue}
        maximumAllowedQuantity={paymentOption.maximumQuantityPerPerson}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        optionDisplayName={paymentOption.optionDisplayName}
      />
    </article>
  );
}


/**
 * Tunnel d'inscription HelloAsso — structure visuelle + navigation entre étapes.
 *
 * NOTE: les étapes 2-4 (Adhérents / Coordonnées / Récapitulatif) sont rendues
 * en placeholder. TODO : brancher sur l'API HelloAsso quand la clé sera
 * disponible.
 */
export default function MembershipCheckout() {
  const [currentlyActiveStepId, setCurrentlyActiveStepId] =
    useState<OneCheckoutStepIdentifier>("choice");

  const [quantitiesPerOption, setQuantitiesPerOption] = useState<QuantitiesPerOptionDictionary>(
    function buildInitialQuantitiesDictionary() {
      const initialDictionary: QuantitiesPerOptionDictionary = {};
      for (const oneOption of LIST_OF_MEMBERSHIP_PAYMENT_OPTIONS) {
        initialDictionary[oneOption.uniqueOptionId] = 0;
      }
      return initialDictionary;
    },
  );

  function changeQuantityForOneOption(targetOptionId: string, quantityChangeAmount: number) {
    setQuantitiesPerOption(function (previousQuantitiesState) {
      const targetOption = LIST_OF_MEMBERSHIP_PAYMENT_OPTIONS.find(
        (oneOption) => oneOption.uniqueOptionId === targetOptionId,
      );
      if (!targetOption) return previousQuantitiesState;

      // Clamp the new quantity between 0 and the maximum allowed per person.
      const previousQuantity = previousQuantitiesState[targetOptionId] ?? 0;
      let newQuantityWanted = previousQuantity + quantityChangeAmount;
      if (newQuantityWanted < 0) newQuantityWanted = 0;
      if (newQuantityWanted > targetOption.maximumQuantityPerPerson) {
        newQuantityWanted = targetOption.maximumQuantityPerPerson;
      }

      return { ...previousQuantitiesState, [targetOptionId]: newQuantityWanted };
    });
  }

  return (
    <section id="checkout" className="membership-checkout">
      <span className="membership-checkout__badge">Inscription</span>

      <h2 className="membership-checkout__heading">
        Finalise ton{" "}
        <span className="membership-checkout__heading-accent">adhésion</span>
      </h2>

      <p className="membership-checkout__intro">
        Complète ton inscription en toute sécurité via HelloAsso.
      </p>

      <div className="membership-checkout__card">
        {/* Bandeau "Paiement sécurisé" */}
        <header className="membership-checkout__secure-banner">
          <span className="membership-checkout__secure-icon" aria-hidden="true">
            {SHIELD_ICON}
          </span>
          Paiement sécurisé
        </header>

        {/* Compteur d'adhérents */}
        <p className="membership-checkout__counter">
          <span className="membership-checkout__counter-icon" aria-hidden="true">
            {USER_ICON}
          </span>
          <span className="membership-checkout__counter-value">
            {TOTAL_NUMBER_OF_REGISTERED_MEMBERS}
          </span>{" "}
          adhérents
        </p>

        {/* Onglets du tunnel */}
        <nav className="membership-checkout__tabs" aria-label="Étapes de l'inscription">
          {LIST_OF_CHECKOUT_TUNNEL_STEPS.map(function (oneTunnelStep) {
            const isThisStepActive = oneTunnelStep.stepUniqueId === currentlyActiveStepId;
            return (
              <button
                key={oneTunnelStep.stepUniqueId}
                type="button"
                className={`membership-checkout__tab${isThisStepActive ? " membership-checkout__tab--active" : ""}`}
                onClick={() => setCurrentlyActiveStepId(oneTunnelStep.stepUniqueId)}
                aria-current={isThisStepActive ? "step" : undefined}
              >
                {oneTunnelStep.stepDisplayLabel}
              </button>
            );
          })}
        </nav>

        {/* Contenu de l'étape active */}
        <div className="membership-checkout__step">
          {currentlyActiveStepId === "choice" && (
            <div className="membership-checkout__options">
              {LIST_OF_MEMBERSHIP_PAYMENT_OPTIONS.map(function (onePaymentOption) {
                return (
                  <OptionCard
                    key={onePaymentOption.uniqueOptionId}
                    paymentOption={onePaymentOption}
                    currentQuantityValue={
                      quantitiesPerOption[onePaymentOption.uniqueOptionId] ?? 0
                    }
                    onIncrement={() =>
                      changeQuantityForOneOption(onePaymentOption.uniqueOptionId, +1)
                    }
                    onDecrement={() =>
                      changeQuantityForOneOption(onePaymentOption.uniqueOptionId, -1)
                    }
                  />
                );
              })}
            </div>
          )}

          {currentlyActiveStepId !== "choice" && (
            <p className="membership-checkout__placeholder">
              Étape disponible une fois ton choix d&apos;adhésion validé.
            </p>
          )}
        </div>

        {/* CTA "Continuer" — désactivé en attendant le branchement HelloAsso. */}
        {currentlyActiveStepId === "choice" && (
          <div className="membership-checkout__cta">
            <button
              type="button"
              className="membership-checkout__continue"
              disabled
              aria-disabled="true"
              title="Disponible dès la première mise à jour"
            >
              Continuer
            </button>
            <p className="membership-checkout__cta-hint" role="note">
              Disponible dès la première mise à jour.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// This file holds all the data about the StreetWork'in memberships.
// It is used by the "Avantage adhérents" cards section and by the
// "Finalise ton adhésion" checkout panel — both read from the same source
// so we never have to update the price in two different files.


// One membership formula displayed as a card in the "Avantage adhérents" section.
export type OneMembershipFormula = {
  formulaName: string;
  yearlyPriceInEuros: number;
  timePeriodName: string;
  audienceDescription: string;
  isPopularChoice?: boolean;
  benefitsList: string[];
};


// One payment option proposed inside the HelloAsso-style checkout panel.
export type OneMembershipPaymentOption = {
  uniqueOptionId: string;
  optionDisplayName: string;
  longDescriptionText: string;
  unitPriceInEuros: number;
  billingPeriodName: "an" | "mois";
  maximumQuantityPerPerson: number;
};


// One step of the multi-step checkout tunnel (visible as tabs at the top of the panel).
export type OneCheckoutTunnelStep = {
  stepUniqueId: OneCheckoutStepIdentifier;
  stepDisplayLabel: string;
};

export type OneCheckoutStepIdentifier = "choice" | "members" | "contact" | "summary";


export const LIST_OF_MEMBERSHIP_FORMULAS: OneMembershipFormula[] = [
  {
    formulaName: "Adhésion Classique",
    yearlyPriceInEuros: 175,
    timePeriodName: "an",
    audienceDescription: "Adapté aux niveaux débutant et intermédiaire",
    isPopularChoice: true,
    benefitsList: [
      "Accès aux 2 séances hebdomadaires",
      "Tarifs réduits chez tous nos partenaires",
      "Tarifs réduits aux events StreetWork'in",
      "Groupe communautaire d'adhérents",
      "Invitation aux sorties adhérents",
      "Assurance sportive",
      "1 workshop offert dans l'année",
    ],
  },
  {
    formulaName: "Adhésion Athlète",
    yearlyPriceInEuros: 250,
    timePeriodName: "an",
    audienceDescription: "Adapté aux niveaux avancés",
    benefitsList: [
      "Accès à tous les avantages des adhérents classiques",
      "Participation à la saison Turbo'Barz",
      "Kit athlète (T-shirt + Swockets)",
      "Groupe communautaire athlète",
      "Opportunité d'animer des spectacles",
      "Mise en avant sur les réseaux sociaux",
      "Shooting professionnel offert",
      "T-shirt offert si adhésion annuelle",
    ],
  },
];


export const LIST_OF_MEMBERSHIP_PAYMENT_OPTIONS: OneMembershipPaymentOption[] = [
  {
    uniqueOptionId: "classic-yearly",
    optionDisplayName: "Adhérent classique",
    longDescriptionText:
      "S'adresse aux pratiquants (débutant ou intermédiaire) de street workout. Destinée à ceux qui veulent évoluer dans leur entraînement tout en rejoignant la communauté StreetWork'in et soutenir l'association.",
    unitPriceInEuros: 175,
    billingPeriodName: "an",
    maximumQuantityPerPerson: 1,
  },
  {
    uniqueOptionId: "classic-monthly",
    optionDisplayName: "Adhérent classique — paiement mensuel",
    longDescriptionText:
      "Même formule que l'adhérent classique, en paiement mensuel récurrent (12 mois). Idéal pour étaler la cotisation.",
    unitPriceInEuros: 17.5,
    billingPeriodName: "mois",
    maximumQuantityPerPerson: 1,
  },
];


export const LIST_OF_CHECKOUT_TUNNEL_STEPS: OneCheckoutTunnelStep[] = [
  { stepUniqueId: "choice", stepDisplayLabel: "Choix de l'adhésion" },
  { stepUniqueId: "members", stepDisplayLabel: "Adhérents" },
  { stepUniqueId: "contact", stepDisplayLabel: "Coordonnées" },
  { stepUniqueId: "summary", stepDisplayLabel: "Récapitulatif" },
];


// TODO: connect to the HelloAsso API to read the real adherent count.
// For now we display this fixed number.
export const TOTAL_NUMBER_OF_REGISTERED_MEMBERS = 133;

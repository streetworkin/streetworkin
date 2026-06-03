// Import styles
import "./ui/team-showcase.scss";


// One person displayed as a circular avatar card.
// If `optionalProfilePhotoPath` is not provided, the card shows the person's initials
// on top of a colored gradient instead.
type OneTeamMember = {
  memberFullName: string;
  memberRoleLabel: string;
  optionalProfilePhotoPath?: string;
};

// One subsection of the team directory (Founders, Staff, Ambassadors, ...).
// The heading is split in two on purpose so we can highlight the second part in violet.
type OneTeamSubsection = {
  // First part of the title (e.g. "Les").
  headingFirstPart: string;
  // Second part of the title that we will display in violet (e.g. "Fondateurs").
  headingSecondPartInAccentColor: string;
  // Optional short paragraph shown under the title (used for the Founders subsection).
  optionalShortDescriptionLine?: string;
  listOfMembersInsideSubsection: OneTeamMember[];
};


// Returns the initials (max 2 letters) of a full name.
// Examples: "Marc Yeurc'h" → "MY", "Alice Couque-Castelnovo" → "AC".
function getInitialsFromFullName(theFullNameToShortenIntoInitials: string): string {
  const allWordsInsideTheFullName = theFullNameToShortenIntoInitials.split(/\s+/);
  const wordsThatAreNotEmpty = allWordsInsideTheFullName.filter(function (oneWord) {
    return oneWord.length > 0;
  });

  // We only keep the first 2 words to avoid initials longer than "XX".
  const firstTwoWordsToUse = wordsThatAreNotEmpty.slice(0, 2);

  let initialsBuiltSoFar = "";
  for (const oneFirstNameOrLastName of firstTwoWordsToUse) {
    initialsBuiltSoFar = initialsBuiltSoFar + oneFirstNameOrLastName[0];
  }
  return initialsBuiltSoFar.toUpperCase();
}


// TODO: replace placeholders with the real StreetWork'in team members once communicated.
const LIST_OF_TEAM_SUBSECTIONS: OneTeamSubsection[] = [
  // NOTE: photo order follows member order. If photo ↔ founder mismatch, swap _1/_2/_3 suffixes.
  {
    headingFirstPart: "Les",
    headingSecondPartInAccentColor: "Fondateurs",
    optionalShortDescriptionLine:
      "Découvrez l'équipe qui porte la vision et les valeurs de StreetWork'in au quotidien.",
    listOfMembersInsideSubsection: [
      { memberFullName: "Marc Yeurc'h", memberRoleLabel: "Trésorier", optionalProfilePhotoPath: "/assets/fondateur_1.jpg" },
      { memberFullName: "Maxime Ait-Chadi", memberRoleLabel: "Président", optionalProfilePhotoPath: "/assets/fondateur_2.jpg" },
      { memberFullName: "Alice Couque-Castelnovo", memberRoleLabel: "Secrétaire", optionalProfilePhotoPath: "/assets/fondateur_3.jpg" },
    ],
  },
  {
    headingFirstPart: "Le",
    headingSecondPartInAccentColor: "staff",
    listOfMembersInsideSubsection: [
      { memberFullName: "Chloé Rossignol", memberRoleLabel: "Responsable Pôle Partenariats et Sponsoring" },
      { memberFullName: "Johan Sanon", memberRoleLabel: "Responsable Pôle Sportif" },
      { memberFullName: "Loïc Kuentz", memberRoleLabel: "Responsable Pôle Événementiel" },
      { memberFullName: "Mathieu Ardoin", memberRoleLabel: "Responsable Pôle Technologique" },
      { memberFullName: "Marc Yeurc'h", memberRoleLabel: "Responsable Pôle Communication" },
    ],
  },
  // TODO: replace placeholder ambassador names ("Prénom Nom N") with the real names.
  // The 10 photos are already stored under /public/assets/ambassadeur_1..10.jpg.
  {
    headingFirstPart: "Nos",
    headingSecondPartInAccentColor: "ambassadeurs",
    listOfMembersInsideSubsection: [
      { memberFullName: "Prénom Nom 1", memberRoleLabel: "Ambassadeur", optionalProfilePhotoPath: "/assets/ambassadeur_1.jpg" },
      { memberFullName: "Prénom Nom 2", memberRoleLabel: "Ambassadeur", optionalProfilePhotoPath: "/assets/ambassadeur_2.jpg" },
      { memberFullName: "Prénom Nom 3", memberRoleLabel: "Ambassadeur", optionalProfilePhotoPath: "/assets/ambassadeur_3.jpg" },
      { memberFullName: "Prénom Nom 4", memberRoleLabel: "Ambassadeur", optionalProfilePhotoPath: "/assets/ambassadeur_4.jpg" },
      { memberFullName: "Prénom Nom 5", memberRoleLabel: "Ambassadeur", optionalProfilePhotoPath: "/assets/ambassadeur_5.jpg" },
      { memberFullName: "Prénom Nom 10", memberRoleLabel: "Ambassadeur", optionalProfilePhotoPath: "/assets/ambassadeur_10.jpg" },
      { memberFullName: "Prénom Nom 7", memberRoleLabel: "Ambassadeur", optionalProfilePhotoPath: "/assets/ambassadeur_7.jpg" },
      { memberFullName: "Prénom Nom 8", memberRoleLabel: "Ambassadeur", optionalProfilePhotoPath: "/assets/ambassadeur_8.jpg" },
      { memberFullName: "Prénom Nom 9", memberRoleLabel: "Ambassadeur", optionalProfilePhotoPath: "/assets/ambassadeur_9.jpg" },
      { memberFullName: "Prénom Nom 6", memberRoleLabel: "Ambassadeur", optionalProfilePhotoPath: "/assets/ambassadeur_6.jpg" },
    ],
  },
];


export default function TeamShowcase() {
  return (
    <section id="team" className="team-showcase">
      {LIST_OF_TEAM_SUBSECTIONS.map(function (oneTeamSubsection) {
        const stableReactKeyForSubsection = `${oneTeamSubsection.headingFirstPart}-${oneTeamSubsection.headingSecondPartInAccentColor}`;

        return (
          <section key={stableReactKeyForSubsection} className="team-showcase__section">
            <h3 className="team-showcase__heading">
              {oneTeamSubsection.headingFirstPart}{" "}
              <span className="team-showcase__heading-accent">
                {oneTeamSubsection.headingSecondPartInAccentColor}
              </span>
            </h3>

            {oneTeamSubsection.optionalShortDescriptionLine && (
              <p className="team-showcase__description">
                {oneTeamSubsection.optionalShortDescriptionLine}
              </p>
            )}

            <div className="team-showcase__grid">
              {oneTeamSubsection.listOfMembersInsideSubsection.map(function (oneTeamMember) {
                const stableReactKeyForMember = `${stableReactKeyForSubsection}-${oneTeamMember.memberFullName}-${oneTeamMember.memberRoleLabel}`;

                return (
                  <article key={stableReactKeyForMember} className="team-showcase__card">
                    <div className="team-showcase__avatar">
                      {oneTeamMember.optionalProfilePhotoPath ? (
                        <img
                          src={oneTeamMember.optionalProfilePhotoPath}
                          alt={oneTeamMember.memberFullName}
                          className="team-showcase__photo"
                        />
                      ) : (
                        <span className="team-showcase__initials" aria-hidden="true">
                          {getInitialsFromFullName(oneTeamMember.memberFullName)}
                        </span>
                      )}
                    </div>
                    <h4 className="team-showcase__name">{oneTeamMember.memberFullName}</h4>
                    <p className="team-showcase__role">{oneTeamMember.memberRoleLabel}</p>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </section>
  );
}

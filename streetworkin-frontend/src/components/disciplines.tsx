// Import Components and libraries
import { Fragment, type ReactNode } from "react";
import { STREET_WORKOUT_PREVIEW_VIDEO_PATH } from "@/constants/site-media";
import ClickToUnmuteVideo from "@/components/click-to-unmute-video";

// Import styles
import "./ui/disciplines.scss";


type OneStreetWorkoutDiscipline = {
  disciplineName: string;
  shortDescriptionLine: string;
  inlineSvgPictogramIcon: ReactNode;
};

type OneStreetWorkoutDisciplineGroup = {
  // Optional title shown as a decorative separator before the cards of this group.
  optionalGroupSeparatorLabel?: string;
  listOfDisciplinesInsideGroup: OneStreetWorkoutDiscipline[];
};


// Simple SVG pictograms representing each movement.
// `fill="currentColor"` → the icon color is inherited from its parent CSS class.
const SVG_ICON_FOR_MUSCLE_UP = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="4" y="3" width="16" height="2" rx="1" />
    <rect x="11" y="5" width="2" height="12" />
    <circle cx="12" cy="19" r="3" />
  </svg>
);

const SVG_ICON_FOR_TRACTION = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="4" y="3" width="16" height="2" rx="1" fill="currentColor" />
    <path
      d="M12 17 L12 7 M8 11 L12 7 L16 11"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="20" r="2" fill="currentColor" />
  </svg>
);

const SVG_ICON_FOR_DIPS = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="3" y="4" width="2.5" height="16" rx="1" />
    <rect x="18.5" y="4" width="2.5" height="16" rx="1" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const SVG_ICON_FOR_SQUAT = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="5" r="2.5" fill="currentColor" />
    <path
      d="M12 7.5 L12 14 M12 14 L8 19 M12 14 L16 19"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="6"
      y1="20.5"
      x2="18"
      y2="20.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);


// Disciplines grouped by category. A group can optionally show a separator label
// before its cards (used here to introduce the "Multi Lift" subcategory).
const LIST_OF_STREET_WORKOUT_DISCIPLINE_GROUPS: OneStreetWorkoutDisciplineGroup[] = [
  {
    optionalGroupSeparatorLabel: "Freestyle",
    listOfDisciplinesInsideGroup: [
      {
        disciplineName: "Agility",
        shortDescriptionLine: "Combinaison explosive",
        inlineSvgPictogramIcon: SVG_ICON_FOR_MUSCLE_UP,
      },
      {
        disciplineName: "Static",
        shortDescriptionLine: "Mouvement de tirage vertical",
        inlineSvgPictogramIcon: SVG_ICON_FOR_TRACTION,
      },
    ],
  },
  {
    optionalGroupSeparatorLabel: "Multi Lift",
    listOfDisciplinesInsideGroup: [
      {
        disciplineName: "Street Lifting",
        shortDescriptionLine: "Poussée parallèle",
        inlineSvgPictogramIcon: SVG_ICON_FOR_DIPS,
      },
      {
        disciplineName: "Sets & Reps",
        shortDescriptionLine: "Force des jambes",
        inlineSvgPictogramIcon: SVG_ICON_FOR_SQUAT,
      },
    ],
  },
];


export default function Disciplines() {
  return (
    <section id="disciplines" className="disciplines">
      <span className="disciplines__separator" aria-hidden="true" />

      <h2 className="disciplines__heading">
        <span className="disciplines__heading-accent">Street Workout</span>
      </h2>

      <p className="disciplines__intro">
        Le Street Workout est une discipline sportive née de la culture du street workout,
        combinant force, technique et performance. Les athlètes s&apos;affrontent sur des
        mouvements fondamentaux comme les tractions et les dips, avec une charge additionnelle.
      </p>

      {/* Showcase: column of cards on the left + the preview video on the right (desktop).
          On tablet/mobile, this stacks vertically (cards 2x2 then video). */}
      <div className="disciplines__showcase">
        <div className="disciplines__grid">
          {LIST_OF_STREET_WORKOUT_DISCIPLINE_GROUPS.map(function (oneDisciplineGroup) {
            // Use the first discipline name of the group as a stable React key (always unique).
            const stableReactKeyForGroup =
              oneDisciplineGroup.listOfDisciplinesInsideGroup[0].disciplineName;
            return (
              <Fragment key={stableReactKeyForGroup}>
                {oneDisciplineGroup.optionalGroupSeparatorLabel && (
                  <div className="disciplines__group-divider">
                    <span className="disciplines__group-label">
                      {oneDisciplineGroup.optionalGroupSeparatorLabel}
                    </span>
                  </div>
                )}
                {oneDisciplineGroup.listOfDisciplinesInsideGroup.map(function (oneDiscipline) {
                  return (
                    <article key={oneDiscipline.disciplineName} className="disciplines__card">
                      <div className="disciplines__icon">{oneDiscipline.inlineSvgPictogramIcon}</div>
                      <h4 className="disciplines__name">{oneDiscipline.disciplineName}</h4>
                      <p className="disciplines__description">
                        {oneDiscipline.shortDescriptionLine}
                      </p>
                    </article>
                  );
                })}
              </Fragment>
            );
          })}
        </div>

        {/* Preview video — autoplay muted, click to enable sound. */}
        <div className="disciplines__media">
          <ClickToUnmuteVideo
            videoFileSourceUrl={STREET_WORKOUT_PREVIEW_VIDEO_PATH}
            videoTagClassName="disciplines__video"
            screenReaderAriaLabel="Aperçu vidéo du Street Workout"
          />
        </div>
      </div>
    </section>
  );
}

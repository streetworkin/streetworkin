// Import Components and libraries
import { STREET_WORKIN_PREVIEW_VIDEO_PATH } from "@/constants/site-media";
import ClickToUnmuteVideo from "@/components/click-to-unmute-video";

// Import styles
import "./ui/street-workout-intro.scss";


// Small inline SVG icon (question mark inside a circle). No external icon library added.
const SVG_ICON_FOR_QUESTION_MARK = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
  </svg>
);


export default function StreetWorkoutIntro() {
  return (
    <section id="streetworkin" className="street-workout-intro">
      {/* Left column: preview video for Street Work'in — click on the video to enable sound. */}
      <div className="street-workout-intro__media">
        <ClickToUnmuteVideo
          videoFileSourceUrl={STREET_WORKIN_PREVIEW_VIDEO_PATH}
          videoTagClassName="street-workout-intro__video"
          screenReaderAriaLabel="Aperçu vidéo Street Work'in"
        />
      </div>

      {/* Right column: badge + heading + description. */}
      <div className="street-workout-intro__content">
        <span className="street-workout-intro__badge">
          <span className="street-workout-intro__badge-icon">{SVG_ICON_FOR_QUESTION_MARK}</span>
          Découvrir
        </span>

        <h2 className="street-workout-intro__heading">
          <span className="street-workout-intro__heading-accent">
            Street Work&apos;in
          </span>
        </h2>

        <p className="street-workout-intro__description">
          Le street workout ou calisthenics, du grec{" "}
          <em>Khalos Sthenos</em> (« beauté de la force »), est un
          sport-spectacle en pleine explosion, mêlant force, agilité et
          équilibre. Utilisant uniquement le poids du corps, il transforme la
          performance en un spectacle vivant, où les athlètes repoussent les
          limites de leurs corps.
        </p>
      </div>
    </section>
  );
}

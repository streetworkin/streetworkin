"use client";
import { useEffect, useRef } from "react";
import {
  MAIN_BACKGROUND_VIDEO_PATH,
  MAIN_BACKGROUND_VIDEO_POSTER_IMAGE,
} from "@/constants/site-media";
import { useBackgroundMode } from "@/hooks/use-background-mode";

// This component renders the looping background video that lives behind every page.
// It also reads the current route to know if it should pause, blur or play normally.
export function SiteVideoBackground() {
  const backgroundVideoElementReference = useRef<HTMLVideoElement>(null);
  const { shouldHideTheBackgroundVideo, shouldBlurTheBackgroundVideo } = useBackgroundMode();

  useEffect(function pauseOrPlayWhenHiddenStateChanges() {
    const backgroundVideoDomElement = backgroundVideoElementReference.current;
    if (!backgroundVideoDomElement) return;

    if (shouldHideTheBackgroundVideo) {
      backgroundVideoDomElement.pause();
    } else {
      backgroundVideoDomElement.play();
    }
  }, [shouldHideTheBackgroundVideo]);

  const rootContainerClassName = shouldHideTheBackgroundVideo
    ? "site-media-root site-media-root--hidden"
    : "site-media-root";

  const videoTagClassName = shouldBlurTheBackgroundVideo
    ? "site-media-video site-media-video--blurred"
    : "site-media-video";

  return (
    <div className={rootContainerClassName} aria-hidden>
      <video
        ref={backgroundVideoElementReference}
        className={videoTagClassName}
        src={MAIN_BACKGROUND_VIDEO_PATH}
        poster={MAIN_BACKGROUND_VIDEO_POSTER_IMAGE}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="site-media-gradient" />
    </div>
  );
}

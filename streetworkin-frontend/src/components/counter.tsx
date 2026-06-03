"use client";
// Import Components and libraries
import { useEffect, useState } from "react";


type NumberCountUpProps = {
  finalNumberToReach: number;
  animationTotalDurationInMs?: number;
};


/**
 * Displays a number that animates from 0 up to a final value.
 * The animation runs at ~60 frames per second using requestAnimationFrame.
 */
export default function NumberCountUp({
  finalNumberToReach,
  animationTotalDurationInMs = 4000,
}: NumberCountUpProps) {
  const [currentNumberToDisplay, setCurrentNumberToDisplay] = useState(0);

  useEffect(function animateCounterFromZeroToTargetWhenMounted() {
    const animationStartTimeInMs = performance.now();
    let animationFrameRequestId = 0;

    // Called by the browser ~60 times per second. Each call computes how far we are
    // through the animation and updates the displayed number accordingly.
    function updateDisplayedNumberOnEveryAnimationFrame() {
      const elapsedTimeSinceStartInMs = performance.now() - animationStartTimeInMs;
      const animationProgressRatioBetweenZeroAndOne =
        elapsedTimeSinceStartInMs / animationTotalDurationInMs;

      // If the animation is complete, snap to the final number and stop scheduling new frames.
      if (animationProgressRatioBetweenZeroAndOne >= 1) {
        setCurrentNumberToDisplay(finalNumberToReach);
        return;
      }

      const computedNumberForThisFrame = Math.floor(
        animationProgressRatioBetweenZeroAndOne * finalNumberToReach,
      );
      setCurrentNumberToDisplay(computedNumberForThisFrame);
      animationFrameRequestId = requestAnimationFrame(updateDisplayedNumberOnEveryAnimationFrame);
    }

    animationFrameRequestId = requestAnimationFrame(updateDisplayedNumberOnEveryAnimationFrame);

    return function cancelTheAnimationLoopWhenComponentIsRemoved() {
      cancelAnimationFrame(animationFrameRequestId);
    };
  }, [finalNumberToReach, animationTotalDurationInMs]);

  return <>{currentNumberToDisplay}</>;
}

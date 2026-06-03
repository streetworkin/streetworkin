"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ROUTES_WHERE_BACKGROUND_VIDEO_IS_BLURRED,
  ROUTES_WHERE_BACKGROUND_VIDEO_IS_HIDDEN,
} from "@/constants/site-media";
import { APP_ROUTE_PATHS, type OneAppRoutePath } from "@/constants/routes";


// On the home page, the background video starts blurring once we have scrolled
// past half of the screen height. We keep a ratio (not a fixed pixel value)
// so the blur trigger feels the same on a phone or a giant monitor.
const HOME_BLUR_SCROLL_THRESHOLD_RATIO = 0.5;


// This custom hook decides how the background video should look right now.
// It returns two booleans:
//   - shouldHideTheBackgroundVideo: hide and pause the video completely
//   - shouldBlurTheBackgroundVideo: keep the video visible but blurred
export function useBackgroundMode() {
  const currentRouteUrlPath = usePathname();
  const [userHasScrolledPastHomeThreshold, setUserHasScrolledPastHomeThreshold] = useState(false);

  useEffect(function watchScrollPositionOnHomePage() {
    // The scroll-to-blur behavior only applies to the home page.
    // On other pages, the blur is decided only by the route list.
    if (currentRouteUrlPath !== APP_ROUTE_PATHS.homePage) {
      setUserHasScrolledPastHomeThreshold(false);
      return;
    }

    function handleWindowScrollEvent() {
      const scrollThresholdInPixels = window.innerHeight * HOME_BLUR_SCROLL_THRESHOLD_RATIO;
      setUserHasScrolledPastHomeThreshold(window.scrollY > scrollThresholdInPixels);
    }

    // Run once at mount in case the user refreshed the page while already scrolled.
    handleWindowScrollEvent();
    window.addEventListener("scroll", handleWindowScrollEvent, { passive: true });

    return function removeScrollListenerWhenLeavingPage() {
      window.removeEventListener("scroll", handleWindowScrollEvent);
    };
  }, [currentRouteUrlPath]);

  const currentPathAsRoute = currentRouteUrlPath as OneAppRoutePath;
  const isCurrentRouteInHiddenList = ROUTES_WHERE_BACKGROUND_VIDEO_IS_HIDDEN.includes(currentPathAsRoute);
  const isCurrentRouteInBlurredList = ROUTES_WHERE_BACKGROUND_VIDEO_IS_BLURRED.includes(currentPathAsRoute);

  return {
    shouldHideTheBackgroundVideo: isCurrentRouteInHiddenList,
    shouldBlurTheBackgroundVideo: isCurrentRouteInBlurredList || userHasScrolledPastHomeThreshold,
  };
}

import { APP_ROUTE_PATHS, type OneAppRoutePath } from "@/constants/routes";

// This file lists all the video and image paths used as backgrounds across the site.
// Keeping them here makes it easy to swap them later without searching the codebase.


// Path to the main background video file (placed under public/assets).
export const MAIN_BACKGROUND_VIDEO_PATH = "/assets/fitlyon_compressed.mp4";

// Path to the still image shown before the background video loads.
export const MAIN_BACKGROUND_VIDEO_POSTER_IMAGE = "/assets/fitlyon_poster.jpg";

// Path to the small preview video shown inside the "Street Workout" section.
export const STREET_WORKOUT_PREVIEW_VIDEO_PATH = "/assets/streetworkout_pre.mp4";

// Path to the small preview video shown inside the "Street Work'in" section.
export const STREET_WORKIN_PREVIEW_VIDEO_PATH = "/assets/streetworkin_pre.mp4";


// On these pages, the background video is blurred (gives a softer look behind login/register forms).
export const ROUTES_WHERE_BACKGROUND_VIDEO_IS_BLURRED: OneAppRoutePath[] = [
  APP_ROUTE_PATHS.loginPage,
  APP_ROUTE_PATHS.registerPage,
];

// On these pages, the background video is completely hidden and paused.
// Empty for now — we keep the array so the code that reads it does not crash.
export const ROUTES_WHERE_BACKGROUND_VIDEO_IS_HIDDEN: OneAppRoutePath[] = [];

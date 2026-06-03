// This file lists every page URL that exists in our application.
// We keep them in one place so that if a URL changes one day, we only change it here.

export type OneAppRoutePath = "/" | "/login" | "/register";

export const APP_ROUTE_PATHS = {
  homePage: "/" as OneAppRoutePath,
  loginPage: "/login" as OneAppRoutePath,
  registerPage: "/register" as OneAppRoutePath,
};

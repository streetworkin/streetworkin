"use client";
// Import Components and libraries
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { APP_ROUTE_PATHS } from "@/constants/routes";

// Import styles
import "./ui/header.scss";


// Navigation links shown in the header on both desktop (in a row) and mobile (in a dropdown).
// Each link is an anchor (#section-id) that jumps to a section on the home page.
const LIST_OF_MAIN_NAVIGATION_LINKS = [
  { destinationUrl: "/#disciplines", displayLabel: "Street Workout" },
  { destinationUrl: "/#streetworkin", displayLabel: "Street Work'in" },
  { destinationUrl: "/#events", displayLabel: "Nos Events" },
  { destinationUrl: "/#team", displayLabel: "Le directoire" },
];


// Number of pixels the user must scroll down before the header switches to its "scrolled" look
// (dark background + full viewport width).
const SCROLL_DISTANCE_TO_TRIGGER_SCROLLED_HEADER = 50;


export default function Header() {
  const [isMobileDropdownMenuOpen, setIsMobileDropdownMenuOpen] = useState(false);
  const [hasUserScrolledPastHeaderThreshold, setHasUserScrolledPastHeaderThreshold] =
    useState(false);

  useEffect(function watchScrollToToggleScrolledHeaderLook() {
    // Read the current scroll position and decide whether the header should look "scrolled".
    function checkScrollPositionAndUpdate() {
      const scrollPositionInPixels = window.scrollY;
      const shouldShowScrolledHeader =
        scrollPositionInPixels > SCROLL_DISTANCE_TO_TRIGGER_SCROLLED_HEADER;
      setHasUserScrolledPastHeaderThreshold(shouldShowScrolledHeader);
    }

    // Listen to scroll events (passive = better performance, no scroll-blocking).
    window.addEventListener("scroll", checkScrollPositionAndUpdate, { passive: true });
    // Run once at mount in case the user landed on the page already scrolled (after a refresh).
    checkScrollPositionAndUpdate();

    return function removeScrollListenerWhenComponentIsRemoved() {
      window.removeEventListener("scroll", checkScrollPositionAndUpdate);
    };
  }, []);

  function toggleMobileDropdownMenu() {
    setIsMobileDropdownMenuOpen(!isMobileDropdownMenuOpen);
  }

  function closeMobileDropdownMenu() {
    setIsMobileDropdownMenuOpen(false);
  }

  const headerClassName = hasUserScrolledPastHeaderThreshold
    ? "site-header site-header--scrolled"
    : "site-header";

  const burgerButtonAriaLabel = isMobileDropdownMenuOpen ? "Fermer le menu" : "Ouvrir le menu";
  const burgerButtonSymbol = isMobileDropdownMenuOpen ? "✕" : "☰";

  return (
    <header className={headerClassName}>
      <div className="site-header__wrapper">
        <div className="site-header__inner">
          <Link href={APP_ROUTE_PATHS.homePage} className="site-header__logo">
            <Image
              src="/assets/logo1.png"
              alt="StreetWork'in Logo"
              width={615}
              height={406}
              className="site-header__logo-img"
              loading="eager"
            />
          </Link>

          <nav
            className="site-header__nav site-header__nav--wide"
            aria-label="Navigation principale"
          >
            {LIST_OF_MAIN_NAVIGATION_LINKS.map(function (oneNavigationLink) {
              return (
                <Link
                  key={oneNavigationLink.destinationUrl}
                  href={oneNavigationLink.destinationUrl}
                  className="site-header__nav-item"
                >
                  <p className="site-header__nav-link">{oneNavigationLink.displayLabel}</p>
                </Link>
              );
            })}
          </nav>

          <Link href={APP_ROUTE_PATHS.registerPage} className="site-header__cta">
            Nous rejoindre
          </Link>

          <button
            type="button"
            className="site-header__burger"
            onClick={toggleMobileDropdownMenu}
            aria-label={burgerButtonAriaLabel}
          >
            {burgerButtonSymbol}
          </button>
        </div>

        {isMobileDropdownMenuOpen && (
          <nav className="site-header__dropdown" aria-label="Menu mobile">
            {LIST_OF_MAIN_NAVIGATION_LINKS.map(function (oneNavigationLink) {
              return (
                <Link
                  key={oneNavigationLink.destinationUrl}
                  href={oneNavigationLink.destinationUrl}
                  className="site-header__nav-item"
                  onClick={closeMobileDropdownMenu}
                >
                  <p className="site-header__nav-link">{oneNavigationLink.displayLabel}</p>
                </Link>
              );
            })}
            <Link
              href={APP_ROUTE_PATHS.registerPage}
              className="site-header__cta site-header__cta--dropdown"
              onClick={closeMobileDropdownMenu}
            >
              Nous rejoindre
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

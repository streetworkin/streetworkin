// Import Components and libraries
import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";


// Props accepted by the Button component.
// - If `optionalNavigationUrl` is provided, the button is rendered as a Next.js <Link>.
// - Otherwise it is rendered as a regular HTML <button>.
type ButtonReusableComponentProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> & {
  buttonContentToDisplay: ReactNode;
  optionalNavigationUrl?: string;
  optionalClickEventHandler?: MouseEventHandler<HTMLElement>;
};


export default function Button({
  buttonContentToDisplay,
  type = "button",
  className,
  optionalNavigationUrl,
  optionalClickEventHandler,
  ...remainingHtmlButtonAttributes
}: ButtonReusableComponentProps) {
  // If a navigation URL is provided, we render a real link so the browser can use it
  // (right-click, open in new tab, etc.) and Next.js can prefetch the target page.
  if (optionalNavigationUrl) {
    return (
      <Link
        href={optionalNavigationUrl}
        className={className}
        onClick={optionalClickEventHandler}
      >
        {buttonContentToDisplay}
      </Link>
    );
  }

  // Otherwise it is a regular interactive button.
  return (
    <button
      type={type}
      className={className}
      onClick={optionalClickEventHandler}
      {...remainingHtmlButtonAttributes}
    >
      {buttonContentToDisplay}
    </button>
  );
}

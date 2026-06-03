// Import styles
import "./ui/footer.scss";


// Social media links shown as round icons in the footer.
// TODO: replace href values with the real StreetWork'in social accounts when available.
const LIST_OF_SOCIAL_MEDIA_LINKS = [
  {
    socialMediaPlatformName: "Instagram",
    accountProfileUrl: "https://www.instagram.com/streetworkin_/",
    inlineSvgIcon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    socialMediaPlatformName: "Snapchat",
    accountProfileUrl: "https://www.snapchat.com/",
    inlineSvgIcon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true">
        <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06-.014.213c-.012.182-.022.343-.03.511.078.044.18.072.286.072.214-.012.534-.137.788-.244.094-.045.207-.073.293-.078.107-.003.213.024.286.063.227.114.366.288.366.49.005.245-.225.483-.726.766-.103.057-.236.075-.366.131-.286.117-.681.244-.815.566-.063.157-.044.366.073.59l.014.027c.04.095 1.012 2.36 3.219 2.722.176.029.302.181.292.371.001.105-.067.221-.139.286-.297.272-.96.391-1.612.561-.158.04-.273.213-.36.439-.082.213-.146.434-.207.66-.082.302-.234.376-.45.376-.171 0-.398-.043-.66-.131-.456-.157-.881-.244-1.293-.244-.171 0-.347.014-.521.044-.661.114-1.224.5-1.871.945-.945.661-2.013 1.408-3.704 1.408-.067 0-.131-.005-.197-.005-.072.004-.132.005-.197.005-1.692 0-2.76-.747-3.704-1.408-.647-.445-1.21-.831-1.871-.945-.174-.03-.35-.044-.521-.044-.412 0-.837.087-1.293.244-.262.088-.489.131-.66.131-.215 0-.367-.074-.45-.376-.061-.226-.125-.447-.207-.66-.087-.226-.202-.399-.36-.439-.652-.17-1.315-.289-1.612-.561-.072-.065-.14-.181-.139-.286-.01-.19.116-.342.292-.371 2.207-.362 3.179-2.627 3.219-2.722l.014-.027c.117-.224.136-.433.073-.59-.134-.322-.529-.449-.815-.566-.13-.056-.263-.074-.366-.131-.501-.283-.731-.521-.726-.766 0-.202.139-.376.366-.49.073-.039.179-.066.286-.063.086.005.199.033.293.078.254.107.574.232.788.244.106 0 .208-.028.286-.072-.008-.168-.018-.329-.03-.511l-.014-.213-.003-.06c-.104-1.628-.231-3.654.299-4.847C7.86 1.069 11.216.793 12.206.793z" />
      </svg>
    ),
  },
  {
    socialMediaPlatformName: "TikTok",
    accountProfileUrl: "https://www.tiktok.com/",
    inlineSvgIcon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.66 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.7-.1z" />
      </svg>
    ),
  },
];


// Three columns of placeholder text shown at the top of the footer.
// TODO: replace these lorem ipsum lines with real association info (address, hours, etc.).
const LIST_OF_FOOTER_TEXT_COLUMNS = [
  [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore.",
  ],
  [
    "Ut enim ad minim veniam, quis nostrud exercitation.",
    "Ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  ],
  [
    "Duis aute irure dolor in reprehenderit in voluptate velit.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
  ],
];


export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__wrapper">
        <div className="site-footer__inner">
          <div className="site-footer__top">
            <div className="site-footer__columns">
              {LIST_OF_FOOTER_TEXT_COLUMNS.map(function (oneColumnOfTextLines, oneColumnPosition) {
                return (
                  <div key={oneColumnPosition} className="site-footer__column">
                    {oneColumnOfTextLines.map(function (oneTextLineInColumn, oneTextLinePosition) {
                      return (
                        <p key={oneTextLinePosition} className="site-footer__text">
                          {oneTextLineInColumn}
                        </p>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="site-footer__socials">
              {LIST_OF_SOCIAL_MEDIA_LINKS.map(function (oneSocialMediaLink) {
                return (
                  <a
                    key={oneSocialMediaLink.socialMediaPlatformName}
                    href={oneSocialMediaLink.accountProfileUrl}
                    className="site-footer__social"
                    aria-label={oneSocialMediaLink.socialMediaPlatformName}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {oneSocialMediaLink.inlineSvgIcon}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="site-footer__bottom">
            <p className="site-footer__copyright">© 2026 StreetWork&apos;in</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

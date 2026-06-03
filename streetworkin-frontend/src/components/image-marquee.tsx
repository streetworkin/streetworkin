// Import styles
import "./ui/image-marquee.scss";


// One image displayed in the scrolling marquee strip (one card with one img inside).
type OneImageMarqueeItem = {
  imageFileSourceUrl: string;
  shortAltDescription: string;
};


/**
 * A scrolling row of images that loops infinitely from right to left.
 * The animation is 100% CSS (see @keyframes inside image-marquee.scss).
 *
 * We render every item TWICE inside the strip on purpose: the CSS animation
 * translates the strip from 0 to -50% of its own width. Because the items
 * are duplicated, -50% lands exactly on the start of the second copy, which
 * looks identical to the first → the loop is seamless.
 */
export default function ImageMarquee({
  listOfImagesToScroll,
}: {
  listOfImagesToScroll: OneImageMarqueeItem[];
}) {
  return (
    <div className="image-marquee">
      <div className="image-marquee__track">
        {/* First copy — visible to screen readers (each item has a real alt). */}
        {listOfImagesToScroll.map(function (oneImageItem) {
          return (
            <div key={`a-${oneImageItem.shortAltDescription}`} className="image-marquee__card">
              <img
                src={oneImageItem.imageFileSourceUrl}
                alt={oneImageItem.shortAltDescription}
                className="image-marquee__img"
              />
            </div>
          );
        })}

        {/* Second copy — decorative duplicate used only by the CSS to keep the loop smooth. */}
        {listOfImagesToScroll.map(function (oneImageItem) {
          return (
            <div
              key={`b-${oneImageItem.shortAltDescription}`}
              className="image-marquee__card"
              aria-hidden="true"
            >
              <img
                src={oneImageItem.imageFileSourceUrl}
                alt=""
                className="image-marquee__img"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

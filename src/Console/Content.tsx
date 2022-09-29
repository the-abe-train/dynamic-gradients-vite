import { calcScroll, listToString, radToDeg } from "../util";

type Props = {
  cssClass: string;
  gradient: number;
  coloursList: string[];
  speed: number;
  scroll: number;
};

export function Content({
  cssClass,
  gradient,
  scroll,
  speed,
  coloursList,
}: Props) {
  const { x1, y1, x2, y2, x3, y3 } = calcScroll(scroll);
  const growth = coloursList.length * 200;

  return (
    <div id="output-area">
      <span>.{cssClass} &#123; </span> <br />
      <span className="indent">
        background: linear-gradient({radToDeg(gradient)}deg,{" "}
        {listToString(coloursList)});
      </span>{" "}
      <br />
      <span className="indent">
        background-size: {growth}% {growth}%;
      </span>{" "}
      <br />
      <span className="indent">
        animation: GradientAnimation {60 - speed}s ease infinite;
      </span>{" "}
      <br />
      <span>&#125;</span> <br />
      <br />
      <span>@keyframes GradientAnimation &#123;</span> <br />
      <span className="indent">
        0%&#123;background-position: {x1}% {y1}%&#125;
      </span>{" "}
      <br />
      <span className="indent">
        50%&#123;background-position: {x2}% {y2}%&#125;
      </span>{" "}
      <br />
      <span className="indent">
        100%&#123;background-position:{x3}% {y3}%&#125;
      </span>{" "}
      <br />
      <span>&#125;</span>
    </div>
  );
}

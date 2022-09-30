import {
  useEffect,
  useRef,
  MouseEvent,
  TouchEvent,
  KeyboardEvent,
} from "react";
import dialImage from "../assets/dial.svg";

type Props = {
  name: string;
  angle: number;
  setAngle: (n: number) => void;
};

export function Wheel({ name, angle, setAngle }: Props) {
  const wheelRef = useRef<HTMLImageElement>(null!);

  const title = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();

  let rotation;

  function activateDrag(e: Event | MouseEvent | TouchEvent) {
    // Stop scrolling when dragging on mobile
    e.preventDefault();
    e.stopPropagation();

    const wheelElement = wheelRef.current;
    const wheelRect = wheelElement.getBoundingClientRect();
    const wheel = {
      wx: wheelRect.left + wheelRect.width / 2,
      wy: wheelRect.top + wheelRect.height / 2,
    };

    const mouseDrag = (e: Event) => {
      // console.log(e);

      // Stop scrolling when dragging on mobile
      e.preventDefault();
      e.stopPropagation();

      // @ts-ignore mouse vs touch issues
      const client = e.touches ? e.touches[0] : e;
      const point = { mx: client.clientX, my: client.clientY };
      let { mx, my } = point;
      let { wx, wy } = wheel;

      // Calculate angle
      rotation = Math.atan2(my - wy, mx - wx);
      setAngle(rotation);
    };

    const touchDrag = (e: Event) => {
      // console.log(e);

      // Stop scrolling when dragging on mobile
      e.preventDefault();
      e.stopPropagation();

      // @ts-ignore mouse vs touch issues
      const client = e.touches ? e.touches[0] : e;
      const point = { mx: client.clientX, my: client.clientY };
      let { mx, my } = point;
      let { wx, wy } = wheel;

      // Calculate angle
      rotation = Math.atan2(my - wy, mx - wx);
      setAngle(rotation);
    };

    const deactivateMouseDrag = (e: Event) => {
      document.removeEventListener("mousemove", mouseDrag);
    };

    const deactivateTouchDrag = (e: Event) => {
      document.removeEventListener("touchmove", touchDrag);
    };

    document.addEventListener("mousemove", mouseDrag, { passive: false });
    document.addEventListener("touchmove", touchDrag, { passive: false });
    document.addEventListener("mouseup", deactivateMouseDrag, {
      passive: false,
    });
    document.addEventListener("touchend", deactivateTouchDrag, {
      passive: false,
    });
  }

  function keyboardRotate(e: KeyboardEvent) {
    const clockwiseKeys = ["ArrowRight", "ArrowDown"];
    const widdershinsKeys = ["ArrowLeft", "ArrowUp"];
    if (clockwiseKeys.includes(e.key)) {
      e.preventDefault();
      setAngle(angle + 0.1);
    } else if (widdershinsKeys.includes(e.key)) {
      e.preventDefault();
      setAngle(angle - 0.1);
    }
  }

  useEffect(() => {
    const wheelElement = wheelRef.current;
    wheelElement.style.transform = `rotate(${angle}rad)`;
  }, [angle]);

  useEffect(() => {
    wheelRef.current.addEventListener("touchstart", activateDrag, {
      passive: false,
    });
  }, []);

  return (
    <div
      tabIndex={0}
      id={`${name}-wheel-subsection`}
      className="subsection"
      onKeyDown={keyboardRotate}
    >
      <label htmlFor="wheel">
        <h3>{title}</h3>
      </label>
      <img
        id={`${name}-wheel`}
        ref={wheelRef}
        className="wheel"
        src={dialImage}
        alt=""
        onMouseDown={activateDrag}
      />
    </div>
  );
}

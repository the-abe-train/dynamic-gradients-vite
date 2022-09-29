import { useEffect, useState } from "react";

import { Selector } from "./Selector";
import { Wheel } from "./Wheel";
import { Slider } from "./Slider";
import { Content } from "./Content";
import { Colours } from "./Colours";
import { Gist } from "./Gist";
import { Clipboard } from "./Clipboard";

import { cssString } from "../util";

export function Console() {
  const defaultSelector = "css-selector";
  const defaultGradient = 0;
  const defaultScroll = 0;
  const defaultSpeed = 30;
  const defaultColoursList = ["#B0F2B4", "#BAF2E9", "#BAD7F2"];

  const [cssClass, setCssClass] = useState(defaultSelector);
  const [gradient, setGradient] = useState(defaultGradient);
  const [scroll, setScroll] = useState(defaultScroll);
  const [speed, setSpeed] = useState(defaultSpeed);
  const [coloursList, setColoursList] = useState(defaultColoursList);
  const [square, setSquare] = useState<number | null>(null);
  const [preview, setPreview] = useState("");

  function resetConsole() {
    setCssClass(defaultSelector);
    setGradient(defaultGradient);
    setScroll(defaultScroll);
    setSpeed(defaultSpeed);
    setColoursList(defaultColoursList);
    setSquare(null);
  }

  useEffect(() => {
    const style = cssString(
      speed,
      coloursList,
      gradient,
      scroll,
      "html, #window"
    );
    setPreview(style);
  }, [speed, coloursList, gradient, scroll]);

  return (
    <main>
      <div id="controls" className="console-half">
        <div className="section">
          <h2>Design your gradient</h2>
          <div id="controls-functions">
            <Selector cssClass={cssClass} setCssClass={setCssClass} />
            <div id="wheels">
              <Wheel name="gradient" angle={gradient} setAngle={setGradient} />
              <Wheel name="scroll" angle={scroll} setAngle={setScroll} />
            </div>
            <Slider speed={speed} setSpeed={setSpeed} />
            <Colours
              coloursList={coloursList}
              setColoursList={setColoursList}
              square={square}
              setSquare={setSquare}
            />
          </div>
        </div>
      </div>
      <div id="window-section" className="section">
        <h2>Preview</h2>
        <div id="window"></div>
      </div>
      <div id="output-half" className="console-half">
        <div className="section">
          <h2>Copy and paste into CSS stylesheet</h2>
          <Content
            cssClass={cssClass}
            gradient={gradient}
            scroll={scroll}
            speed={speed}
            coloursList={coloursList}
          />
        </div>
        <div className="section">
          <span id="reset-span">
            <h2>Try a new gradient</h2>
            <button id="reset-btn" className="btn-1" onClick={resetConsole}>
              Reset
            </button>
          </span>
        </div>
        <div className="section">
          <h2>Save and share</h2>
          <div id="api-btns">
            <Clipboard
              cssClass={cssClass}
              gradient={gradient}
              scroll={scroll}
              speed={speed}
              coloursList={coloursList}
            />
            <Gist
              cssClass={cssClass}
              gradient={gradient}
              scroll={scroll}
              speed={speed}
              coloursList={coloursList}
            />
            <a
              href="https://www.buymeacoffee.com/theabetrain"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="btn-api"
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                id="coffee-btn"
              />
            </a>
          </div>
        </div>
      </div>
      <style> {preview} </style>
    </main>
  );
}

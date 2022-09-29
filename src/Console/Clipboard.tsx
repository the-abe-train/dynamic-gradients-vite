import { cssString } from "../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Props = {
  speed: number;
  coloursList: string[];
  gradient: number;
  scroll: number;
  cssClass: string;
};

export function Clipboard({
  speed,
  coloursList,
  gradient,
  scroll,
  cssClass,
}: Props) {
  const [show, setShow] = useState(false);

  async function copyToClipboard() {
    const cssSelector = `.${cssClass}`;
    const style = cssString(speed, coloursList, gradient, scroll, cssSelector);
    setShow(true);
    setTimeout(() => setShow(false), 2000);
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(style);
    } else {
      return document.execCommand("copy", true, style);
    }
  }

  return (
    <div id="copy-div">
      <button id="copy-btn" className="btn-api" onClick={copyToClipboard}>
        <span className="icon">
          <FontAwesomeIcon icon="copy" />
        </span>{" "}
        Clipboard
      </button>
      {show && <p id="small">Copied to clipboard!</p>}
    </div>
  );
}

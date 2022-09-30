import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cssString } from "../util";

type Props = {
  cssClass: string;
  gradient: number;
  coloursList: string[];
  speed: number;
  scroll: number;
};

export function Gist({
  speed,
  coloursList,
  gradient,
  scroll,
  cssClass,
}: Props) {
  const selector = `.${cssClass}`;
  let gistContent = cssString(speed, coloursList, gradient, scroll, selector);
  gistContent += "\n\n /* Created using dynamicgradients.com */";

  // const postGistApi = `${process.env.REACT_APP_DOMAIN}/postgist`;
  // const loginApi = `${process.env.REACT_APP_DOMAIN}/login`;
  const postGistApi = "/api/createGist";
  const loginApi = "";

  function postGist() {
    const data = {
      description: "CSS Dynamic Gradient",
      public: true,
      files: {
        "dynamic_gradient.css": {
          content: gistContent,
        },
      },
    };
    fetch(postGistApi, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      // .then(() => (window.location = loginApi))
      .then(() => console.log("clicked"))
      .catch((e) => console.error(e));
  }

  return (
    <button id="gist-btn" className="btn-api" onClick={postGist}>
      <span className="icon">
        <FontAwesomeIcon icon={["fab", "github"]} />{" "}
      </span>
      Gist{" "}
    </button>
  );
}

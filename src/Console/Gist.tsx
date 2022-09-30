import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { cssString } from "../util";

// PLAN
// useEffect on load sees if user has code in the the url
// If code in the url, fetch post api. If not, mount effect does nothing.
// Click the button
// User signs into github
// User is redirected back to main app, this time with code in url
// effect actually launches this time
// on cleanup, clean up the url

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

  const postGistApi = "/api/createGist";
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const githubLogin = `https://github.com/login/oauth/authorize?scope=gist&client_id=${clientId}`;

  const [msg, setMsg] = useState("");

  useEffect(() => {
    console.log("Gist loading");
    const code = new URL(window.location.toString()).searchParams.get("code");
    if (code) {
      const gist = {
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
        body: JSON.stringify({ gist, code }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => setMsg("Gist created!"))
        .catch((e) => console.error(e));
    }

    return () => {
      window.location.replace("localhost:8888");
    };
    // if (window.location)
  }, []);

  return (
    <div>
      <a href={githubLogin}>
        <button id="gist-btn" className="btn-api">
          {/* <button id="gist-btn" className="btn-api" onClick={postGist}> */}
          <span className="icon">
            <FontAwesomeIcon icon={["fab", "github"]} />{" "}
          </span>
          Gist
        </button>
      </a>
      {msg && <p>{msg}</p>}
    </div>
  );
}

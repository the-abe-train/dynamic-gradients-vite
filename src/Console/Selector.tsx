import { useEffect, useState } from "react";

type Props = {
  cssClass: string;
  setCssClass: (s: string) => void;
};

export function Selector({ cssClass, setCssClass }: Props) {
  const [error, setError] = useState("");

  useEffect(() => {
    const cssRegex = /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;
    if (!cssRegex.test(cssClass)) {
      setError("Class name must conform to css rules.");
    } else {
      setError("");
    }
  }, [cssClass]);

  return (
    <div className="subsection">
      <label htmlFor="selector">
        <h3>CSS Class</h3>
      </label>
      <input
        spellCheck="false"
        id="selector"
        name="selector"
        value={cssClass}
        type="text"
        onChange={(e) => setCssClass(e.target.value.toLowerCase())}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

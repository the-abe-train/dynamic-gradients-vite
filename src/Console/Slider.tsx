type Props = {
  speed: number;
  setSpeed: (n: number) => void;
};

export function Slider({ speed, setSpeed }: Props) {
  return (
    <div className="subsection">
      <label htmlFor="speed-input">
        <h3>Speed</h3>
      </label>
      <input
        type="range"
        name="speed"
        id="speed-input"
        min="1"
        max="59"
        value={speed}
        onChange={(e) => setSpeed(parseInt(e.target.value))}
      />
    </div>
  );
}

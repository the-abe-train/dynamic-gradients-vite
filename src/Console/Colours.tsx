import { HexColorPicker, HexColorInput } from "react-colorful";
import { useEffect, useState } from "react";

type PickerProps = {
  colour: string;
  setColour: (c: string) => void;
  show: boolean;
  setShow: (b: boolean) => void;
};

const Picker = ({ colour, setColour }: PickerProps) => {
  function setUpperColour(c: string) {
    setColour(c.toUpperCase());
  }

  return (
    <div id="colour-picker">
      <HexColorPicker color={colour} onChange={setUpperColour} />
      <HexColorInput color={colour} onChange={setUpperColour} />
    </div>
  );
};

type ColourSquareProps = {
  coloursList: string[];
  setColoursList: React.Dispatch<React.SetStateAction<string[]>>;
  squareColour: string;
  setColour: (c: string) => void;
  squareNumber: number;
  isActive: boolean;
  square: number | null;
  setSquare: (n: number | null) => void;
  activeColour: string;
};

function ColourSquare({
  coloursList,
  setColoursList,
  squareColour,
  setColour,
  squareNumber,
  isActive,
  square,
  setSquare,
  activeColour,
}: ColourSquareProps) {
  const [show, setShow] = useState(false);

  const style = {
    backgroundColor: isActive ? activeColour : squareColour,
    border: isActive ? ".2em solid" : "",
  };

  const activateSquare = () => {
    // if (show) {
    //   setShow(false);
    // } else {
    setColour(squareColour);
    setSquare(squareNumber);
    setShow(true);
    // }
  };

  function removeColour() {
    // 0 and null are the same for most conditial statements
    if (Number.isInteger(square)) {
      const newList = [...coloursList];
      newList.splice(square, 1);
      setColoursList(newList);
      setSquare(null);
    }
  }

  function blur(e: any) {
    // TODO Assuming it's "Return" on mac, but should really check
    const cancelKeys = ["Escape", "Enter", "Return"];
    if (e.type === "keydown" && cancelKeys.includes(e.key)) {
      e.preventDefault();
      setSquare(null);
      setShow(false);
    } else if (
      e.type === "blur" &&
      !e.currentTarget.contains(e.relatedTarget)
    ) {
      setSquare(null);
      setShow(false);
    }
  }

  useEffect(() => {
    if (!isActive) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [isActive]);

  const sharpCorner = `#controls-functions {border-bottom-right-radius: 0;}`;

  return (
    <li tabIndex={0} onBlur={blur} onFocus={activateSquare} onKeyDown={blur}>
      <div className="colour-square" style={style} onClick={activateSquare}>
        {" "}
      </div>
      {show && (
        <div id="pallet">
          <Picker
            show={show}
            setShow={setShow}
            colour={activeColour}
            setColour={setColour}
          />
          <div id="pallet-btns">
            <button className="btn-1 pallet-btn" onClick={() => setShow(false)}>
              Select
            </button>
            <button className="btn-1 pallet-btn" onClick={removeColour}>
              Remove
            </button>
          </div>
          <style>{sharpCorner}</style>
        </div>
      )}
    </li>
  );
}

type ColoursProps = {
  coloursList: string[];
  setColoursList: React.Dispatch<React.SetStateAction<string[]>>;
  square: number | null;
  setSquare: React.Dispatch<React.SetStateAction<number | null>>;
};

export function Colours({
  coloursList,
  setColoursList,
  square,
  setSquare,
}: ColoursProps) {
  const [colour, setColour] = useState(coloursList[0]);

  function addColour() {
    setColoursList([...coloursList, colour]);
    setSquare(coloursList.length);
  }

  // Change colour using useEffect
  // On the effect of Colour change, find the Colour in the Colours List
  // and set the Colours list to a new list with that colour changed
  useEffect(() => {
    const newList = [...coloursList];
    newList.splice(square, 1, colour);
    setColoursList(newList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colour]);

  return (
    <div className="subsection" id="colours-section">
      <h3 id="colours-header">Colours</h3>

      <ul className="colours-list">
        {coloursList.map((squareColour, index) => {
          const isActive = index === square;
          return (
            <ColourSquare
              key={index}
              setColour={setColour}
              squareNumber={index}
              square={square}
              setSquare={setSquare}
              activeColour={colour}
              squareColour={squareColour}
              isActive={isActive}
              coloursList={coloursList}
              setColoursList={setColoursList}
            />
          );
        })}
      </ul>
      {coloursList.length < 2 && (
        <p className="error-text">Please select at least 2 colours.</p>
      )}
      <button
        id="add-colour-btn"
        className="btn-1 pallet-btn"
        onClick={addColour}
      >
        Add
      </button>
    </div>
  );
}

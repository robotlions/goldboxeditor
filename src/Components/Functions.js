import { useState } from "react";

export function ExperienceModule(props) {
    let tempArray = props.dataArray;

    const [editing, setEditing] = useState(false);
    const [inputText, setInputText] = useState(
      parseInt(
        (0 + props.dataArray[props.dataArrayIndex+3].toString(16)).slice(-2) +
        (0 + props.dataArray[props.dataArrayIndex+2].toString(16)).slice(-2) +
        (0 + props.dataArray[props.dataArrayIndex+1].toString(16)).slice(-2) +
        (0 + props.dataArray[props.dataArrayIndex].toString(16)).slice(-2),
        16
      )
    );

    const editDisplay = (
      <input
        className="form-control"
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onBlur={() => {
          setEditing(!editing);
          convertDecimaltoBinary();
        }}
      />
    );

    function convertDecimaltoBinary() {
      let eightBit = (
        "00000000" + parseInt(inputText).toString(16).toUpperCase()
      ).slice(-8);
      let eightBitSplit = eightBit.match(/.{1,2}/g) ?? [];
      for (let i = 0; i < 3; i++) {
        if (eightBitSplit[i] === "00") {
          eightBitSplit[i] = "0";
        } else if (eightBitSplit[i].charAt(0) === "0") {
          eightBitSplit[i] = eightBitSplit[i].charAt(1);
        }
      }

      tempArray[175] = parseInt(eightBitSplit[0], 16);
      tempArray[174] = parseInt(eightBitSplit[1], 16);
      tempArray[173] = parseInt(eightBitSplit[2], 16);
      tempArray[172] = parseInt(eightBitSplit[3], 16);
      props.setDataArray(tempArray);
    }

    return editDisplay;
  }





export function HitPointModule(props) {
    let tempArray = props.dataArray;

    const [editing, setEditing] = useState(false);
    const [inputText, setInputText] = useState(props.dataArray[props.dataArrayIndex]);

    function submitChange() {
      tempArray[props.dataArrayIndex] = inputText;

      props.setDataArray(tempArray);
    }

    const editDisplay = (
      <input
        className="form-control"
        type="number"
        max="255"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onBlur={() => {
          setEditing(!editing);
          submitChange();
        }}
      />
    );

    return editDisplay;
  }



export function NameModule(props) {
    let tempArray = props.dataArray;

    let defaultName = assembleName();

    const [inputText, setInputText] = useState(defaultName);
    const editDisplay = (
      <input
        className="form-control"
        value={inputText}
        maxLength={15}
        onChange={(e) => setInputText(e.target.value)}
        onBlurCapture={() => saveName()}
        type="text"
      />
    );

    function assembleName() {
      let assembledName = "";
      for (let i = 1; i <= props.dataArray[0]; i++) {
        assembledName = assembledName + String.fromCharCode(props.dataArray[i]);
      }
      return assembledName;
    }

    function saveName() {
      tempArray[0] = inputText.length;
      for (let i = 0; i <= inputText.length; i++) {
        tempArray[i + 1] = inputText.toUpperCase().charCodeAt(i);
      }
      props.setDataArray(tempArray);
    }

    return editDisplay;
  }

  export function SelectModule(props) {
    let tempArray = props.dataArray;

    let dropList = Object.entries(props.dataList).map((item, index) => (
      <option key={index} value={item[0]}>
        {item[1]}
      </option>
    ));

    let defaultDisplay = tempArray[props.index];

    return (
      <div className="d-flex">
        <select
          className="form-select"
          defaultValue={defaultDisplay}
          aria-label="Item value dropdown"
          onChange={(e) => {
            tempArray[props.index] = e.target.value;
            props.setDataArray(tempArray);
          }}
        >
          <option disabled value={-1}>
            Options
          </option>
          {dropList}
        </select>
      </div>
    );
  }

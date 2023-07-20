import { useState } from "react";



export function ExperienceModule(props) {
  let tempArray = props.dataArray;

  const [editing, setEditing] = useState(false);
  const [inputText, setInputText] = useState(
    parseInt(
      (0 + props.dataArray[props.dataArrayIndex + 3].toString(16)).slice(-2) +
        (0 + props.dataArray[props.dataArrayIndex + 2].toString(16)).slice(-2) +
        (0 + props.dataArray[props.dataArrayIndex + 1].toString(16)).slice(-2) +
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

    tempArray[props.dataArrayIndex+3] = parseInt(eightBitSplit[0], 16);
    tempArray[props.dataArrayIndex+2] = parseInt(eightBitSplit[1], 16);
    tempArray[props.dataArrayIndex+1] = parseInt(eightBitSplit[2], 16);
    tempArray[props.dataArrayIndex] = parseInt(eightBitSplit[3], 16);
    props.setDataArray(tempArray);
  }

  return editDisplay;
}

export function HitPointModule(props) {
  let tempArray = props.dataArray;

  const [editing, setEditing] = useState(false);
  const [inputText, setInputText] = useState(
    props.dataArray[props.dataArrayIndex]
  );

  function submitChange() {
    tempArray[props.dataArrayIndex] = inputText;

    props.setDataArray(tempArray);
  }

  const editDisplay = (
    <input
      className="form-control"
      type="number"
      max="255"
      min="0"
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

export function LevelModule(props) {
  let tempArray = props.dataArray;

  const [inputText, setInputText] = useState(
    props.dataArray[props.dataArrayIndex]
  );

  function submitChange() {
    tempArray[props.dataArrayIndex] = inputText;
    props.setDataArray(tempArray);
  }

  const editDisplay = (
    <input
      style={{ maxWidth: "60%", textAlign: "center" }}
      type="number"
      max="99"
      min="0"
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      onBlur={() => submitChange()}
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

export function ScoreModule(props) {
  let tempArray = props.dataArray;

  const [inputText, setInputText] = useState(
    props.dataArray[props.dataArrayIndex]
  );

  function submitChange() {
    tempArray[props.dataArrayIndex] = inputText;
    tempArray[props.dataArrayIndexCurrent] = inputText;
    props.setDataArray(tempArray);
  }

  const editDisplay = (
    <input
      id={props.idText}
      type="number"
      max="99"
      min="0"
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      onBlur={() => submitChange()}
      style={{ maxWidth: "70%", textAlign: "center" }}
    />
  );

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

export function SpellModule(props) {
  let tempArray = Array.from(props.dataArray);
  let spellDisplay = tempArray.map((item, index) =>
    index > props.dataArrayMin &&
    index < props.dataArrayMax &&
    props.dataList[index].class === props.filter ? (
      <SpellCheckBox
        dataArray={props.dataArray}
        setDataArray={props.setDataArray}
        dataList={props.dataList}
        item={item}
        index={index}
        key={index}
      />
    ) : null
  );

  return (
    <div style={{ marginBottom: 10 }} className="d-flex flex-wrap">
      {spellDisplay}
    </div>
  );
}

export function SpellCheckBox(props) {
  let tempArray = props.dataArray;

  const [checked, setChecked] = useState(props.item === 1 ? true : false);

  function updateChecked() {
    let checkValue = checked === true ? 0 : 1;
    tempArray[props.index] = parseInt(checkValue, 16);
    props.setDataArray(tempArray);
  }

  return (
    <div className="col-6 col-md-3 spellEntry">
      <input
        className="form-check-input"
        type="checkbox"
        checked={checked}
        onChange={() => {
          setChecked(!checked);
          updateChecked();
        }}
      />
      {props.dataList[props.index].spellName}
    </div>
  );
}

export function StrengthModule(props) {
  let tempArray = props.dataArray;

  const [inputText, setInputText] = useState(
    props.dataArray[props.dataArrayIndex]
  );
  const [extInput, setExtInput] = useState(props.dataArray[props.extStrIndex]);

  function submitChange() {
    tempArray[props.dataArrayIndex] = inputText;
    tempArray[props.dataArrayIndexCurrent] = inputText;
    props.setDataArray(tempArray);
  }

  function submitExtChange() {
    tempArray[props.extStrIndex] = extInput;
    tempArray[props.extStrIndexCurrent] = extInput;
    props.setDataArray(tempArray);
  }

  const editDisplay = (
    <>
      <div className="col-4">
        <input
          type="number"
          max="99"
          min="0"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onBlur={() => submitChange()}
          style={{ maxWidth: "70%", textAlign: "center" }}
        />
      </div>
      <div className="col-4">
        {parseInt(inputText) === 18 ? (
          <input
            type="number"
            max="100"
            min="0"
            value={extInput}
            onChange={(e) => setExtInput(e.target.value)}
            onBlur={() => submitExtChange()}
            style={{ maxWidth: "70%", textAlign: "center" }}
          />
        ) : null}
      </div>
    </>
  );

  return editDisplay;
}

export function ValueModule(props) {
  let tempArray = props.dataArray;

  const [inputText, setInputText] = useState(
    props.dataArray[props.dataArrayIndex]
  );

  function submitChange() {
    tempArray[props.dataArrayIndex] = inputText;
    props.setDataArray(tempArray);
  }

  const editDisplay = (
    <input
      type="number"
      max="255"
      min="0"
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      onBlur={() => submitChange()}
      style={{ maxWidth: "70%", textAlign: "center" }}
    />
  );

  return editDisplay;
}

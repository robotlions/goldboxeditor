import { useState } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { spellList } from "../Data/Spells";

export default function CharEdit() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataArray, setDataArray] = useState(null);

  function exportSaveFile() {
    const blob = new Blob([dataArray], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = selectedFile.name;
    link.href = url;
    link.click();
  }

  function loadFile(file) {
    if (document.querySelector("#fileSelect").value === "") {
      alert("No file selected");
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      let data = e.target.result;
      let dataArray = new Uint8Array(data);
      setDataArray(dataArray);
      console.log(dataArray);
    };
    reader.onerror = function (e) {
      console.log("Error : " + e.type);
    };
    reader.readAsArrayBuffer(file);
  }

  function NameModule() {
    let tempArray = dataArray;

    let defaultName = assembleName();

    const [editing, setEditing] = useState(false);
    const [inputText, setInputText] = useState(defaultName);
    const editDisplay = (
      <>
        <input
          value={inputText}
          maxLength={15}
          onChange={(e) => setInputText(e.target.value)}
          type="text"
        />
        <button
          onClick={() => {
            setEditing(!editing);
            saveName();
          }}
        >
          Done
        </button>
      </>
    );

    const defaultDisplay = (
      <>
        {defaultName} <button onClick={() => setEditing(!editing)}>Edit</button>
      </>
    );
    function assembleName() {
      let assembledName = "";
      for (let i = 1; i <= dataArray[0]; i++) {
        assembledName = assembledName + String.fromCharCode(dataArray[i]);
      }
      return assembledName;
    }

    function saveName() {
      tempArray[0] = inputText.length;
      for (let i = 0; i <= inputText.length; i++) {
        tempArray[i + 1] = inputText.toUpperCase().charCodeAt(i);
      }
      setDataArray(tempArray[113]);
    }

    return editing === false ? defaultDisplay : editDisplay;
  }

  function ScoreModule(props) {
    let tempArray = dataArray;

    const [editing, setEditing] = useState(false);
    const [inputText, setInputText] = useState(dataArray[props.dataArrayIndex]);

    function submitChange() {
      tempArray[props.dataArrayIndex] = inputText;
      tempArray[props.dataArrayIndex + 1] = inputText;
      setDataArray(tempArray);
    }

    const defaultDisplay = (
      <>
        {inputText} <button onClick={() => setEditing(!editing)}>Edit</button>
      </>
    );
    const editDisplay = (
      <>
        {
          <input
            type="number"
            max="99"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        }{" "}
        <button
          onClick={() => {
            setEditing(!editing);
            submitChange();
          }}
        >
          Done
        </button>
      </>
    );

    return editing === false ? defaultDisplay : editDisplay;
  }

  function LevelModule(props) {
    let tempArray = dataArray;

    const [editing, setEditing] = useState(false);
    const [inputText, setInputText] = useState(dataArray[props.dataArrayIndex]);

    function submitChange() {
      tempArray[props.dataArrayIndex] = inputText;
      setDataArray(tempArray);
    }

    const defaultDisplay = (
      <>
        {inputText} <button onClick={() => setEditing(!editing)}>Edit</button>
      </>
    );
    const editDisplay = (
      <>
        {
          <input
            type="number"
            max="99"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        }{" "}
        <button
          onClick={() => {
            setEditing(!editing);
            submitChange();
          }}
        >
          Done
        </button>
      </>
    );

    return editing === false ? defaultDisplay : editDisplay;
  }

  function HitPointModule(props) {
    let tempArray = dataArray;

    const [editing, setEditing] = useState(false);
    const [inputText, setInputText] = useState(dataArray[112]);

    function submitChange() {
      tempArray[112] = inputText;
      tempArray[437] = inputText;
      setDataArray(tempArray);
    }

    const defaultDisplay = (
      <>
        {inputText} <button onClick={() => setEditing(!editing)}>Edit</button>
      </>
    );
    const editDisplay = (
      <>
        {
          <input
            type="number"
            max="255"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        }{" "}
        <button
          onClick={() => {
            setEditing(!editing);
            submitChange();
          }}
        >
          Done
        </button>
      </>
    );

    return editing === false ? defaultDisplay : editDisplay;
  }

  function ExperienceModule(props) {
    let tempArray = dataArray;

    const [editing, setEditing] = useState(false);
    const [inputText, setInputText] = useState(
      parseInt(
        (0 + dataArray[303].toString(16)).slice(-2) +
          (0 + dataArray[302].toString(16)).slice(-2) +
          (0 + dataArray[301].toString(16)).slice(-2) +
          (0 + dataArray[300].toString(16)).slice(-2),
        16
      )
    );

    const defaultDisplay = (
      <>
        {inputText} <button onClick={() => setEditing(!editing)}>Edit</button>
      </>
    );
    const editDisplay = (
      <>
        {
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        }{" "}
        <button
          onClick={() => {
            setEditing(!editing);
            convertDecimaltoBinary();
          }}
        >
          Done
        </button>
      </>
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

      tempArray[303] = parseInt(eightBitSplit[0], 16);
      tempArray[302] = parseInt(eightBitSplit[1], 16);
      tempArray[301] = parseInt(eightBitSplit[2], 16);
      tempArray[300] = parseInt(eightBitSplit[3], 16);
      setDataArray(tempArray);
    }

    return editing === false ? defaultDisplay : editDisplay;
  }

  function SpellCheckBox(props) {
    let tempArray = dataArray;

    const [checked, setChecked] = useState(props.item === 1 ? true : false);

    function updateChecked() {
      let checkValue = checked === true ? 0 : 1;
      tempArray[props.index] = parseInt(checkValue, 16);
      setDataArray(tempArray);
    }

    return (
      <span className="col-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {
            setChecked(!checked);
            updateChecked();
          }}
        />
        {props.index}:{spellList[props.index].spellName}{" "}
      </span>
    );
  }

  function SpellModule(props) {
    let tempArray = Array.from(dataArray);
    let spellDisplay = tempArray.map((item, index) =>
      index > 112 && index < 232 && spellList[index].class===props.filter ? (
        <SpellCheckBox item={item} index={index} key={index} />
      ) : null
    );

    return <div style={{marginBottom: 20}} className="d-flex flex-wrap">{spellDisplay}</div >
  }

  return (
    <div className="charEditBody">
      <input
        id="fileSelect"
        type="file"
        accept=".who, .sav"
        onChange={(e) => {
          setSelectedFile(e.target.files[0]);
          loadFile(e.target.files[0]);
        }}
      />
      {/* {selectedFile ? <button className="btn btn-primary" onClick={() => loadFile()}>Load Save File</button> : null} */}
      <p></p>
      <div className="row">
      <div className="col-md-4">Character Name: {dataArray ? <NameModule /> : null}</div>
      <div className="col-md-4">Max Hit Points: {dataArray ? <HitPointModule /> : null}</div>
      <div className="col-md-4">Experience: {dataArray ? <ExperienceModule /> : null}</div>
      </div>
      <div className="row">
      <div className="col-md-6">

      
        <h4>Ability Scores</h4>
        <p>
        {/* The commented out scores are - I think - the in-game modified score after effects */}
        Strength: {dataArray ? <ScoreModule dataArrayIndex={16} /> : null} (
        {dataArray ? <ScoreModule dataArrayIndex={28} /> : null}) <br />
        {/* <p>Score: {dataArray ? <ScoreModule dataArrayIndex={17} /> : null}</p> */}
        Intelligence: {dataArray ? <ScoreModule dataArrayIndex={18} /> : null}
        <br />
        {/* <p>Score: {dataArray ? <ScoreModule dataArrayIndex={19} /> : null}</p> */}
        Wisdom: {dataArray ? <ScoreModule dataArrayIndex={20} /> : null}
        <br />
        {/* <p>Score: {dataArray ? <ScoreModule dataArrayIndex={21} /> : null}</p> */}
        Dexterity: {dataArray ? <ScoreModule dataArrayIndex={22} /> : null}
        <br />
        {/* <p>Score: {dataArray ? <ScoreModule dataArrayIndex={23} /> : null}</p> */}
        Constitution: {dataArray ? <ScoreModule dataArrayIndex={24} /> : null}
        <br />
        {/* Score: {dataArray ? <ScoreModule dataArrayIndex={25} /> : null}<br /> */}
        Charisma: {dataArray ? <ScoreModule dataArrayIndex={26} /> : null}
        <br />
        {/* <p>Score: {dataArray ? <ScoreModule dataArrayIndex={27} /> : null}</p> */}
      </p>
      </div>
      <div className="col-md-6">

      <h4>Levels</h4>
      <p>
        Cleric: {dataArray ? <LevelModule dataArrayIndex={273} /> : null}
        <br />
        Fighter: {dataArray ? <LevelModule dataArrayIndex={275} /> : null}
        <br />
        Paladin: {dataArray ? <LevelModule dataArrayIndex={276} /> : null}
        <br />
        Ranger: {dataArray ? <LevelModule dataArrayIndex={277} /> : null}
        <br />
        Magic-User: {dataArray ? <LevelModule dataArrayIndex={278} /> : null}
        <br />
        Thief: {dataArray ? <LevelModule dataArrayIndex={279} /> : null}
        <br />
      </p>
      </div>
      </div>
        <h4>Mage Spells:</h4> <div>{dataArray ? <SpellModule filter="Mage"/> : null} </div>
        <h4>Cleric Spells:</h4> <div>{dataArray ? <SpellModule filter="Cleric"/> : null} </div>
        <h4>Druid Spells:</h4> <div>{dataArray ? <SpellModule filter="Druid"/> : null} </div>
      <button className="btn btn-primary" onClick={() => exportSaveFile()}>
        Download
      </button>
      <br />
    </div>
  );
}

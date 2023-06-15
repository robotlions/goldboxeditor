import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { spellList } from "../Data/Spells";
import { alignments, statusCodes, races, genders } from "../Data/DataLists";
import InventoryEdit from "./InventoryEdit";

export default function CharEdit() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  const [inventoryFileName, setInventoryFileName] = useState(null);

  function exportSaveFile() {
    if(!selectedFile){
      return alert("Please load a character file")
    }
    else{
    const blob = new Blob([dataArray], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = selectedFile.name;
    link.href = url;
    link.click();
  }
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

  function createInventoryFile(e){
    let loadedFileName = e.target.files[0].name
    let inventoryFile = loadedFileName.substr(0, loadedFileName.lastIndexOf(".")) + ".STF";
    setInventoryFileName(inventoryFile)
  }
 

  function NameModule() {
    let tempArray = dataArray;

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
      setDataArray(tempArray);
    }

    return editDisplay;
  }

  function ScoreModule(props) {
    let tempArray = dataArray;

    const [inputText, setInputText] = useState(dataArray[props.dataArrayIndex]);

    function submitChange() {
      tempArray[props.dataArrayIndex] = inputText;
      tempArray[props.dataArrayIndex + 1] = inputText;
      setDataArray(tempArray);
    }


    const editDisplay = (
      <input
      id={props.idText}
        type="number"
        max="99"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onBlur={() => submitChange()}
        style={{ maxWidth: "60%", textAlign: "center" }}
      />
    );

    return editDisplay;
  }

  function StrengthModule(props) {
    let tempArray = dataArray;

    const [inputText, setInputText] = useState(dataArray[props.dataArrayIndex]);
    const [extInput, setExtInput] = useState(dataArray[28])
   

    function submitChange() {
      tempArray[props.dataArrayIndex] = inputText;
      tempArray[props.dataArrayIndex + 1] = inputText;
      setDataArray(tempArray);
    }

    function submitExtChange() {
      tempArray[28] = extInput;
      tempArray[29] = extInput;
      setDataArray(tempArray);
    }

    


    const editDisplay = (
      <>
      <div className="col-4">
      <input
        type="number"
        max="100"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onBlur={() => submitChange()}
        style={{ maxWidth: "60%", textAlign: "center" }}
      />
      </div>
      <div className="col-4">
      {inputText >= 18 ? 
      <input
        type="number"
        max="99"
        value={extInput}
        onChange={(e) => setExtInput(e.target.value)}
        onBlur={() => submitExtChange()}
        style={{ maxWidth: "60%", textAlign: "center" }}
      /> : null }
      </div>
      </>
    );

    return editDisplay;
  }

  function LevelModule(props) {
    let tempArray = dataArray;

    const [inputText, setInputText] = useState(dataArray[props.dataArrayIndex]);

    function submitChange() {
      tempArray[props.dataArrayIndex] = inputText;
      setDataArray(tempArray);
    }

    const editDisplay = (
      <input
        style={{ maxWidth: "60%", textAlign: "center" }}
        type="number"
        max="99"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onBlur={() => submitChange()}
      />
    );

    return editDisplay;
  }

  function HitPointModule(props) {
    let tempArray = dataArray;

    const [editing, setEditing] = useState(false);
    const [inputText, setInputText] = useState(dataArray[112]);

    function submitChange() {
      tempArray[props.dataArrayIndex] = inputText;
      
      setDataArray(tempArray);
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

      tempArray[303] = parseInt(eightBitSplit[0], 16);
      tempArray[302] = parseInt(eightBitSplit[1], 16);
      tempArray[301] = parseInt(eightBitSplit[2], 16);
      tempArray[300] = parseInt(eightBitSplit[3], 16);
      setDataArray(tempArray);
    }

    return editDisplay;
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
      <div className="col-6 col-md-3 spellEntry">
        <input
          style={{ marginRight: 10 }}
          className="form-check-input"
          type="checkbox"
          checked={checked}
          onChange={() => {
            setChecked(!checked);
            updateChecked();
          }}
        />
        {spellList[props.index].spellName}
      </div>
    );
  }

  function SpellModule(props) {
    let tempArray = Array.from(dataArray);
    let spellDisplay = tempArray.map((item, index) =>
      index > 112 && index < 232 && spellList[index].class === props.filter ? (
        <SpellCheckBox item={item} index={index} key={index} />
      ) : null
    );

    return (
      <div style={{ marginBottom: 20 }} className="d-flex flex-wrap">
        {spellDisplay}
      </div>
    );
  }

  function SelectModule(props) {
    let tempArray = dataArray;

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
            setDataArray(tempArray);
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



  return (
    <div className="charEditBody">
      <div className="row">
        <h2 className="mainTitle">Advanced Dungeons and Dragons<br/>Secret of the Silver Blades</h2>
        <div className="col-md-6">

      <div className="mb-3">
        <input
          className="form-control"
          type="file"
          id="fileSelect"
          accept=".sav"
          onChange={(e) => {
            console.log(e.target.files);
            createInventoryFile(e);
            setSelectedFile(e.target.files[0]);
            loadFile(e.target.files[0]);
          }}
        />
      </div>
      <button className="btn btn-primary" onClick={() => exportSaveFile()}>
        Download Character File
      </button>
      <br />
      <p></p>
      <div className="row">
        <div className="col-md-3">
          Character Name: {dataArray ? <NameModule /> : null}
        </div>
        <div className="col-md-3">
          Max Hit Points: {dataArray ? <HitPointModule dataArrayIndex={112}/> : null}
        </div>
        <div className="col-md-3">
          Current Hit Points: {dataArray ? <HitPointModule dataArrayIndex={437}/> : null}
        </div>
        <div className="col-md-3">
          Experience: {dataArray ? <ExperienceModule /> : null}
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          Status:{" "}
          {dataArray ? (
            <SelectModule index={422} dataList={statusCodes} />
          ) : null}
        </div>
        <div className="col-md-3">
          Alignment:{" "}
          {dataArray ? (
            <SelectModule index={288} dataList={alignments} />
          ) : null}
        </div>
        <div className="col-md-3">
          Race:{" "}
          {dataArray ? (
            <SelectModule index={107} dataList={races} />
          ) : null}
        </div>
        <div className="col-md-3">
          Gender:{" "}
          {dataArray ? (
            <SelectModule index={287} dataList={genders} />
          ) : null}
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <h4 style={{ textAlign: "center" }}>Ability Scores</h4>
          <div className="row">
            <div className="col-4">Strength:</div>
            
              {dataArray ? <StrengthModule idText="strengthScore" dataArrayIndex={16} /> : null}
           

            {/* <div className="col-4">
              ({dataArray ? <ScoreModule dataArrayIndex={28} /> : null})
            </div> */}
          </div>

          <div className="row">
            <div className="col-4">Intelligence:</div>
            <div className="col-4">
              {dataArray ? <ScoreModule dataArrayIndex={18} /> : null}
            </div>
          </div>

          <div className="row">
            <div className="col-4">Wisdom:</div>
            <div className="col-4">
              {dataArray ? <ScoreModule dataArrayIndex={20} /> : null}
            </div>
          </div>

          <div className="row">
            <div className="col-4">Dexterity:</div>
            <div className="col-4">
              {dataArray ? <ScoreModule dataArrayIndex={22} /> : null}
            </div>
          </div>

          <div className="row">
            <div className="col-4">Constitution:</div>
            <div className="col-4">
              {dataArray ? <ScoreModule dataArrayIndex={24} /> : null}
            </div>
          </div>

          <div className="row">
            <div className="col-4">Charisma:</div>
            <div className="col-4">
              {dataArray ? <ScoreModule dataArrayIndex={26} /> : null}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4 style={{ textAlign: "center" }}>Levels</h4>
          <div className="row">
            <div className="col-6">Cleric: </div>
            <div className="col-6">
              {dataArray ? <LevelModule dataArrayIndex={273} /> : null}
            </div>
          </div>
          <div className="row">
            <div className="col-6">Fighter: </div>
            <div className="col-6">
              {dataArray ? <LevelModule dataArrayIndex={275} /> : null}
            </div>
          </div>
          <div className="row">
            <div className="col-6">Paladin: </div>
            <div className="col-6">
              {dataArray ? <LevelModule dataArrayIndex={276} /> : null}
            </div>
          </div>
          <div className="row">
            <div className="col-6">Ranger: </div>
            <div className="col-6">
              {dataArray ? <LevelModule dataArrayIndex={277} /> : null}
            </div>
          </div>
          <div className="row">
            <div className="col-6">Magic-User: </div>
            <div className="col-6">
              {dataArray ? <LevelModule dataArrayIndex={278} /> : null}
            </div>
          </div>
          <div className="row">
            <div className="col-6">Thief: </div>
            <div className="col-6">
              {dataArray ? <LevelModule dataArrayIndex={279} /> : null}
            </div>
          </div>
        </div>
      </div>
      <br/>
      {dataArray ? <><h4>Magic-user Spell Slots</h4>
      <div className="row">
        <div className="col-2">
       1: <LevelModule dataArrayIndex={327} />
       </div>
       <div className="col-2">
       2: <LevelModule dataArrayIndex={328} />
       </div>
       <div className="col-2">
       3: <LevelModule dataArrayIndex={329} />
       </div>
       <div className="col-2">
       4: <LevelModule dataArrayIndex={330} />
       </div>
       <div className="col-2">
       5: <LevelModule dataArrayIndex={331} />
       </div>
       <div className="col-2">
       6: <LevelModule dataArrayIndex={332} />
       </div>
       <div className="col-2">
       7: <LevelModule dataArrayIndex={333} />
       </div>
      </div></> : null }
      <h4>Mage Spells:</h4>{" "}
      <div>{dataArray ? <SpellModule filter="Mage" /> : null} </div>
      {/* <h4>Cleric Spells:</h4> <div>{dataArray ? <SpellModule filter="Cleric"/> : null} </div> */}
      {/* <h4>Druid Spells:</h4> <div>{dataArray ? <SpellModule filter="Druid"/> : null} </div> */}
      </div>
      <div className="col-md-6">
      <InventoryEdit inventoryFileName={inventoryFileName}/>
      
      </div>
            </div>
    </div>
  );
}

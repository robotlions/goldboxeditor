import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap"
import { alignments, poolRadStatusCodes, poolRadRaces, genders, poolRadSpells } from "./PoolRadData";
import PoolRadInventory from './PoolRadInventory';


export default function PoolRadMain() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  const [inventoryFileName, setInventoryFileName] = useState(null);

  function exportSaveFile() {
    if (!selectedFile) {
      return alert("Please load a character file")
    }
    else {
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

  function createInventoryFile(e) {
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
      // tempArray[props.dataArrayIndex + 1] = inputText;
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
    const [extInput, setExtInput] = useState(dataArray[22])


    function submitChange() {
      tempArray[props.dataArrayIndex] = inputText;
      tempArray[props.dataArrayIndex + 1] = inputText;
      setDataArray(tempArray);
    }

    function submitExtChange() {
      tempArray[22] = extInput;
      // tempArray[29] = extInput;
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
            /> : null}
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
    const [inputText, setInputText] = useState(dataArray[50]);

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
        (0 + dataArray[175].toString(16)).slice(-2) +
        (0 + dataArray[174].toString(16)).slice(-2) +
        (0 + dataArray[173].toString(16)).slice(-2) +
        (0 + dataArray[172].toString(16)).slice(-2),
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
        {poolRadSpells[props.index].spellName}
      </div>
    );
  }

  function SpellModule(props) {
    let tempArray = Array.from(dataArray);
    let spellDisplay = tempArray.map((item, index) =>
      index > 50 && index < 107 && poolRadSpells[index].class === props.filter ? (
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

  const charInfoDisplay = <><div className="row">
    <div className="col-md-3">
      Character Name: <NameModule />
    </div>
    <div className="col-md-3">
      Max HP: <HitPointModule dataArrayIndex={50} />
    </div>
    <div className="col-md-3">
      Current HP: <HitPointModule dataArrayIndex={283} />
    </div>
    <div className="col-md-3">
      Experience: <ExperienceModule />
    </div>
  </div>
    <div className="row">
      <div className="col-md-3">
        Status:{" "}
        <SelectModule index={268} dataList={poolRadStatusCodes} />
      </div>
      <div className="col-md-3">
        Alignment:{" "}
        <SelectModule index={160} dataList={alignments} />
      </div>
      <div className="col-md-3">
        Race:{" "}
        <SelectModule index={46} dataList={poolRadRaces} />
      </div>
      <div className="col-md-3">
        Gender:{" "}
        <SelectModule index={158} dataList={genders} />
      </div>
    </div>
  </>

  const charAbilityDisplay =
    <><div className="row">
      <div className="col-md-6">
        <h4 style={{ textAlign: "center" }}>Ability Scores</h4>
        <div className="row">
          <div className="col-4">Strength:</div>
          <StrengthModule idText="strengthScore" dataArrayIndex={16} />
        </div>
        <div className="row">
          <div className="col-4">Intelligence:</div>
          <div className="col-4">
            <ScoreModule dataArrayIndex={17} />
          </div>
        </div>
        <div className="row">
          <div className="col-4">Wisdom:</div>
          <div className="col-4">
            <ScoreModule dataArrayIndex={18} />
          </div>
        </div>
        <div className="row">
          <div className="col-4">Dexterity:</div>
          <div className="col-4">
            <ScoreModule dataArrayIndex={19} />
          </div>
        </div>
        <div className="row">
          <div className="col-4">Constitution:</div>
          <div className="col-4">
            <ScoreModule dataArrayIndex={20} />
          </div>
        </div>
        <div className="row">
          <div className="col-4">Charisma:</div>
          <div className="col-4">
            <ScoreModule dataArrayIndex={21} />
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4 style={{ textAlign: "center" }}>Levels</h4>
        <div className="row">
          <div className="col-6">Cleric: </div>
          <div className="col-6">
            <LevelModule dataArrayIndex={151} />
          </div>
        </div>
        <div className="row">
          <div className="col-6">Fighter: </div>
          <div className="col-6">
            <LevelModule dataArrayIndex={152} />
          </div>
        </div>
        <div className="row">
          <div className="col-6">Magic-User: </div>
          <div className="col-6">
            <LevelModule dataArrayIndex={155} />
          </div>
        </div>
        <div className="row">
          <div className="col-6">Thief: </div>
          <div className="col-6">
            <LevelModule dataArrayIndex={156} />
          </div>
        </div>
      </div>
    </div></>


  const arcaneMagicDisplay = <>
    <h4>Magic-user Spell Slots</h4>
    <div className="row">
      <div className="col-2">
        1: <LevelModule dataArrayIndex={181} />
      </div>
      <div className="col-2">
        2: <LevelModule dataArrayIndex={182} />
      </div>
      <div className="col-2">
        3: <LevelModule dataArrayIndex={183} />
      </div>

    </div>
    <h4>Mage Spells:</h4>{" "}
    <div><SpellModule filter="Mage" /></div></>

  const clericMagicDisplay = <>
    <h4>Cleric Spell Slots</h4>
    <div className="row">
      <div className="col-2">
        1: <LevelModule dataArrayIndex={178} />
      </div>
      <div className="col-2">
        2: <LevelModule dataArrayIndex={179} />
      </div>
      <div className="col-2">
        3: <LevelModule dataArrayIndex={180} />
      </div>

    </div>
    <h4>Cleric Spells:</h4>{" "}
    <div><SpellModule filter="Cleric" /></div></>




  return (
    <div className="charEditBody">
      <div className="row">
        <h2 className="mainTitle">Advanced Dungeons and Dragons<br />Pool of Radiance</h2>
        <div className="col-md-6">
          <h3 style={{ textAlign: "center" }}>Character Editor</h3>
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
          {dataArray ? <button className="btn btn-success" onClick={() => exportSaveFile()}>
            Download Character File
          </button> : null}
          <br />
          <p></p>
          {dataArray ?
            <>


              <div className="accordion" id="charEditAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Character Info
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne">
                    <div className="accordion-body">
                      {charInfoDisplay}
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                      Ability Scores and Levels
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" >
                    <div className="accordion-body">
                      {charAbilityDisplay}
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      Magic-user Spells
                    </button>
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" >
                    <div className="accordion-body">
                      {arcaneMagicDisplay}
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                      Cleric Spells
                    </button>
                  </h2>
                  <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" >
                    <div className="accordion-body">
                      {clericMagicDisplay}
                    </div>
                  </div>
                </div>

              </div>

            </> : null}
        </div>
        <div className="col-md-6">
          <h3 style={{ textAlign: "center" }}>Inventory Editor</h3>

          <PoolRadInventory inventoryFileName={inventoryFileName} />

        </div>
      </div>
    </div>
  );
}

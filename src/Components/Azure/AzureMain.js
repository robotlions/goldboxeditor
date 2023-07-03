import { useState } from "react";
import * as CharComponents from "../CharComponents";
import {azureRaces, azureSpellList, azureStatusCodes} from "../Azure/AzureData";
import * as CharFunctions from "../CharFunctions";
import AzureInventory from "./AzureInventory";

export function AzureMain(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataArray, setDataArray] = useState(null);

  function exportSaveFile() {
    if (!selectedFile) {
      return alert("Please load a character file");
    } else {
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
      if (data.byteLength !== 422) {
        return alert(
          "This doesn't appear to be a save file from Pool of Radiance"
        );
      } else {
      let dataArray = new Uint8Array(data);
      console.log(dataArray)
      setDataArray(dataArray);
    }
}
    reader.onerror = function (e) {
      console.log("Error : " + e.type);
    };
    reader.readAsArrayBuffer(file);
  }


  function MagicDisplay(props) {
    let spellArray = [0];

    if (props.magicFilter === "Mage") {
      spellArray = [0, 1, 2, 3, 4];
    }
    if (props.magicFilter === "Cleric") {
      spellArray = [0, 1, 2, 3];
    }

    let spellSlots = spellArray.map((item, index) => (
      <div key={index} className="col-2">
        {item + 1}:{" "}
        <CharFunctions.LevelModule
          dataArray={dataArray}
          setDataArray={setDataArray}
          dataArrayIndex={props.startingIndex + item}
        />
      </div>
    ));

    return (
      <>
        {spellSlots}
        <h4>{props.magicFilter} Spells:</h4>{" "}
        <div>
          <CharFunctions.SpellModule
            dataArray={dataArray}
            setDataArray={setDataArray}
            dataArrayMin={121}
            dataArrayMax={220}
            dataList={azureSpellList}
            filter={props.magicFilter}
          />
        </div>
      </>
    );
  }

  function CharAbilityDisplay() {
    return (
      <CharComponents.CharAbilityDisplay
        dataArray={dataArray}
        setDataArray={setDataArray}
        strIndex={16}
        strIndexCurrent={17}
        extStrIndex={28}
        extStrIndexCurrent={29}
        intIndex={18}
        intIndexCurrent={19}
        wisIndex={20}
        wisIndexCurrent={21}
        dexIndex={22}
        dexIndexCurrent={23}
        conIndex={24}
        conIndexCurrent={25}
        chaIndex={26}
        chaIndexCurrent={27}
        clericIndex={265}
        fighterIndex={267}
        paladinIndex={268}
        rangerIndex={269}
        magicUserIndex={270}
        thiefIndex={271}
      />
    );
  }


  function CharInfoDisplay() {
    return (
      <CharComponents.CharInfoDisplay
        dataArray={dataArray}
        setDataArray={setDataArray}
        maxHPIndex={120}
        currentHPIndex={420}
        experienceIndex={295}
        statusIndex={405}
        statusCodes={azureStatusCodes}
        racesList={azureRaces}
        raceIndex={116}
        genderIndex={281}
      />
    );
  }

  function MoneyDisplay() {
    return (
      <CharComponents.CharMoneyComponent
        dataArray={dataArray}
        setDataArray={setDataArray}
        copperIndex={251}
        silverIndex={253}
        electrumIndex={255}
        goldIndex={257}
        platinumIndex={259}
        gemsIndex={261}
        jewelryIndex={263}
      />
    );
  }

  return (

    <div className="charEditBody">
      <div className="row">
        <h2 className="mainTitle">
          Advanced Dungeons and Dragons
          <br />
          Curse of the Azure Bonds
        </h2>
        <div className="col-md-6">
          <h3 style={{ textAlign: "center" }}>Character Editor</h3>
          <div className="mb-3">
            <input
              className="form-control"
              type="file"
              id="fileSelect"
              accept=".sav"
              onChange={(e) => {
                // createInventoryFile(e);
                setSelectedFile(e.target.files[0]);
                loadFile(e.target.files[0]);
              }}
            />
          </div>
          {dataArray ? (
            <button
              className="btn btn-success"
              onClick={() => exportSaveFile()}
            >
              Download Character File
            </button>
          ) : null}
          <br />
          <p></p>
          {dataArray ? (
            <>
              <div className="accordion" id="charEditAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Character Info
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                  >
                    <div className="accordion-body">
                      <CharInfoDisplay />
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="true"
                      aria-controls="collapseTwo"
                    >
                      Ability Scores and Levels
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingTwo"
                  >
                    <div className="accordion-body">
                      <CharAbilityDisplay />
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingMoney">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseMoney"
                      aria-expanded="true"
                      aria-controls="collapseMoney"
                    >
                      Money
                    </button>
                  </h2>
                  <div
                    id="collapseMoney"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingMoney"
                  >
                    <div className="accordion-body">
                      <MoneyDisplay />
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Magic-user Spells
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                  >
                    <div className="accordion-body">
                      <div className="row">
                        <MagicDisplay startingIndex={311} magicFilter="Mage" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Cleric Spells
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                  >
                    <div className="accordion-body">
                      <div className="row">
                        <MagicDisplay
                          startingIndex={301}
                          magicFilter="Cleric"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFive">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Druid Spells
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                  >
                    <div className="accordion-body">
                      <div className="row">
                        <MagicDisplay startingIndex={306} magicFilter="Druid" />
                      </div>
                    </div>
                  </div>
                </div>
          </div></> ) : null}
          </div>
          <div className="col-md-6">
          <h3 style={{ textAlign: "center" }}>Inventory Editor</h3>
            <AzureInventory />
          </div>
          </div>
          </div>
          
  )
}

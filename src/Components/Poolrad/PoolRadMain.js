import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import { poolRadStatusCodes, poolRadRaces, poolRadSpells } from "./PoolRadData";
import PoolRadInventory from "./PoolRadInventory";
import * as CharFunctions from "../CharFunctions";
import * as CharComponents from "../CharComponents";

export default function PoolRadMain() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  const [inventoryFileName, setInventoryFileName] = useState(null);

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
    let loadedFileName = e.target.files[0].name;
    let inventoryFile =
      loadedFileName.substr(0, loadedFileName.lastIndexOf(".")) + ".STF";
    setInventoryFileName(inventoryFile);
  }

  const arcaneMagicDisplay = (
    <>
      <h4>Magic-user Spell Slots</h4>
      <div className="row">
        <div className="col-2">
          1:{" "}
          <CharFunctions.LevelModule
            dataArray={dataArray}
            setDataArray={setDataArray}
            dataArrayIndex={181}
          />
        </div>
        <div className="col-2">
          2:{" "}
          <CharFunctions.LevelModule
            dataArray={dataArray}
            setDataArray={setDataArray}
            dataArrayIndex={182}
          />
        </div>
        <div className="col-2">
          3:{" "}
          <CharFunctions.LevelModule
            dataArray={dataArray}
            setDataArray={setDataArray}
            dataArrayIndex={183}
          />
        </div>
      </div>
      <h4>Mage Spells:</h4>{" "}
      <div>
        <CharFunctions.SpellModule
          dataArray={dataArray}
          setDataArray={setDataArray}
          dataArrayMin={50}
          dataArrayMax={107}
          dataList={poolRadSpells}
          filter="Mage"
        />
      </div>
    </>
  );

  const clericMagicDisplay = (
    <>
      <h4>Cleric Spell Slots</h4>
      <div className="row">
        <div className="col-2">
          1:{" "}
          <CharFunctions.LevelModule
            dataArray={dataArray}
            setDataArray={setDataArray}
            dataArrayIndex={178}
          />
        </div>
        <div className="col-2">
          2:{" "}
          <CharFunctions.LevelModule
            dataArray={dataArray}
            setDataArray={setDataArray}
            dataArrayIndex={179}
          />
        </div>
        <div className="col-2">
          3:{" "}
          <CharFunctions.LevelModule
            dataArray={dataArray}
            setDataArray={setDataArray}
            dataArrayIndex={180}
          />
        </div>
      </div>
      <h4>Cleric Spells:</h4>{" "}
      <div>
        <CharFunctions.SpellModule
          dataArray={dataArray}
          setDataArray={setDataArray}
          dataArrayMin={50}
          dataArrayMax={107}
          dataList={poolRadSpells}
          filter="Cleric"
        />
      </div>
    </>
  );

  return (
    <div className="charEditBody">
      <div className="row">
        <h2 className="mainTitle">
          Advanced Dungeons and Dragons
          <br />
          Pool of Radiance
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
                console.log(e.target.files);
                createInventoryFile(e);
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
                      <CharComponents.CharInfoDisplay
                        dataArray={dataArray}
                        setDataArray={setDataArray}
                        maxHPIndex={50}
                        currentHPIndex={283}
                        experienceIndex={172}
                        statusCodes={poolRadStatusCodes}
                        racesList={poolRadRaces}
                      />
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
                      <CharComponents.CharAbilityDisplay
                        dataArray={dataArray}
                        setDataArray={setDataArray}
                        strIndex={16}
                        extStrIndex={22}
                        intIndex={17}
                        wisIndex={18}
                        dexIndex={19}
                        conIndex={20}
                        chaIndex={21}
                        clericIndex={151}
                        fighterIndex={152}
                        magicUserIndex={155}
                        thiefIndex={156}
                      />
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
                      <CharComponents.CharMoneyComponent
                        dataArray={dataArray}
                        setDataArray={setDataArray}
                        copperIndex={136}
                        silverIndex={138}
                        electrumIndex={140}
                        goldIndex={142}
                        platinumIndex={144}
                        gemsIndex={146}
                        jewelryIndex={148}
                      />
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
                    <div className="accordion-body">{arcaneMagicDisplay}</div>
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
                    <div className="accordion-body">{clericMagicDisplay}</div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div className="col-md-6">
          <h3 style={{ textAlign: "center" }}>Inventory Editor</h3>

          <PoolRadInventory inventoryFileName={inventoryFileName} />
        </div>
      </div>
    </div>
  );
}

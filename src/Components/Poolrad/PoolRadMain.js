import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import {
  alignments,
  poolRadStatusCodes,
  poolRadRaces,
  genders,
  poolRadSpells,
} from "./PoolRadData";
import PoolRadInventory from "./PoolRadInventory";
import * as CharFunctions from "../CharFunctions";

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

  const charInfoDisplay = (
    <>
      <div className="row">
        <div className="col-md-3">
          Character Name:{" "}
          <CharFunctions.NameModule
            dataArray={dataArray}
            setDataArray={setDataArray}
          />
        </div>
        <div className="col-md-3">
          Max HP:{" "}
          <CharFunctions.HitPointModule
            dataArray={dataArray}
            setDataArray={setDataArray}
            dataArrayIndex={50}
          />
        </div>
        <div className="col-md-3">
          Current HP:{" "}
          <CharFunctions.HitPointModule
            dataArray={dataArray}
            setDataArray={setDataArray}
            dataArrayIndex={283}
          />
        </div>
        <div className="col-md-3">
          Experience:{" "}
          <CharFunctions.ExperienceModule
            dataArray={dataArray}
            setDataArray={setDataArray}
            dataArrayIndex={172}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          Status:{" "}
          <CharFunctions.SelectModule
            dataArray={dataArray}
            setDataArray={setDataArray}
            index={268}
            dataList={poolRadStatusCodes}
          />
        </div>
        <div className="col-md-3">
          Alignment:{" "}
          <CharFunctions.SelectModule
            dataArray={dataArray}
            setDataArray={setDataArray}
            index={160}
            dataList={alignments}
          />
        </div>
        <div className="col-md-3">
          Race:{" "}
          <CharFunctions.SelectModule
            dataArray={dataArray}
            setDataArray={setDataArray}
            index={46}
            dataList={poolRadRaces}
          />
        </div>
        <div className="col-md-3">
          Gender:{" "}
          <CharFunctions.SelectModule
            dataArray={dataArray}
            setDataArray={setDataArray}
            index={158}
            dataList={genders}
          />
        </div>
      </div>
    </>
  );

  const charAbilityDisplay = (
    <>
      <div className="row">
        <div className="col-md-6">
          <h4 style={{ textAlign: "center" }}>Ability Scores</h4>
          <div className="row">
            <div className="col-4">Strength:</div>
            <CharFunctions.StrengthModule
              idText="strengthScore"
              dataArray={dataArray}
              setDataArray={setDataArray}
              extStrIndex={22}
              dataArrayIndex={16}
            />
          </div>
          <div className="row">
            <div className="col-4">Intelligence:</div>
            <div className="col-4">
              <CharFunctions.ScoreModule
                dataArray={dataArray}
                setDataArray={setDataArray}
                dataArrayIndex={17}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">Wisdom:</div>
            <div className="col-4">
              <CharFunctions.ScoreModule
                dataArray={dataArray}
                setDataArray={setDataArray}
                dataArrayIndex={18}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">Dexterity:</div>
            <div className="col-4">
              <CharFunctions.ScoreModule
                dataArray={dataArray}
                setDataArray={setDataArray}
                dataArrayIndex={19}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">Constitution:</div>
            <div className="col-4">
              <CharFunctions.ScoreModule
                dataArray={dataArray}
                setDataArray={setDataArray}
                dataArrayIndex={20}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">Charisma:</div>
            <div className="col-4">
              <CharFunctions.ScoreModule
                dataArray={dataArray}
                setDataArray={setDataArray}
                dataArrayIndex={21}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4 style={{ textAlign: "center" }}>Levels</h4>
          <div className="row">
            <div className="col-6">Cleric: </div>
            <div className="col-6">
              <CharFunctions.LevelModule
                dataArray={dataArray}
                setDataArray={setDataArray}
                dataArrayIndex={151}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">Fighter: </div>
            <div className="col-6">
              <CharFunctions.LevelModule
                dataArray={dataArray}
                setDataArray={setDataArray}
                dataArrayIndex={152}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">Magic-User: </div>
            <div className="col-6">
              <CharFunctions.LevelModule
                dataArray={dataArray}
                setDataArray={setDataArray}
                dataArrayIndex={155}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">Thief: </div>
            <div className="col-6">
              <CharFunctions.LevelModule
                dataArray={dataArray}
                setDataArray={setDataArray}
                dataArrayIndex={156}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );

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
                    <div className="accordion-body">{charInfoDisplay}</div>
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
                    <div className="accordion-body">{charAbilityDisplay}</div>
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

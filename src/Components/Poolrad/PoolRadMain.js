import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import {
  poolRadStatusCodes,
  poolRadRaces,
  poolRadSpells,
  poolRadClassList,
} from "./PoolRadData";
import PoolRadInventory from "./PoolRadInventory";
import * as CharFunctions from "../CharFunctions";
import * as CharComponents from "../CharComponents";
import poolRadBanner from "../../assets/images/poolRad1Crop.png";
import podCoverImage from "../../assets/images/pod800.jpg";
import azureCoverImage from "../../assets/images/azure800.jpg";
import silverBladesCoverImage from "../../assets/images/silverBlades800.jpg";
import poolRadCoverImage from "../../assets/images/poolRadCover800.jpg";

export default function PoolRadMain() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  const [inventoryLoaded, setInventoryLoaded] = useState(false);

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
      if (data.byteLength !== 285) {
        return alert(
          "This doesn't appear to be a save file from Pool of Radiance"
        );
      } else {
        let dataArray = new Uint8Array(data);
        setDataArray(dataArray);
      }
    };
    reader.onerror = function (e) {
      console.log("Error : " + e.type);
    };
    reader.readAsArrayBuffer(file);
  }

  // function createInventoryFile(e) {
  //   let loadedFileName = e.target.files[0].name;
  //   let inventoryFile =
  //     loadedFileName.substr(0, loadedFileName.lastIndexOf(".")) + ".STF";
  //   setInventoryFileName(inventoryFile);
  // }

  function CharAbilityDisplay() {
    return (
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
        clericIndex={150}
        fighterIndex={152}
        magicUserIndex={155}
        thiefIndex={156}
      />
    );
  }

  function CharInfoDisplay() {
    return (
      <CharComponents.CharInfoDisplay
        dataArray={dataArray}
        setDataArray={setDataArray}
        maxHPIndex={50}
        currentHPIndex={283}
        experienceIndex={172}
        statusIndex={268}
        statusCodes={poolRadStatusCodes}
        racesList={poolRadRaces}
        raceIndex={46}
        genderIndex={158}
        alignmentIndex={160}
        classList={poolRadClassList}
        classIndex={47}
      />
    );
  }

  function CharSavesDisplay() {
    return (
      <CharComponents.CharSavesDisplay
        dataArray={dataArray}
        setDataArray={setDataArray}
        deathSaveIndex={109}
        petriPolySaveIndex={110}
        rodStaffWandSaveIndex={111}
        breathWeaponSaveIndex={112}
        spellSaveIndex={113}
      />
    );
  }

  function ThiefSkillsDisplay() {
    return (
      <CharComponents.ThiefSkillsDisplay
        dataArray={dataArray}
        setDataArray={setDataArray}
        pickPocketsIndex={119}
        openLocksIndex={120}
        findTrapsIndex={121}
        moveSilentlyIndex={122}
        hideInShadowsIndex={123}
        hearNoiseIndex={124}
        climbWallsIndex={125}
        readLanguagesIndex={126}

      />
    );
  }

  function MagicDisplay(props) {
    let spellArray = [0, 1, 2];

    let spellSlots = spellArray.map((item, index) => (
      <div key={index} className="col-6 col-md-2">
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
            dataArrayMin={50}
            dataArrayMax={107}
            dataList={poolRadSpells}
            filter={props.magicFilter}
          />
        </div>
      </>
    );
  }

  function MoneyDisplay() {
    return (
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
    );
  }

  let splashImage =
    dataArray || inventoryLoaded === true ? null : (
      <>
        <h5 style={{ marginBottom: 20 }}>
          To begin, upload a character file (.SAV) or an inventory file (.ITM)
          from <em>Pool of Radiance</em>.
        </h5>

        <h6>Need somewhere to start? Try the <em>Pool of Radiance</em> <a href={"/files/poolRadDefaultCharacters.zip"}>default characters</a>.</h6>
       
        <div
          className="row g-1 d-flex justify-content-center"
          style={{ marginTop: "5vh", textAlign: "center" }}
        >
          <div className="col-md-auto">
            <img
              className="coverImage"
              src={poolRadCoverImage}
              alt="pool of radiance"
            />
          </div>
          <div className="col-md-auto">
            <a href="/azure">
              <img
                className="coverImageFaded"
                src={azureCoverImage}
                alt="curse of the azure bonds"
              />
            </a>
          </div>
          <div className="col-md-auto">
            <a href="/silverblades">
              <img
                className="coverImageFaded"
                src={silverBladesCoverImage}
                alt="secret of the silver blades"
              />
            </a>
          </div>
          <div className="col-md-auto">
            <a href="/pod">
              <img
                className="coverImageFaded"
                src={podCoverImage}
                alt="pools of darkness"
              />
            </a>
          </div>
        </div>
      </>
    );

  return (
    <div className="charEditBody">
      <div className="row">
      <div className="col-md-12 gx-0">

        <img style={{width:"100%"}}src={poolRadBanner} alt="pool of radiance orignal title screen" />
        <h2 className="mainTitle">
          Advanced Dungeons and Dragons: Pool of Radiance
        </h2>
        </div>
      </div>
      <div className="row" style={{ marginTop: 20 }}>
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
              className="btn downloadButton"
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
                  <h2 className="accordion-header" id="headingSaves">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSaves"
                      aria-expanded="true"
                      aria-controls="collapseSaves"
                    >
                      Saving Throws
                    </button>
                  </h2>
                  <div
                    id="collapseSaves"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingSaves"
                  >
                    <div className="accordion-body">
                      <CharSavesDisplay />
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThief">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThief"
                      aria-expanded="true"
                      aria-controls="collapseThief"
                    >
                      Thief Skills
                    </button>
                  </h2>
                  <div
                    id="collapseThief"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThief"
                  >
                    <div className="accordion-body">
                      <ThiefSkillsDisplay />
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
                        <MagicDisplay magicFilter="Mage" startingIndex={181} />
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
                        <MagicDisplay magicFilter="Cleric" startingIndex={178} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}

        </div>
        <div className="col-md-6">
          <h3 style={{ textAlign: "center" }}>Inventory Editor</h3>

          <PoolRadInventory
            inventoryLoaded={inventoryLoaded}
            setInventoryLoaded={setInventoryLoaded}
          />
        </div>
      </div>
      <div
        className="row g-1 d-flex justify-content-center"
        style={{ marginTop: "5vh", textAlign: "center" }}
      >
        <div className="col-md-auto">{splashImage}</div>
      </div>
    </div>
  );
}

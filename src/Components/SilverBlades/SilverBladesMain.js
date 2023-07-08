import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import {
  silverBladesStatusCodes,
  silverBladesRaces,
  silverBladesSpellList,
  silverBladesClassList,
} from "./SilverBladesData";
import SilverBladesInventory from "./SilverBladesInventory";
import * as CharComponents from "../CharComponents";
import * as CharFunctions from "../CharFunctions";
import silverBladesBanner from "../../assets/images/silverBladesBannerCropped.png";
import podCoverImage from "../../assets/images/pod800.jpg";
import azureCoverImage from "../../assets/images/azure800.jpg";
import silverBladesCoverImage from "../../assets/images/silverBlades800.jpg";
import poolRadCoverImage from "../../assets/images/poolRadCover800.jpg";

export default function SilverBladesMain() {
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
      if (data.byteLength !== 439) {
        return alert(
          "This doesn't appear to be a save file from Secret of the Silver Blades"
        );
      } else {
        let dataArray = new Uint8Array(data);
        console.log(dataArray);
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

  function MagicDisplay(props) {
    let spellArray = [0, 1, 2, 3];

    if (props.magicFilter === "Mage") {
      spellArray = [0, 1, 2, 3, 4, 5, 6];
    }
    if (props.magicFilter === "Cleric") {
      spellArray = [0, 1, 2, 3, 4, 5];
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
            dataArrayMin={112}
            dataArrayMax={230}
            dataList={silverBladesSpellList}
            filter={props.magicFilter}
          />
        </div>
      </>
    );
  }

  function CharInfoDisplay() {
    return (
      <CharComponents.CharInfoDisplay
        dataArray={dataArray}
        setDataArray={setDataArray}
        maxHPIndex={112}
        currentHPIndex={437}
        experienceIndex={300}
        statusIndex={422}
        statusCodes={silverBladesStatusCodes}
        racesList={silverBladesRaces}
        raceIndex={107}
        genderIndex={287}
        alignmentIndex={288}
        classIndex={108}
        classList={silverBladesClassList}
      />
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
        clericIndex={273}
        fighterIndex={275}
        paladinIndex={276}
        rangerIndex={277}
        magicUserIndex={278}
        thiefIndex={279}
       
      />
    );
  }

  function MoneyDisplay() {
    return (
      <CharComponents.CharMoneyComponent
        dataArray={dataArray}
        setDataArray={setDataArray}
        copperIndex={259}
        silverIndex={261}
        electrumIndex={263}
        goldIndex={265}
        platinumIndex={267}
        gemsIndex={269}
        jewelryIndex={271}
      />
    );
  }

  let splashImage = dataArray || inventoryLoaded===true ? null : (
    <>
    <h5 style={{marginBottom:20}}>To begin, upload a character file (.SAV) or an inventory file (.STF) from <em>Secret of the Silver Blades</em>.</h5>

    {/* <img
      style={{ maxHeight: 400 }}
      src={silverBladesCoverImage}
      alt="secret of the silver blades box cover"
    /> */}
    <div className="row g-1 d-flex justify-content-center" style={{marginTop:"5vh", textAlign:"center"}}>
      <div className="col-md-auto">
        <a href="/poolRad">
          <img className="coverImageFaded" src={poolRadCoverImage} alt="pool of radiance"/>
        </a>
      </div>
      <div className="col-md-auto">
        <a href="/azure">
          <img className="coverImageFaded" src={azureCoverImage} alt="curse of the azure bonds"/>
        </a>
      </div>
      <div className="col-md-auto">
       
          <img className="coverImage" src={silverBladesCoverImage} alt="secret of the silver blades"/>
    
      </div>
      <div className="col-md-auto">
        <a href="/pod">
          <img className="coverImageFaded" src={podCoverImage} alt="pools of darkness"/>
        </a>
      </div>
    </div>
    </>
  );

  return (
    <div className="charEditBody">
      <div className="row">
        <img src={silverBladesBanner} alt="silver blades title screen" />
        <h2 className="mainTitle">
          Advanced Dungeons and Dragons: Secret of the Silver Blades
        </h2>
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
                        <MagicDisplay startingIndex={327} magicFilter="Mage" />
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
                          startingIndex={306}
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
                        <MagicDisplay startingIndex={313} magicFilter="Druid" />
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

          <SilverBladesInventory inventoryLoaded={inventoryLoaded} setInventoryLoaded={setInventoryLoaded}/>
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

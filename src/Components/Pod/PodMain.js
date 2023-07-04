import { useState } from "react";
import { podRaces, podStatusCodes, podSpellList } from "./PodData";
import * as CharComponents from "../CharComponents";
import * as CharFunctions from "../CharFunctions";

export function PodMain() {
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
      if (data.byteLength !== 510) {
        return alert(
          "This doesn't appear to be a save file from Pools of Darkness"
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

  function CharInfoDisplay() {
    return (
      <CharComponents.CharInfoDisplay
        dataArray={dataArray}
        setDataArray={setDataArray}
        maxHPIndex={380} //done
        currentHPIndex={508} //done
        experienceIndex={370} //done
        statusIndex={493}  //done
        statusCodes={podStatusCodes}
        racesList={podRaces}
        raceIndex={173} // done
        genderIndex={358} //done
        alignmentIndex={359}
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
        clericIndex={337}
        fighterIndex={339}
        paladinIndex={340}
        rangerIndex={341}
        magicUserIndex={342}
        thiefIndex={343}
      />
    );
  }

  function MoneyDisplay() {
    return (
      <CharComponents.CharMoneyComponent
        dataArray={dataArray}
        setDataArray={setDataArray}
        copperIndex={323}
        silverIndex={325}
        electrumIndex={327}
        goldIndex={329}
        platinumIndex={331}
        gemsIndex={333}
        jewelryIndex={335}
      />
    );
  }

  function MagicDisplay(props) {
    let spellArray = [0, 1, 2];

    if (props.magicFilter === "Mage") {
      spellArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    }
    if (props.magicFilter === "Cleric") {
      spellArray = [0, 1, 2, 3, 4, 5, 6];
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
            dataArrayMin={178}
            dataArrayMax={292}
            dataList={podSpellList}
            filter={props.magicFilter}
          />
        </div>
      </>
    );
  }

  return (
    <div className="charEditBody">
      <div className="row">
        <h2 className="mainTitle">
          Advanced Dungeons and Dragons
          <br />
          Pools of Darkness
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

          {dataArray ?
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
                        <MagicDisplay startingIndex={399} magicFilter="Mage" />
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
                          startingIndex={381}
                          magicFilter="Cleric"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                </div> : null }
        </div>
        <div className="col-md-6">Inventory</div>
      </div>
    </div>
  );
}

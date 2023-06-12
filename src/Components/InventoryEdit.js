import { useState, useEffect } from "react";
import { itemValues } from "../Data/ItemValues";

export default function InventoryEdit() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  const [loadedItem, setLoadedItem] = useState(null);

  function loadFile(file) {
    if (document.querySelector("#fileSelect").value === "") {
      alert("No file selected");
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      setLoadedItem(null);
      let data = e.target.result;
      let dataArray = new Uint8Array(data);
      console.log(dataArray);
      setDataArray(dataArray);
    };
    reader.onerror = function (e) {
      console.log("Error : " + e.type);
    };
    reader.readAsArrayBuffer(file);
  }

  function ItemEditModule(props) {
    let tempArray = dataArray;

    const [displayName1, setDisplayName1] = useState(
      itemValues[tempArray[parseInt(Object.keys(loadedItem)) + 49]]
    );
    const [displayName2, setDisplayName2] = useState(
      itemValues[tempArray[parseInt(Object.keys(loadedItem)) + 48]]
    );
    const [displayName3, setDisplayName3] = useState(
      itemValues[tempArray[parseInt(Object.keys(loadedItem)) + 47]]
    );
    const [updated, setUpdated] = useState(true);

    useEffect(() => {
      setDisplayName1(
        itemValues[tempArray[parseInt(Object.keys(loadedItem)) + 49]]
      );
      setDisplayName2(
        itemValues[tempArray[parseInt(Object.keys(loadedItem)) + 48]]
      );
      setDisplayName3(
        itemValues[tempArray[parseInt(Object.keys(loadedItem)) + 47]]
      );
    }, [tempArray, updated]);

    function ValueModule(props) {
      const [valueState, setValueState] = useState(tempArray[props.value]);

      function saveValue() {
        tempArray[props.value] = valueState;
      }

      return (
        <>
          {
            <input
              value={valueState}
              onChange={(e) => setValueState(e.target.value)}
              type="text"
              style={{ maxWidth: "30%" }}
              onBlur={() => saveValue()}
            />
          }
        </>
      );
    }

    function NameSelect(props) {
      let dropList = Object.entries(itemValues).map((item, index) => (
        <option key={index} value={item[0]}>
          {item[1]}
        </option>
      ));

      let defaultDisplay = tempArray[props.value];

      return (
        <>
          <select
            className="form-select"
            defaultValue={defaultDisplay}
            aria-label="Item value dropdown"
            onChange={(e) => {
              tempArray[props.value] = e.target.value;
              setUpdated(!updated);
              setDataArray(tempArray);
            }}
          >
            <option disabled value={-1}>
              Select name
            </option>
            {dropList}
          </select>
        </>
      );
    }

    const mainDisplay =
      loadedItem != null ? (
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <h5>
                {displayName1} {displayName2} {displayName3}
              </h5>
            </div>
          </div>
          <div className="card-body"></div>
          <div className="row">
            <div className="col-3">
              Type:{" "}
              <ValueModule value={parseInt(Object.keys(loadedItem)) + 46} />
            </div>
            <div className="col-3">
              Bonus:{" "}
              <ValueModule value={parseInt(Object.keys(loadedItem)) + 50} />
            </div>
            <div className="col-3">
              Charges:{" "}
              <ValueModule value={parseInt(Object.keys(loadedItem)) + 60} />
            </div>
            <div className="col-3">
              Ammo:{" "}
              <ValueModule value={parseInt(Object.keys(loadedItem)) + 57} />
            </div>
          </div>
          <div style={{ marginTop: 20 }} className="row">
            <div className="col-3">
              Weight:{" "}
              <ItemWeightModule
                value={parseInt(Object.keys(loadedItem)) + 55}
              />
            </div>
          </div>
          <div style={{ marginTop: 20 }} className="row">
            <h5>Rename</h5>
          </div>

          <div className="row">
            <div className="col-4">
              <NameSelect value={parseInt(Object.keys(loadedItem)) + 49} />
            </div>
            <div className="col-4">
              <NameSelect value={parseInt(Object.keys(loadedItem)) + 48} />
            </div>
            <div className="col-4">
              <NameSelect value={parseInt(Object.keys(loadedItem)) + 47} />
            </div>
          </div>
          <div className="card-footer d-flex flex-row-reverse">
            <button
              className="btn btn-primary shadow"
              onClick={() => setLoadedItem(null)}
            >
              Done Editing
            </button>
          </div>
        </div>
      ) : null;

    return mainDisplay;
  }

  function ItemListModule() {
    const [loading, setLoading] = useState(true);
    const [itemListArray, setItemListArray] = useState([]);

    useEffect(() => {
      if (loading === true) {
        assembleList();
        setLoading(false);
      }
    }, [setItemListArray, itemListArray, loading]);

    const defaultDisplay = itemListArray.map((item, index) => (
      <div key={index} className="row d-flex inventoryItem">
        <div className="col-12">
          {Object.values(item)}{" "}
          {!loadedItem ? (
            <button
              className="btn btn-primary shadow editButton"
              onClick={() => setLoadedItem(item)}
            >
              Edit
            </button>
          ) : null}
        </div>
      </div>
    ));

    function assembleList() {
      let nameArray = [];
      for (let i = 0; i < Array.from(dataArray).length; i++) {
        let assembledName = "";
        if (i === 0 || i % 67 === 0) {
          let j = dataArray[i + 49];
          let k = dataArray[i + 48];
          let l = dataArray[i + 47];
          assembledName = `${itemValues[j]} ${itemValues[k]} ${itemValues[l]}`;
          nameArray.push({ [i]: assembledName });
        }
      }
      setItemListArray(nameArray);
    }

    return defaultDisplay;
  }

  function ItemWeightModule(props) {
    let tempArray = dataArray;

    const [inputText, setInputText] = useState(
      parseInt(
        (0 + dataArray[props.value + 1].toString(16)).slice(-2) +
          (0 + dataArray[props.value].toString(16)).slice(-2),
        16
      )
    );

    const editDisplay = (
      <>
        {
          <input
            type="text"
            style={{ maxWidth: "30%" }}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onBlur={() => convertDecimaltoBinary()}
          />
        }
      </>
    );

    function convertDecimaltoBinary() {
      let eightBit = (
        "0000" + parseInt(inputText).toString(16).toUpperCase()
      ).slice(-4);
      let eightBitSplit = eightBit.match(/.{1,2}/g) ?? [];
      for (let i = 0; i < 1; i++) {
        if (eightBitSplit[i] === "00") {
          eightBitSplit[i] = "0";
        } else if (eightBitSplit[i].charAt(0) === "0") {
          eightBitSplit[i] = eightBitSplit[i].charAt(1);
        }
      }

      tempArray[props.value + 1] = parseInt(eightBitSplit[0], 16);
      tempArray[props.value] = parseInt(eightBitSplit[1], 16);
      setDataArray(tempArray);
    }

    return editDisplay;
  }

  const mainDisplay = (
    <>
      <div className="row">
        <ItemListModule />
      </div>

      <div className="row">
        {loadedItem ? <ItemEditModule /> : <h4>Select item to edit</h4>}
      </div>
    </>
  );

  function exportSaveFile() {
    const blob = new Blob([dataArray], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = selectedFile.name;
    link.href = url;
    link.click();
  }

  return (
    <div>
      <div className="row" style={{ minHeight: 40 }}>
        <div className="col-md">
          <input
            id="fileSelect"
            type="file"
            accept=".stf"
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
              loadFile(e.target.files[0]);
            }}
          />
          {dataArray && loadedItem === null ? (
            <button
              className="btn btn-success shadow"
              onClick={() => exportSaveFile()}
            >
              Save and Download
            </button>
          ) : null}
        </div>
      </div>
      <div className="row">
        <h3>Character Inventory</h3>

        {dataArray ? mainDisplay : null}
      </div>
    </div>
  );
}

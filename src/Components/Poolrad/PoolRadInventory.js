import { useState, useEffect } from "react";
import { poolRadItemValues } from "./PoolRadData";

export default function PoolRadInventory(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  const [loadedItem, setLoadedItem] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  function loadFile(file) {
    if (document.querySelector("#inventoryFileSelect").value === "") {
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

    const [displayName1, setDisplayName1] = useState("");
    const [displayName2, setDisplayName2] = useState("");
    const [displayName3, setDisplayName3] = useState("");
    const [updated, setUpdated] = useState(true);

    useEffect(() => {
      if (loadedItem) {
        setDisplayName1(
          poolRadItemValues[tempArray[parseInt(Object.keys(loadedItem)) + 49]]
        );
        setDisplayName2(
          poolRadItemValues[tempArray[parseInt(Object.keys(loadedItem)) + 48]]
        );
        setDisplayName3(
          poolRadItemValues[tempArray[parseInt(Object.keys(loadedItem)) + 47]]
        );
      }
    }, [tempArray, updated]);

    function ValueModule(props) {
      const [valueState, setValueState] = useState(
        tempArray[props.value]
      );

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
      let dropList = Object.entries(poolRadItemValues).map((item, index) => (
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
          <div className="card-header row">
            <div className="card-title">
              <h5>
                {displayName1} {displayName2} {displayName3}
              </h5>
            </div>
          </div>
          <div className="card-body"></div>
          <div className="row">
            <div className="col-3 inventoryText">
              Type:{" "}
              <ValueModule value={parseInt(Object.keys(loadedItem)) + 46} />
            </div>
            <div className="col-3 inventoryText">
              Bonus:{" "}
              <ValueModule value={parseInt(Object.keys(loadedItem)) + 50} />
            </div>
            <div className="col-3 inventoryText">
              Charges:{" "}
              <ValueModule value={parseInt(Object.keys(loadedItem)) + 60} />
            </div>
            <div className="col-3 inventoryText">
              Ammo:{" "}
              <ValueModule value={parseInt(Object.keys(loadedItem)) + 57} />
            </div>
          </div>
          <div style={{ marginTop: 20 }} className="row">
            <div className="col-3 inventoryText">
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
          <br />
          <div className="card-footer row d-flex flex-row-reverse">
            <button
              style={{ maxWidth: 200 }}
              className="btn btn-primary shadow"
              onClick={() => { setLoadedItem(null); setUnsavedChanges(true) }}
            >
              Done Editing
            </button>
          </div>
        </div>
      ) : null;

    const emptySelect = (
      <select
        className="form-select"
        defaultValue={0}
        aria-label="Item value dropdown"
        onChange={(e) => {
          tempArray[props.value] = e.target.value;
        }}
      >
        <option disabled value={0}></option>
      </select>
    );

    const emptyDisplay = (
      <div className="card">
        <div className="card-header row">
          <div id="cardTitle" className="card-title">
            <h5 style={{ color: "transparent" }}>Easter Egg secret message</h5>
          </div>
        </div>
        <div className="card-body"></div>
        <div className="row">
          <div className="col-3 inventoryText">
            Type: <input type="text" disabled style={{ width: "30%" }} />
          </div>
          <div className="col-3 inventoryText">
            Bonus: <input type="text" disabled style={{ width: "30%" }} />
          </div>
          <div className="col-3 inventoryText">
            Charges: <input type="text" disabled style={{ width: "30%" }} />
          </div>
          <div className="col-3 inventoryText">
            Ammo: <input type="text" disabled style={{ width: "30%" }} />
          </div>
        </div>
        <div style={{ marginTop: 20 }} className="row">
          <div className="col-3 inventoryText">
            Weight: <input type="text" disabled style={{ width: "30%" }} />
          </div>
        </div>
        <div style={{ marginTop: 20 }} className="row">
          <h5>Rename</h5>
        </div>

        <div className="row">
          <div className="col-4">{emptySelect}</div>
          <div className="col-4">{emptySelect}</div>
          <div className="col-4">{emptySelect}</div>
        </div>
        <br />
        <div className="card-footer row d-flex flex-row-reverse">
          <button className="btn" disabled style={{ maxWidth: 200 }}>
            No Item Selected
          </button>
        </div>
      </div>
    );

    return loadedItem ? mainDisplay : emptyDisplay;
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
        <p className="col-12">
          {Object.values(item)}{" "}
          {!loadedItem ? (
            <><button
              className="btn btn-primary editButton"
              onClick={() => setLoadedItem(item)}
            >
              Edit
            </button>
            {" "}
            <button
            className="btn btn-warning editButton"
            onClick={() => duplicateItem(item)}
          >
            Duplicate
          </button></>
          ) : null}
        </p>
      </div>
    ));

    function duplicateItem(item){
    let tempArray = Array.from(dataArray);
    for(let i =0;i<=62;i++){
      let n = tempArray[parseInt(Object.keys(item))+i]
      tempArray.push(n)

    }
    let newArray = new Uint8Array(tempArray);
      setDataArray(newArray);
      assembleList();
    }
    
  

    function assembleList() {
      let nameArray = [];
      for (let i = 0; i < Array.from(dataArray).length; i++) {
        let assembledName = "";
        if (i === 0 || i % 63 === 0) {
          let j = dataArray[i + 49];
          let k = dataArray[i + 48];
          let l = dataArray[i + 47];
          assembledName = `${poolRadItemValues[j]} ${poolRadItemValues[k]} ${poolRadItemValues[l]}`;
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
        {/* {loadedItem ? <ItemEditModule /> : <h4>Select item to edit</h4>} */}
        <ItemEditModule />
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
    <>
      <div className="row" style={{ minHeight: 40 }}>
        <div className="col-md">
          <div className="mb-3">
            <input
              className="form-control"
              type="file"
              id="inventoryFileSelect"
              accept=".itm"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
                loadFile(e.target.files[0]);
              }}
            />

          </div>

          {dataArray ? <button

            className="btn btn-success"
            onClick={() => exportSaveFile()}
          >
            Download Inventory File
          </button> : null}



        </div>
      </div>
      <br />
      <div className="row d-flex justify-content-center">
        {dataArray ? mainDisplay : null}
      </div>
    </>
  );
}
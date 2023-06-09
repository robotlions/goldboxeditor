import { useState, useEffect } from "react";
import { itemValues } from "../Data/ItemValues";

export default function NewInventoryEdit() {
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

    const [displayName1, setDisplayName1] = useState(itemValues[tempArray[parseInt(Object.keys(loadedItem))+49]]);
    const [displayName2, setDisplayName2] = useState(itemValues[tempArray[parseInt(Object.keys(loadedItem))+48]]);
    const [displayName3, setDisplayName3] = useState(itemValues[tempArray[parseInt(Object.keys(loadedItem))+47]]);
    const [updated, setUpdated] = useState(true);

    useEffect(()=>{

      setDisplayName1(itemValues[tempArray[parseInt(Object.keys(loadedItem))+49]]);
      setDisplayName2(itemValues[tempArray[parseInt(Object.keys(loadedItem))+48]]);
      setDisplayName3(itemValues[tempArray[parseInt(Object.keys(loadedItem))+47]]);
    },[tempArray, updated])


    function ValueModule(props) {
      const [valueState, setValueState] = useState(tempArray[props.value]);

      function saveValue() {
        tempArray[props.value] = valueState;
      }

      return (
        <div className="d-flex">
          <input
            value={valueState}
            onChange={(e) => setValueState(e.target.value)}
            type="text"
            style={{ maxWidth: "30%" }}
          />
          <button style={{ fontSize: 12 }} onClick={() => saveValue()}>
            Save
          </button>
        </div>
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
        <>
          <div className="row">
            {displayName1} {displayName2} {displayName3}
          </div>
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
        </>
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
      <div key={index} className="row d-flex">
        <div className="col-12">
          {Object.values(item)}{" "}
          <button onClick={() => setLoadedItem(item)}>Edit</button>
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

  const mainDisplay = (
    <div className="row">
      <div className="col-4">
        <ItemListModule />
      </div>
      <div className="col-8">
        {loadedItem ? <ItemEditModule /> : null}
      </div>
    </div>
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
      <div className="row">
        <div className="col">
          <input
            id="fileSelect"
            type="file"
            accept=".stf"
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
              loadFile(e.target.files[0]);
            }}
          />

          <button className="btn btn-primary" onClick={() => exportSaveFile()}>
            Download Item File
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <h5>Items</h5>
        </div>
        <div className="col-8">
          <h5>Edit</h5>
        </div>
      </div>
      {dataArray ? (
        mainDisplay
      ) : (
        <h5 className="col-5">
          Upload an inventory file. It will end in .STF and will look something
          like this: CHRDATB1.STF
        </h5>
      )}
    </div>
  );
}

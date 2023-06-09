import { useState, useEffect } from "react";
import { itemValues } from "../Data/ItemValues";

export default function InventoryEdit() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataArray, setDataArray] = useState(null);

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

  function ItemListModule() {
    let tempArray = dataArray;
    const [loading, setLoading] = useState(true);
    const [itemListArray, setItemListArray] = useState([]);

    useEffect(() => {
      if (loading === true) {
        assembleList();
        setLoading(false);
      }
    }, [setItemListArray, itemListArray, loading]);

    const defaultDisplay = itemListArray.map((item, index) => (
      <div key={index} className="row">
        <div className="col-2">{Object.values(item)}</div>
        <div className="col-1">
          <ValueModule value={parseInt(Object.keys(item)) + 46} />
        </div>
        <div className="col-1">
          <ValueModule value={parseInt(Object.keys(item)) + 50} />
        </div>
        <div className="col-1">
          <ValueModule value={parseInt(Object.keys(item)) + 60} />
        </div>
        <div className="col-2">
          <NameSelect value={parseInt(Object.keys(item)) + 49} />
        </div>
        <div className="col-2">
          <NameSelect value={parseInt(Object.keys(item)) + 48} />
        </div>
        <div className="col-2">
          <NameSelect value={parseInt(Object.keys(item)) + 47} />
        </div>
      </div>
    ));

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

      return (
        <>
          <select
            className="form-select"
            defaultValue={-1}
            aria-label="Item value dropdown"
            onChange={(e) => {tempArray[props.value] = e.target.value;setDataArray(tempArray)}}
          >
            <option disabled value={-1}>Select name</option>
            {dropList}
          </select>
        </>
      );
    }

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
        <div className="col-2">
          <h5>Items</h5>
        </div>
        <div className="col-1">
          <h5>Type</h5>
        </div>
        <div className="col-1">
          <h5>Bonus</h5>
        </div>
        <div className="col-1">
          <h5>Charges</h5>
        </div>
        <div className="col-6 d-flex justify-content-center">
          <h5>Name Select</h5>
        </div>
      </div>
      {dataArray ? (
        <ItemListModule />
      ) : (
        <h5 className="col-5">
          Upload an inventory file. It will end in .STF and will look something
          like this: CHRDATB1.STF
        </h5>
      )}
    </div>
  );
}

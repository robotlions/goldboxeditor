import { useState } from "react";

export function BinaryTool() {
  const [dataArray1, setDataArray1] = useState(null);
  const [dataArray2, setDataArray2] = useState(null);
  const [compareArray, setCompareArray] = useState([]);
  const [searchArray, setSearchArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function loadFile1(file) {
    // if (document.querySelector("#fileSelect").value === "") {
    //   alert("No file selected");
    //   return;
    // }

    var reader = new FileReader();
    reader.onload = function (e) {
      let data = e.target.result;

      let dataArray = new Uint8Array(data);
      setDataArray1(dataArray);
      console.log(dataArray)
    };
    reader.onerror = function (e) {
      console.log("Error : " + e.type);
    };
    reader.readAsArrayBuffer(file);
  }

  function loadFile2(file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      let data = e.target.result;
        if(parseInt(data.byteLength) !== dataArray1.length){
            return alert("These don't seem to be the same type of files.")
        }
      let dataArray = new Uint8Array(data);
      setDataArray2(dataArray);
    };
    reader.onerror = function (e) {
      console.log("Error : " + e.type);
    };
    reader.readAsArrayBuffer(file);
  }

  function doCompare() {
    let resultsArray = [];

    let array1 = Array.from(dataArray1);
    let array2 = Array.from(dataArray2);

    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        resultsArray.push({ index: [i], a1Val: array1[i], a2Val: array2[i] });
      }
    }

    setCompareArray(resultsArray);
  }

  function doSearch() {
    let resultsArray = [];

    let array1 = Array.from(dataArray1);

    for (let i = 0; i < array1.length; i++) {
      if (parseInt(array1[i]) === parseInt(searchTerm)) {
        resultsArray.push({ index: [i], a1Val: array1[i] });
      }
    }

    setSearchArray(resultsArray);
  }

  function SearchDisplay() {
    let componentDisplay = searchArray.map((item, index) => (
      <div
        className="row"
        style={{ backgroundColor: index % 2 === 0 && "lightBlue" }}
        key={index}
      >
        <div className="col-md-2">{item.index}</div>{" "}
        <div className="col-md-2">{item.a1Val}</div>{" "}
      </div>
    ));

    return searchArray.length === 0 ? (
      null
    ) : (
      <>
        <div className="row" style={{fontWeight: "bold"}}>
          <div className="col-md-2">Index</div>
          <div className="col-md-2">File 1</div>
        </div>
        {componentDisplay}
      </>
    );
  }

  function CompareDisplay() {
    // let mainDisplay = finalArray.map((item, index) => <div key={index}>{Object.keys(item)}</div>)
    let componentDisplay = compareArray.map((item, index) => (
      <div
        className="row"
        style={{ backgroundColor: index % 2 === 0 && "lightGray" }}
        key={index}
      >
        <div className="col-md-2">{item.index}</div>{" "}
        <div className="col-md-2">{item.a1Val}</div>{" "}
        <div className="col-md-2">{item.a2Val} </div>
      </div>
    ));

    return compareArray.length === 0 ? (
      null
    ) : (
      <>
      <div>No. of non-matching values: {compareArray.length}</div>
        <div className="row" style={{fontWeight: "bold"}}>
          <div className="col-md-2">Index</div>
          <div className="col-md-2">File 1</div>
          <div className="col-md-2">File 2</div>
        </div>
        {componentDisplay}
      </>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <h2 style={{textAlign: "center",marginBottom:20}}>Binary File Tool</h2>
        <em style={{marginBottom:20, textAlign:"center"}}>To use: load a save or inventory file. Then search that file for values, or load a second file to compare the two side-by-side.</em>
        
        <div className="col-md-6">
          <div className="mb-3">
            <h5>File 1</h5>
            <input
              className="form-control"
              type="file"
              id="fileSelect1"
              onChange={(e) => {
                loadFile1(e.target.files[0]);
              }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            {dataArray1 ?
            <>
            <h5>File2</h5>
            <input
            
              className="form-control"
              type="file"
              id="fileSelect2"
              onChange={(e) => {
                loadFile2(e.target.files[0]);
              }}
            /></>
           : null }
          </div>

        </div>
      </div>
      {dataArray1 && dataArray2 ? (
      <div className="mb-3">
        <button className="btn btn-primary" onClick={() => doCompare()}>
          Compare files
        </button>
      </div>
      ) : null }
      <div className="row">
        <div className="col-md-6">
{dataArray1 ? (
          <div className="input-group">
            <button
              className="input-group-prepend btn btn-primary"
              onClick={() => doSearch()}
            >
              Search for value
            </button>
            <input
              className="form-control"
              type="number"
              id="searchTermInput"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
) : null }
        
        </div>
      </div>
      <div className="row" style={{marginTop:20}}>
        <div className="col-md-6">
          <h3>Comparison Results</h3>
      <CompareDisplay />
      </div>
      <div className="col-md-6">
        <h3>Search Results</h3>
      <SearchDisplay />
      </div>
      </div>
    </div>
  );
}

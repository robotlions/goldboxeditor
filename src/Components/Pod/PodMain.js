import { useState } from "react";

export function PodMain(){

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
    //   if (data.byteLength !== 439) {
    //     return alert(
    //       "This doesn't appear to be a save file from Secret of the Silver Blades"
    //     );
    //   } else {
        let dataArray = new Uint8Array(data);
        console.log(data.byteLength);
        setDataArray(dataArray);
    //   }
    };
    reader.onerror = function (e) {
      console.log("Error : " + e.type);
    };
    reader.readAsArrayBuffer(file);
  }

    return(
        <div className="charEditBody">
      <div className="row">
        <h2 className="mainTitle">
          Advanced Dungeons and Dragons
          <br />
          Secret of the Silver Blades
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
          </div>
          <div className="col-md-6">Inventory</div>
          </div>
          
          </div>
    )
}
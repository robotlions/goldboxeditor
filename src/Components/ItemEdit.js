import { useState } from "react";

export default function ItemEdit(){

    const [selectedFile, setSelectedFile] = useState(null);
    const [dataArray, setDataArray] = useState(null);

    function NameModule() {
        let tempArray = dataArray;
    
        let defaultName = assembleName();
    
        const [editing, setEditing] = useState(false);
        const [inputText, setInputText] = useState(defaultName);
        const editDisplay = (
          <>
            <input
              value={inputText}
              maxLength={15}
              onChange={(e) => setInputText(e.target.value)}
              type="text"
            />
            <button
              onClick={() => {
                setEditing(!editing);
                saveName();
              }}
            >
              Done
            </button>
          </>
        );
    
        const defaultDisplay = (
          <>
            {defaultName} <button onClick={() => setEditing(!editing)}>Edit</button>
          </>
        );
        function assembleName() {
          let assembledName = "";
          for (let i = 1; i <= dataArray[0]; i++) {
            assembledName = assembledName + String.fromCharCode(dataArray[i]);
          }
          return assembledName;
        }
    
        function saveName() {
          tempArray[0] = inputText.length;
          for (let i = 0; i <= inputText.length; i++) {
            tempArray[i + 1] = inputText.toUpperCase().charCodeAt(i);
          }
          setDataArray(tempArray[113]);
        }
    
        return editing === false ? defaultDisplay : editDisplay;
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
    

    return(
        <div><input
        id="fileSelect"
        type="file"
        accept=".stf"
        onChange={(e) => {
          setSelectedFile(e.target.files[0]);
          loadFile(e.target.files[0]);
        }}
      />
      {dataArray ? <NameModule /> : null}
      </div>
    )
}
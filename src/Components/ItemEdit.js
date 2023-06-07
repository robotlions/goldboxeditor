import { useState, useEffect } from "react";

export default function ItemEdit() {
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
      setDataArray(dataArray);
    };
    reader.onerror = function (e) {
      console.log("Error : " + e.type);
    };
    reader.readAsArrayBuffer(file);
  }
  
  
  function ItemListModule() {

    const [itemListArray, setItemListArray] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      if(loading===true){
        assembleList();
        setLoading(false);
      }
    },[setItemListArray, itemListArray]);

    
    // const defaultDisplay =
    // itemListArray.map((item, index)=><ItemEditModule key={index} item={item} index={index} />)
    // ;

const defaultDisplay = itemListArray.map((item, index) => <ItemEditModule key={index} item={Object.values(item)} index={Object.keys(item)} />);
   

    function assembleList() {
      let nameArray = [];
      for (let i = 0; i < Array.from(dataArray).length; i++) {
        if (i === 0 || i % 67 === 0) {
          nameArray.push(assembleName(i));
        }
      }
      setItemListArray(nameArray);
    }

    function assembleName(ind) {
      let assembledName = "";
      for (let i = 1; i <= dataArray[ind]; i++) {
        assembledName =
          assembledName + String.fromCharCode(dataArray[i + ind]);
      }
      return (
        {[ind]:assembledName}
      )
    }



    return defaultDisplay;
  }

  function ItemEditModule(props){

    let tempArray = dataArray;

    const [editing, setEditing] = useState(false);
    const [inputText, setInputText] = useState(String(props.item));

    const editDisplay = (
      <p>
        <input
          value={inputText}
          maxLength={25}
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
      </p>
    );

    function saveName() {
      let j=parseInt(props.index)
      tempArray[j] = inputText.length;
      for (let i = 1; i <= inputText.length; i++) {
        tempArray[i + j] = inputText.charCodeAt(i-1);
      }
      console.log(tempArray);
      console.log(inputText.length)
      // setDataArray(tempArray);
    }

    const defaultDisplay = <p>{props.index} {inputText} <button onClick={()=>setEditing(true)}>Edit</button></p>

    return(
      editing ? editDisplay : defaultDisplay
    )


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
      <input
        id="fileSelect"
        type="file"
        accept=".stf"
        onChange={(e) => {
          setSelectedFile(e.target.files[0]);
          loadFile(e.target.files[0]);
        }}
      />
      {dataArray ? <ItemListModule /> : null}
      <div className="btn btn-primary" onClick={()=>exportSaveFile()}>Download Item File</div>
    </div>
  );
}

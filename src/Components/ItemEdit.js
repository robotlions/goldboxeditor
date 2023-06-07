import { useState, useEffect } from "react";

export default function ItemEdit() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataArray, setDataArray] = useState(null);

  function ItemListModule() {


    const [itemListArray, setItemListArray] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      if(loading===true){
        assembleList();
        setLoading(false);
      }
    },[setItemListArray, itemListArray]);

    
    const defaultDisplay =
      itemListArray.map((item, index)=><p key={index}>{item}</p>)
          ;

    function assembleList() {
      let nameArray = [];
      for (let i = 0; i < Array.from(dataArray).length; i++) {
        if (i === 0 || i % 67 === 0) {
          nameArray.push(assembleName(i));
        }
      }
      setItemListArray(nameArray);
    }

    function assembleName(index) {
      let assembledName = "";
      for (let i = 1; i <= dataArray[index]; i++) {
        assembledName =
          assembledName + String.fromCharCode(dataArray[i + index]);
      }
      return assembledName;
    }



    return defaultDisplay;
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
    </div>
  );
}

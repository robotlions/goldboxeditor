import { useState, Fragment } from 'react';
import { Container, Image, Form, Button } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Nav from "./Components/Nav";
import CharEdit from './Components/CharEdit';
import ItemEdit from './Components/ItemEdit';




function App() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [dataArray, setDataArray] = useState(null);



  function exportSaveFile() {
    const blob = new Blob([dataArray], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = selectedFile.name
    link.href = url;
    link.click();
  }

  function updateLevel() {
    let tempArray = dataArray
    tempArray[275] = 20
    setDataArray(tempArray)
  }

  function loadFile(file) {
    if (document.querySelector("#fileSelect").value === '') {
      alert('No file selected');
      return;
    }
    
    var reader = new FileReader();
    reader.onload = function (e) {
      // binary data
      let data = e.target.result
      let dataArray = new Uint8Array(data)
      console.log(dataArray);
      // console.log(selectedFile)
      setDataArray(dataArray)
    };
    reader.onerror = function (e) {
      // error occurred
      console.log('Error : ' + e.type);
    };
    reader.readAsArrayBuffer(file)
    console.log(file)

  }

  function BuildName() {
    let assembledName = ''
    for (let i = 1; i <= dataArray[0]; i++) {
      assembledName = assembledName + String.fromCharCode(dataArray[i])
    }
    return assembledName
  }

  function ScoreModule(props) {


    const [editing, setEditing] = useState(false);
    const [inputText, setInputText] = useState(dataArray[props.dataArrayIndex])

    const defaultDisplay = <>{inputText} <button onClick={()=>setEditing(!editing)}>Edit</button></>
    const editDisplay = <>{<input type="text" value={inputText} onChange={(e)=>setInputText(e.target.value)}/>} <button onClick={()=>{setEditing(!editing);dataArray[props.dataArrayIndex]=inputText}}>Done</button></>

    return (
    
    editing===false ? defaultDisplay : editDisplay
   
  )}


  return (
    <Container>
      <div className="row">
          <Nav />
        </div>   
      <Fragment>
          <Routes>
            <Route path="/" element={<CharEdit />} />
<Route path="/itemedit/" element={<ItemEdit/>} />
          </Routes>
        </Fragment>
    </Container>
  );
}

export default App;

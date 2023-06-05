import { useState } from 'react';
import { Container, Image, Form, Button } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';





export default function CharEdit() {

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
      // console.log(dataArray);
      // console.log(selectedFile)
      setDataArray(dataArray)
    };
    reader.onerror = function (e) {
      // error occurred
      console.log('Error : ' + e.type);
    };
    reader.readAsArrayBuffer(file)
    // console.log(file)

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

  function ExperienceModule(props){

    let tempArray = dataArray


    const [editing, setEditing] = useState(false);
    const [inputText, setInputText] = useState(parseInt(((0 + dataArray[303].toString(16)).slice(-2) + (0 + dataArray[302].toString(16)).slice(-2) + (0 + dataArray[301].toString(16)).slice(-2) + (0 + dataArray[300].toString(16)).slice(-2)), 16))

    const defaultDisplay = <>{inputText} <button onClick={()=>setEditing(!editing)}>Edit</button></>
    const editDisplay = <>{<input type="text" value={inputText} onChange={(e)=>setInputText(e.target.value)}/>} <button onClick={()=>{setEditing(!editing);convertDecimaltoBinary()}}>Done</button></>
    
    function convertDecimaltoBinary(){
      let eightBit = ('00000000' + parseInt(inputText).toString(16).toUpperCase()).slice(-8);
      let eightBitSplit = eightBit.match(/.{1,2}/g) ?? [];
      for(let i = 0; i<3;i++){
        if(eightBitSplit[i]=='00'){
          eightBitSplit[i]='0'
        }
        else if((eightBitSplit[i]).charAt(0)==='0'){
          eightBitSplit[i] = (eightBitSplit[i]).charAt(1)
        }
      }
     
      tempArray[303] = parseInt(eightBitSplit[0], 16);
      tempArray[302] = parseInt(eightBitSplit[1], 16);
      tempArray[301] = parseInt(eightBitSplit[2], 16);
      tempArray[300] = parseInt(eightBitSplit[3], 16);
      setDataArray(tempArray);
     
    }

    return(
      editing===false ? defaultDisplay : editDisplay
    )
  }


  return (
    <Container>
      
      <input id="fileSelect" type="file" accept=".who, .sav" onChange={(e) => {setSelectedFile(e.target.files[0]);loadFile(e.target.files[0])}} />
      {/* {selectedFile ? <button className="btn btn-primary" onClick={() => loadFile()}>Load Save File</button> : null} */}
      <p></p>
      <p>Character Name: {dataArray ? <BuildName /> : null}</p> <br />
      <p>
      Max Hit Points: {dataArray ? <ScoreModule dataArrayIndex={112} /> : null}</p>
<p>
      {/* The commented out scores are - I think - the in-game modified score after effects */}
        Strength: {dataArray ? <ScoreModule dataArrayIndex={16} /> : null} ({dataArray ? <ScoreModule dataArrayIndex={28} /> : null}) <br />
        {/* <p>Score: {dataArray ? <ScoreModule dataArrayIndex={17} /> : null}</p> */}
        Intelligence: {dataArray ? <ScoreModule dataArrayIndex={18} /> : null}<br />
        {/* <p>Score: {dataArray ? <ScoreModule dataArrayIndex={19} /> : null}</p> */}
        Wisdom: {dataArray ? <ScoreModule dataArrayIndex={20} /> : null}<br />
        {/* <p>Score: {dataArray ? <ScoreModule dataArrayIndex={21} /> : null}</p> */}
        Dexterity: {dataArray ? <ScoreModule dataArrayIndex={22} /> : null}<br />
        {/* <p>Score: {dataArray ? <ScoreModule dataArrayIndex={23} /> : null}</p> */}
        Constitution: {dataArray ? <ScoreModule dataArrayIndex={24} /> : null}<br />
        {/* <p>Score: {dataArray ? <ScoreModule dataArrayIndex={25} /> : null}</p> */}
        Charisma: {dataArray ? <ScoreModule dataArrayIndex={26} /> : null}<br />
        {/* <p>Score: {dataArray ? <ScoreModule dataArrayIndex={27} /> : null}</p> */}
      </p>









      <h4>Levels</h4>
      <p>Cleric: {dataArray ? <ScoreModule dataArrayIndex={273} /> : null}<br/>
      Fighter: {dataArray ? <ScoreModule dataArrayIndex={275} /> : null}<br/>
      Paladin: {dataArray ? <ScoreModule dataArrayIndex={276} /> : null}<br />
      Ranger: {dataArray ? <ScoreModule dataArrayIndex={277} /> : null}<br/>
      Magic-User: {dataArray ? <ScoreModule dataArrayIndex={278} /> : null}<br/>
      Thief: {dataArray ? <ScoreModule dataArrayIndex={279} /> : null}<br/>
      </p>

      {/* <p>Experience: {dataArray ? parseInt(((0 + dataArray[303].toString(16)).slice(-2) + (0 + dataArray[302].toString(16)).slice(-2) + (0 + dataArray[301].toString(16)).slice(-2) + (0 + dataArray[300].toString(16)).slice(-2)), 16) : null}</p> */}
      <p>Experience: {dataArray ? <ExperienceModule /> : null}</p>
      
      <button className="btn btn-primary" onClick={() => exportSaveFile()}>Download</button><br />
      {/* <button className="btn btn-primary" onClick={() => updateLevel()}>Update Level</button> */}
    
     
    </Container>
  );
}



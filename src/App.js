import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';



function App() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [dataArray, setDataArray] = useState(null);

  

  function exportUserInfo() {
    const blob = new Blob([dataArray], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = selectedFile.name
    link.href = url;
    link.click();
  }

  function updateLevel(){
    let tempArray = dataArray
    tempArray[275] = 20
    setDataArray(tempArray)
  }

function loadFile(){
  if(document.querySelector("#fileSelect").value == '') {
		alert('No file selected');
		return;
	}
let file = selectedFile;
  var reader = new FileReader();
	reader.onload = function(e) {
		// binary data
		let data = e.target.result
		let dataArray = new Uint8Array(data)
		console.log(dataArray);
    console.log(selectedFile)
    setDataArray(dataArray)
	};
	reader.onerror = function(e) {
		// error occurred
		console.log('Error : ' + e.type);
	};
	reader.readAsArrayBuffer(file)

}

function BuildName(){
  let assembledName = ''
  for(let i=1;i<=dataArray[0];i++){
    assembledName = assembledName+String.fromCharCode(dataArray[i])
  }
 return assembledName
}

function ScoreModule(props){
return dataArray[props.dataArrayIndex]
}


  return (
    <div className="container">
      <input id="fileSelect" type="file" onChange={(e)=>setSelectedFile(e.target.files[0])}/>
     <button className="btn btn-primary" onClick={()=>loadFile()}>Load Save File</button>
     <p>Character Name: {dataArray ? <BuildName /> : null} </p>
     <p>Strength: {dataArray ? <ScoreModule dataArrayIndex={16} /> : null} ({dataArray ? <ScoreModule dataArrayIndex={28} /> : null})</p>
     {/* <p>Score: {dataArray ? <ScoreModule dataArrayIndex={17} /> : null}</p> */}
     <p>Intelligence: {dataArray ? <ScoreModule dataArrayIndex={18} /> : null}</p>
     {/* <p>Score: {dataArray ? <ScoreModule dataArrayIndex={19} /> : null}</p> */}
     <p>Wisdom: {dataArray ? <ScoreModule dataArrayIndex={20} /> : null}</p>
     {/* <p>Score: {dataArray ? <ScoreModule dataArrayIndex={21} /> : null}</p> */}
     <p>Dexterity: {dataArray ? <ScoreModule dataArrayIndex={22} /> : null}</p>
     {/* <p>Score: {dataArray ? <ScoreModule dataArrayIndex={23} /> : null}</p> */}
     <p>Constitution: {dataArray ? <ScoreModule dataArrayIndex={24} /> : null}</p>
     {/* <p>Score: {dataArray ? <ScoreModule dataArrayIndex={25} /> : null}</p> */}
     <p>Charisma: {dataArray ? <ScoreModule dataArrayIndex={26} /> : null}</p>
     {/* <p>Score: {dataArray ? <ScoreModule dataArrayIndex={27} /> : null}</p> */}
     <p></p>











     <p>Level: {dataArray ? dataArray[275] : null}</p>
     <p>Experience: {dataArray ? parseInt(((0+dataArray[303].toString(16)).slice(-2)+(0+dataArray[302].toString(16)).slice(-2)+(0+dataArray[301].toString(16)).slice(-2)+(0+dataArray[300].toString(16)).slice(-2)), 16) : null }</p>
    <button className="btn btn-primary" onClick={()=>exportUserInfo()}>Test download</button>
    <button className="btn btn-primary" onClick={()=>updateLevel()}>Update Level</button>
   {/* <button onClick={()=>buildName()}>Build Name</button> */}
    </div>
  );
}

export default App;

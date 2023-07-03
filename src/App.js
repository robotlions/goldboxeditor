import { Fragment } from 'react';
import { Container} from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Nav from "./Components/Nav";
import SilverBladesMain from './Components/SilverBlades/SilverBladesMain';
import PoolRadMain from './Components/Poolrad/PoolRadMain';
import { AzureMain } from './Components/Azure/AzureMain';
import { PodMain } from './Components/Pod/PodMain';
import { BinaryTool } from './Components/BinaryTool';



function App() {

  
 
 


  return (
    <Container fluid>
      <div className="row">
          <Nav />
        </div>   
      <Fragment>
          <Routes>
            <Route path="/" element={<PoolRadMain/>} />
<Route path="/poolrad/" element={<PoolRadMain/>} />
<Route path="/azure/" element={<AzureMain/>} />

<Route path="/silverblades/" element={<SilverBladesMain />} />
<Route path="/pod/" element={<PodMain/>} />
<Route path="/binarytool/" element={<BinaryTool/>} />




          </Routes>
        </Fragment>
    </Container>
  );
}

export default App;

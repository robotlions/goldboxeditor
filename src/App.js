import { Fragment } from 'react';
import { Container} from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Nav from "./Components/Nav";
import SilverBladesMain from './Components/SilverBlades/SilverBladesMain';
import PoolRadMain from './Components/Poolrad/PoolRadMain';




function App() {

  
 
 


  return (
    <Container>
      <div className="row">
          <Nav />
        </div>   
      <Fragment>
          <Routes>
            <Route path="/" element={<PoolRadMain/>} />
<Route path="/poolrad/" element={<PoolRadMain/>} />
<Route path="/silverblades/" element={<SilverBladesMain />} />


          </Routes>
        </Fragment>
    </Container>
  );
}

export default App;

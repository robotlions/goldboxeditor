import { Fragment } from 'react';
import { Container} from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Nav from "./Components/Nav";
import CharEdit from './Components/SilverBlades/CharEdit';
import InventoryEdit from './Components/SilverBlades/InventoryEdit';
import { PoolRadMain } from './Components/Poolrad/CharEdit';




function App() {

  
 
 


  return (
    <Container>
      <div className="row">
          <Nav />
        </div>   
      <Fragment>
          <Routes>
            <Route path="/" element={<CharEdit />} />
<Route path="/poolrad/" element={<PoolRadMain/>} />

<Route path="/inventoryedit/" element={<InventoryEdit/>} />

          </Routes>
        </Fragment>
    </Container>
  );
}

export default App;

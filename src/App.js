import { Fragment } from 'react';
import { Container} from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Nav from "./Components/Nav";
import CharEdit from './Components/CharEdit';
import InventoryEdit from './Components/InventoryEdit';




function App() {

  
 
 


  return (
    <Container>
      <div className="row">
          <Nav />
        </div>   
      <Fragment>
          <Routes>
            <Route path="/" element={<CharEdit />} />
<Route path="/inventoryedit/" element={<InventoryEdit/>} />

          </Routes>
        </Fragment>
    </Container>
  );
}

export default App;

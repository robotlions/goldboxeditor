import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Nav from "./Components/Nav";
import SilverBladesMain from "./Components/SilverBlades/SilverBladesMain";
import PoolRadMain from "./Components/Poolrad/PoolRadMain";
import { AzureMain } from "./Components/Azure/AzureMain";
import { PodMain } from "./Components/Pod/PodMain";
import { BinaryTool } from "./Components/BinaryTool";
import { Home } from "./Components/Home";
import { About } from "./Components/About";
import adndSplash from "../src/assets/images/AdnDSplash.jpg";

function App() {

  return (
    <Container>
      <div className="row">
        <Nav />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/poolrad/" element={<PoolRadMain />} />
        <Route path="/azure/" element={<AzureMain />} />
        <Route path="/silverblades/" element={<SilverBladesMain />} />
        <Route path="/pod/" element={<PodMain />} />
        <Route path="/binarytool/" element={<BinaryTool />} />
        <Route path="/about/" element={<About />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Container>
  );
}

export default App;

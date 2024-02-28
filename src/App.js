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

function App() {

  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();

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
      <div style={{textAlign:"center",marginTop:50}}>
      <p>© {currentYear} by <a href="https://chadmusick.com/">Chad Musick</a></p>
      </div>
    </Container>
  );
}

export default App;

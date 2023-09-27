import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./views/Nav/NavBar";
import About from "./views/About/About";
import Home from "./views/Home/Home";
import Detail from "./views/Home/Detail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />} />

        <Route path="/home" element={<Home />} />

        <Route path="/home" element={<Home />} />
        <Route path="/detail/:detailId" component={<Detail />} />
        <Route path="/create" />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;

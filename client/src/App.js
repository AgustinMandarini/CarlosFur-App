import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./views/Nav/NavBar";
import About from "./views/About/About";
import Home from "./views/Home/Home";
import Detail from "./views/Home/Detail";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/home" Component={<Home />} />
        <Route path="/detail/:detailId" Component={<Detail />} />
        <Route path="/create" />
        <Route path="/about" Component={<About />} />
      </Routes>
    </div>
  );
}

export default App;

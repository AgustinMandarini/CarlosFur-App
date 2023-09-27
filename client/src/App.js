import "./App.css";
import { Route, Routes } from "react-router-dom";
import About from "./views/About/About";
import Detail from "./views/Home/Detail";
import Home from "./views/Home/Home";
import LandingPage from "./views/LandingPage/LandingPage";
import NavBar from "./views/Nav/NavBar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" Component={<Home />} />
        <Route path="/detail/:detailId" Component={<Detail />} />
        <Route path="/create" />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;

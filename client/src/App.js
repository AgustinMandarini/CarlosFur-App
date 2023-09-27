import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./views/Nav/NavBar";
import About from "./views/About/About";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/home" />
        <Route path="/detail/:detailId" />
        <Route path="/create" />
        <Route path="/about" Component={<About />} />
      </Routes>
    </div>
  );
}

export default App;

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
        <Route path="/" component={<NavBar />} />

        <Route path="/home" component={<Home />} />

        <Route path="/home" component={<Home />} />
        <Route path="/detail/:detailId" component={<Detail />} />
        <Route path="/create" />
        <Route path="/about" component={<About />} />
      </Routes>
    </div>
  );
}

export default App;

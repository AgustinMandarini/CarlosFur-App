import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <div className="App">
        <Route exact path="/" />
        <Route path="/home" />
        <Route path="/detail/:detailId" />
        <Route path="/create" />
      </div>
    </Routes>
  );
}

export default App;

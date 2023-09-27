import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage"





















function App() {
  return (
      <div className="App">
    <Routes>
        <Route exact path="/" element={<LandingPage />}/>
        <Route path="/home" />
        <Route path="/detail/:detailId" />
        <Route path="/create" />
    </Routes>
      </div>
  );
}

export default App;

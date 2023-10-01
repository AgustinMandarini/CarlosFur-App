import { Route, useLocation } from "react-router-dom";
import "./App.css";
import About from "./views/About/About";
import Detail from "./views/Detail/Detail";
import Form from "./views/Form/Form";
import Home from "./views/Home/Home";
import LandingPage from "./views/LandingPage/LandingPage";
import NavBar from "./views/Nav/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}

      <Route exact path="/" component={LandingPage} />
      <Route path="/home" render={() => <Home />} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/create" component={Form} />
      <Route path="/about" component={About} />
    </div>
  );
}


export default App;

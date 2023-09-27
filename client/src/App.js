import "./App.css";
import { Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import About from "./views/About/About";
import Detail from "./views/Detail/Detail";
import Home from "./views/Home/Home";
import LandingPage from "./views/LandingPage/LandingPage";
import NavBar from "./views/Nav/NavBar";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}

      <Route exact path="/" component={LandingPage} />
      <Route path="/home" render={() => <Home />} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/create" /* component={Form} */ />
      <Route path="/about" component={About} />
    </div>
  );
}

/* <div>
      {location.pathname !== "/" && <NavBar />}

      <Route exact path="/" component={Landing} />
      <Route exact path="/create" component={Form} />
      <Route path="/detail/:id" component={Detail} />
    </div> */

export default App;

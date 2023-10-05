import { Route, useLocation } from "react-router-dom";
import "./App.css";
import {
  About,
  Detail,
  Form,
  Home,
  LandingPage,
  NavBar,
  ShoppingCart,
  LoginForm,
  RegisterForm,
} from "./views";

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
      <Route path="/shoppingcart" component={ShoppingCart} />
      <Route path="/register" component={RegisterForm} />
      <Route path="/logIn" component={LoginForm} />
    </div>
  );
}

export default App;

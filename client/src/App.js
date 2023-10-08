import { Route, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "./components/PageLoader/pageLoader";
import LoginRegisterBar from "./components/LoginRegisterBar/LoginRegisterBar";
import GuardedRoute from "./helpers/GuardComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadCartFromLocalStorage } from "./redux/actions";
import {
  About,
  Detail,
  Form,
  Home,
  LandingPage,
  NavBar,
  ShoppingCart,
  RegisterForm,
  LoginForm,
} from "./views";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useAuth0();
  const cartProducts = useSelector((state) => state.cartProducts);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    dispatch(loadCartFromLocalStorage(savedCart));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="App">
      {location.pathname !== "/" && <LoginRegisterBar />}
      {location.pathname !== "/" && <NavBar />}

      <Route exact path="/" component={LandingPage} />
      <Route path="/home" render={() => <Home />} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/create" component={Form} />
      <Route path="/about" component={About} />
      <GuardedRoute
        path="/shoppingcart"
        component={ShoppingCart}
        auth={isAuthenticated}
      />
      <Route path="/register" component={RegisterForm} />
      <Route path="/logIn" component={LoginForm} />
    </div>
  );
}

export default App;

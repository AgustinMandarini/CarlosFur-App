import { Route, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "./components/PageLoader/pageLoader";
import LoginRegisterBar from "./components/LoginRegisterBar/LoginRegisterBar";
import GuardedRoute from "./helpers/GuardComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadCartFromLocalStorage } from "./redux/actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import {
  About,
  Detail,
  Home,
  LandingPage,
  NavBar,
  ShoppingCart,
  RegisterForm,
  LoginForm,
} from "./views";
import Admin from "./Admin/Admin"

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useAuth0();
  const cartProducts = useSelector((state) => state.cartProducts);

  const userIsAuthenticated =
    isAuthenticated || localStorage.getItem("token") != null;

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


  const isAdminRoute = pathname.startsWith("/admin");
  // console.log(isAdminRoute);
  return (
    <div className="App">
      {location.pathname !== "/" && !isAdminRoute  && <LoginRegisterBar />}
      {location.pathname !== "/"  && !isAdminRoute && <NavBar />}

      <ToastContainer />
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" render={() => <Home />} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/about" component={About} />
      <GuardedRoute
        path="/shoppingcart"
        component={ShoppingCart}
        auth={userIsAuthenticated}
      />
      <Route path="/register" component={RegisterForm} />
      <Route path="/logIn" component={LoginForm} />

      {/* //Dashboard Admin */}
      <Route path="/admin" component={Admin} />
    </div>
  );
}

export default App;

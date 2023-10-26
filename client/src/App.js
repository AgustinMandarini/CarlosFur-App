import { Route, useLocation, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "./components/PageLoader/pageLoader";
import LoginRegisterBar from "./components/LoginRegisterBar/LoginRegisterBar";
import GuardedRoute from "./helpers/GuardComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadCartFromLocalStorage } from "./redux/actions";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin/Admin";

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
  Profile,
  ForgottenPassword,
  ResetPassword,
} from "./views";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useAuth0();
  const cartProducts = useSelector((state) => state.cartProducts) || [];
  const loggedUser = useSelector((state) => state.loggedUser);
  const userIsAuthenticated = localStorage.getItem("token") !== null;

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      const cartFromLocalStorage = JSON.parse(savedCart);
      dispatch(loadCartFromLocalStorage(cartFromLocalStorage));
    }
  }, [dispatch, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  const isAdmin = loggedUser ? loggedUser.is_admin : false;

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className="App">
      {location.pathname !== "/" && !isAdminRoute && <LoginRegisterBar />}
      {location.pathname !== "/" && !isAdminRoute && <NavBar />}
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
      <Route path="/forgottenPassword" component={ForgottenPassword}></Route>
      <Route path="/resetPassword/:e_mail" component={ResetPassword}></Route>

      <Route
        path="/user/admin/:userId"
        render={({ match }) =>
          isAdmin ? (
            <Admin />
          ) : (
            <Redirect to={`/user/profile/${match.params.userId}`} />
          )
        }
      />
      
      <Route path="/user/profile/:id" component={Profile} />
    </div>
  );
}

export default App;


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
import Footer from "./views/Footer/Footer";

function App() {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useAuth0();
  const cartProducts = useSelector((state) => state.cartProducts) || [];
  const loggedUser = useSelector((state) => state.loggedUser);
  const [isAdmin, setIsAdmin] = useState(false); // Para el estado de isAdmin
  const userIsAuthenticated = localStorage.getItem("token") !== null;

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      const cartFromLocalStorage = JSON.parse(savedCart);
      dispatch(loadCartFromLocalStorage(cartFromLocalStorage));
    }

    const fetchUserAdminStatus = async () => {
      if (loggedUser) {
        try {
          const response = await axios.get(
            `http://localhost:3001/user/admin/${loggedUser.id}`
          );
          if (response.data.is_admin) {
            console.log(response);
            setIsAdmin(true);
            console.log(isAdmin);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error al obtener el estado de administrador:", error);
          setIsAdmin(false); // En caso de error, asumimos que no es admin
        }
      }
    };

    fetchUserAdminStatus();
  }, [dispatch, isAuthenticated, loggedUser]);

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

      <Route path="/user/admin/:userId" component={isAdmin ? Admin : Home} />
      <Route path="/user/profile/:id" component={Profile} />
      <Footer />
    </div>
  );
}

export default App;

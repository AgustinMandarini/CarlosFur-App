import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import style from "./LoginRegisterBar.module.css";

function LoginBar() {
  const { logout, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Navbar className={style.nav} expand="lg">
      <div className={style.container}>
        <Nav className="mr-auto"></Nav>
        <Nav style={{ marginLeft: "auto" }}>
          {!isAuthenticated && (
            <>
              <Link to="/register">
                <Button variant="dark" className={style.buttonLogin}>
                  Registrate
                </Button>
              </Link>
              <Link to="/logIn">
                <Button variant="dark" className={style.button}>
                  Log In
                </Button>
              </Link>
            </>
          )}
          {isAuthenticated && (
            <Button onClick={handleLogout} variant="dark">
              Log Out
            </Button>
          )}
        </Nav>
      </div>
    </Navbar>
  );
}

export default LoginBar;

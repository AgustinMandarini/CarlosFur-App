import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

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
    <Navbar bg="light" expand="lg">
      <div className="container">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* Coloca aquí los elementos de navegación si los tienes */}
          </Nav>
          <Nav style={{ marginLeft: "auto" }}>
            {!isAuthenticated && (
              <>
                <Link to="/register">
                  <Button variant="outline-dark" className="mr-2">
                    Registrate
                  </Button>
                </Link>
                <Link to="/logIn">
                  <Button variant="dark">Log In</Button>
                </Link>
              </>
            )}
            {isAuthenticated && (
              <Button onClick={handleLogout} variant="dark">
                Log Out
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default LoginBar;

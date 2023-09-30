import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import style from "./NavBar.module.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import ToolBar from "../../components/ToolBar/ToolBar";

const NavBar = () => {
  const [navResponsive, setNavResponsive] = useState(false);

  return (
    <Navbar className={style.navBar} collapseOnSelect expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/home" className={style.links}>
            LOGO
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setNavResponsive(true)}
          className={style.buttonResponsive}
        />
        {/* Botón hamburguesa */}
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={navResponsive ? style.active : ""}
        >
          <Nav className="ms-auto">
            <div
              className={
                navResponsive ? style.divLinksResponsive : style.divLinks
              }
            >
              <Link
                to="/home"
                className={navResponsive ? style.linkResponsive : style.links}
              >
                Home
              </Link>
              <Link
                to="/create"
                className={navResponsive ? style.linkResponsive : style.links}
              >
                Form
              </Link>
              <Link
                to="/about"
                className={navResponsive ? style.linkResponsive : style.links}
              >
                About
              </Link>
            </div>
          </Nav>
          <div
            className={
              navResponsive ? style.searchBarResponsive : style.searchBar
            }
          >
            <SearchBar />
          </div>
        </Navbar.Collapse>
        <div>
          <ToolBar />
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;

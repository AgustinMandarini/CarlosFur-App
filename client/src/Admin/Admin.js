import { Route, Link } from "react-router-dom";
import Productos from "./views/Productos/Productos";
import Ventas from "./views/Ventas/Ventas";
import DetalleCart from "./views/Ventas/DetalleCart";
import Usuarios from "./views/Usuarios/Usuarios";
import NavBar from "./components/NavBar/NavBar";
import EditarProducto from "./views/EditarProducto/EditarProducto";
import CrearProducto from "./views/CrearProducto/CrearProducto";
import CrearColor from "./views/CrearColor/CrearColor";
import CrearMaterial from "./views/CrearMaterial/CrearMaterial";
import CrearTipoProducto from "./views/CrearTipoProducto/CrearTipoProducto";
import "./Admin.css";
import { useEffect } from "react";
import { getProductsAdmin } from "./../redux/actions";
import { useDispatch } from "react-redux";

function Admin() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsAdmin());
  }, [dispatch]);

  return (
    <div className="Admin">
      <nav className="AdminNav">
        <NavBar />
      </nav>
          
      <div className="AdminContent">
        <Route exact path="/user/admin/:userId/productos" component={Productos} />
        <Route path="/user/admin/:userId/productos/editar/:id" component={EditarProducto} />
        <Route path="/user/admin/:userId/ventas" component={Ventas} />
        <Route path="/user/admin/:userId/usuarios" component={Usuarios} />
        <Route path="/user/admin/:userId/crear/producto" component={CrearProducto} />
        <Route path="/user/admin/:userId/crear/color" component={CrearColor} />
        <Route path="/user/admin/:userId/crear/material" component={CrearMaterial} />
        <Route
          path="/user/admin/:userId/crear/tipo-de-producto"
          component={CrearTipoProducto}
        />
        <Route path="/user/admin/:userId/detalle/:cartId" component={DetalleCart} />
      </div>
    </div>
  );
}

export default Admin;

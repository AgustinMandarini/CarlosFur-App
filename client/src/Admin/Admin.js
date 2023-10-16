import { Route } from "react-router-dom";
import Productos from "./views/Productos/Productos";
import Ventas from "./views/Ventas/Ventas";
import Usuarios from "./views/Usuarios/Usuarios";
import NavBar from "./components/NavBar/NavBar";
import EditarProducto from "./views/EditarProducto/EditarProducto"
import CrearProducto from "./views/CrearProducto/CrearProducto";
import CrearColor from "./views/CrearColor/CrearColor"
import "./Admin.css";

function Admin() {
  return (
    <div className="Admin">
      <nav className="AdminNav">
        <NavBar />
      </nav>
      <div className="AdminContent">
        <Route exact path="/admin/productos" component={Productos} />
        <Route   path="/admin/productos/editar/:id" component={EditarProducto} />
        <Route path="/admin/ventas" component={Ventas} />
        <Route  path="/admin/usuarios" component={Usuarios} />
        <Route  path="/admin/crear/producto" component={CrearProducto} />
        <Route  path="/admin/crear/color" component={CrearColor} />
      </div>
    </div>
  );
}

export default Admin;

import { Route } from "react-router-dom";
import Productos from "./views/Productos/Productos";
import Ventas from "./views/Ventas/Ventas";
import Usuarios from "./views/Usuarios/Usuarios";
import NavBar from "./components/NavBar/NavBar";
import "./Admin.css";

function Admin() {
  return (
    <div className="Admin">
      <nav className="AdminNav">
        <NavBar />
      </nav>
      <div className="AdminContent">
        <Route path="/admin/productos" component={Productos} />
        <Route path="/admin/ventas" component={Ventas} />
        <Route path="/admin/usuarios" component={Usuarios} />
      </div>
    </div>
  );
}

export default Admin;

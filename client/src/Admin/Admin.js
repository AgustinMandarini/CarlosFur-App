import { Route} from "react-router-dom";
import Home from "./views/Home/Home";
import Crear from "./views/Crear/Crear"
import Users from "./views/Users/Users"
import  NavBar from "./components/NavBar/NavBar";
import "./Admin.css";

function Admin() {
 
  return (
    <div className="Admin">
     <Route path="/admin" component={NavBar} />
      <Route path="/admin/home" component={Home} />
      <Route path="/admin/crear" component={Crear} />
      <Route path="/admin/users" component={Users} />

      
    </div>
  );
}


export default Admin;

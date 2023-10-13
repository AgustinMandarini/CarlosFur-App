import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../../redux/actions";
import Table from "react-bootstrap/Table";
import axios from "axios";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

const apiUrl = process.env.REACT_APP_API_URL;
{
  /* <BootstrapSwitchButton
  checked={false}
  onlabel="Admin User"
  offlabel="Regular User"
  onChange={(checked) => {
    this.setState({ isUserAdmin: checked });
  }}
/>; */
}

const Users = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const setEnabled = async (id) => {
    try {
      await axios.put(`${apiUrl}/user/${id}`);
      console.log("HOLA");
    } catch (error) {
      console.log(`ERROR desde /admin/usuario: ${error}`);
    }
  };
  return (
    <div>
      <h1>Usuarios registrados</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre de Usuario</th>
            <th>Email</th>
            <th>Habilitado</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.user_name}</td>
              <td>{user.e_mail}</td>
              <td>
                <BootstrapSwitchButton
                  checked={user.enabled_user}
                  onstyle="success"
                  onChange={() => setEnabled(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../../redux/actions";
import Table from "react-bootstrap/Table";
import axios from "axios";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import style from "./Usuarios.module.css";

const apiUrl = process.env.REACT_APP_API_URL;

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
    <div className={style.cntnUsers}>
      <div className={style.cntnTittle}>
        <h1>Usuarios registrados</h1>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className={style.cntnTh}>Nombre de Usuario</th>
            <th className={style.cntnTh}>Email</th>
            <th className={style.cntnTh}>Habilitado</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(allUsers) &&
            allUsers.map((user) => (
              <tr key={user.id}>
                <td className={style.cntnTr}>{user.user_name}</td>
                <td className={style.cntnTr}>{user.e_mail}</td>
                <td className={style.cntnTr}>
                  <BootstrapSwitchButton
                    checked={user.enabled_user}
                    onstyle="success"
                    onChange={() => setEnabled(user.id)}
                    height={20}
                    width={50}
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

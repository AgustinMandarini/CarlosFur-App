import { useAuth0 } from "@auth0/auth0-react";
import { postUser, getUser } from "../redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const useCheckUserExists = () => {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();

  const checkUser = async () => {
    if (isAuthenticated && user) {
      try {
        const response = await axios.get(`${apiUrl}/user?email=${user.email}`);
        const data = response.data;

        if (data.length && data[0].e_mail === user.email) {
          // Si el usuario ya está creado, lo tiene que logear
          console.log("Usuario existente!!");
          dispatch(getUser(user.email));
        } else {
          // Si no está creado, crea uno nuevo
          console.log("Usuario nuevo. Creando usuario...");
          const newUser = { user_name: user.name, e_mail: user.email };
          dispatch(postUser(newUser));
        }
      } catch (error) {
        console.log(`${error}`);
      }
    }
  };

  return checkUser;
};

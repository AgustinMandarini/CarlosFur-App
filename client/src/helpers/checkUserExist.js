import { useAuth0 } from "@auth0/auth0-react";
import { postUser, login } from "../redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const useCheckUserExists = () => {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();

  const checkUser = async () => {
    if (isAuthenticated && user) {
      try {
        const userInfo = {
          auth0Email: user.email,
          auth0UserName: user.nickname,
        };
        const response = await axios.get(`${apiUrl}/user?e_mail=${user.email}`);
        const data = response.data;
        const userInfoWithToken = {
          ...userInfo,
          accessToken: response.data.accessToken,
        };
        if (data && data.user.e_mail === user.email) {
          // Si el usuario ya está creado, lo tiene que logear
          dispatch(login(userInfoWithToken));
        }
      } catch (error) {
        // Si no está creado, crea uno nuevo
        console.log("Usuario nuevo. Creando usuario...");
        const newUser = {
          user_name: user.name,
          e_mail: user.email,
          auth0: true,
        };
        dispatch(postUser(newUser));
      }
    }
  };

  return checkUser;
};

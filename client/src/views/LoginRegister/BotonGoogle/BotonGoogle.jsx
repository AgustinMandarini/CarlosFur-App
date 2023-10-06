import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import iconGoogle from "../../../imagenes/googleIcon.png";

export const ButtonGoogle = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      authorizationParams: {
        connection: "google-oauth2",
      },
      appState: {
        returnTo: "/home",
      },
    });
  };

  return (
    <button onClick={handleLogin} className="btn btn-google">
      <img src={iconGoogle} alt="icon-g" className="btn-icon"></img>
      Acceder con Google
    </button>
  );
};

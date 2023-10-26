import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Profile.module.css";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const { user: auth0User, isAuthenticated } = useAuth0();
  const apiUrl = process.env.REACT_APP_API_URL;
  const clientUrl = process.env.REACT_APP_CLIENT_URL;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/profile/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener el perfil:", error.message);
      }
    };

    fetchUserProfile(); // Llamar a la función fetchUserProfile aquí
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const userImage = isAuthenticated ? auth0User.picture : null;
  const defaultAvatar =
    "https://cdn.icon-icons.com/icons2/1508/PNG/512/systemusers_104569.png";

  let userName = "";

  if (isAuthenticated && auth0User) {
    userName = auth0User.name;
  } else if (user) {
    userName = user.first_name + (user.last_name ? ` ${user.last_name}` : "");
  }

  const isAdmin = user.is_admin; // Verifica si el usuario es administrador
  console.log(user.is_admin);

  return (
    <Container className={`${styles.profileContainer} ${styles.Background}`}>
      <Row>
        <Col md="8">
          <Card className={styles.profileCard}>
            <img
              src={userImage || defaultAvatar}
              alt="User Avatar"
              className={styles.profileImage}
            />
            <CardTitle tag="h5" className={styles.profileName}>
              {userName}
            </CardTitle>
          </Card>
        </Col>
        <Col md="4">
          <Card className={styles.userInfoCard}>
            <CardTitle tag="h5" className={styles.userInfoTitle}>
              Información de Usuario
            </CardTitle>
            <Row>
              <Col md="12">
                <CardSubtitle tag="h6" className={styles.subtitle}>
                  <strong className={styles.strong}>Nombre: </strong> {userName}
                </CardSubtitle>
              </Col>
              <Col md="12">
                <CardSubtitle tag="h6" className={styles.subtitle}>
                  <strong className={styles.strong}>Email: </strong>{" "}
                  {user.e_mail || "N/A"}
                </CardSubtitle>
              </Col>
              {isAdmin ? (
                <Col md="12">
                  <button
                    className={styles.botonAdmin}
                    onClick={() => {
                      if (isAdmin) {
                        window.location.href = `${clientUrl}/user/admin/${id}`;
                        // window.location.href = `http://localhost:3000/user/admin/${id}`;
                      } else {
                        // Mostrar un mensaje de acceso denegado en lugar de redirigir
                        alert("");
                      }
                    }}
                  >
                    Panel de Administración
                  </button>
                </Col>
              ) : (
                <Col md="12">
                  <div className={styles.accesoDenegado}>
                    
                  </div>
                </Col>
              )}
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

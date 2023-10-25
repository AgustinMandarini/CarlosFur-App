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
import { useAuth0 } from "@auth0/auth0-react"; // Importa useAuth0

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // Nuevo estado para el mensaje de error
  const { id } = useParams();
  const { user: auth0User, isAuthenticated } = useAuth0(); // Obtén la información del usuario de Auth0

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/profile/${id}`);
      setUser(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("No estás autorizado");
      } else {
        setError("Error al obtener el perfil del usuario.");
        console.error("Error al obtener el perfil:", error.message);
      }
    }
  };
  useEffect(() => {
    fetchUserProfile();
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
              {user.is_admin && (
                <Col md="12">
                  <button
                    className={styles.botonAdmin}
                    onClick={() =>
                      (window.location.href = "http://localhost:3000/admin")
                    }
                  >
                    Ir al Panel de Administración
                  </button>
                </Col>
              )}
            </Row>
          </Card>
        </Col>
      </Row>
      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      )}
    </Container>
  );
};

export default Profile;

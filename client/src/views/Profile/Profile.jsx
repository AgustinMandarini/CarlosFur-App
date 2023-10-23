// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// // import imageProfile from "../../imagenes/User01.jpg"
// import styles from "./Profile.module.css";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   CardTitle,
//   CardSubtitle,
// } from "reactstrap";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3001/user/profile/${id}`
//         );
//         setUser(response.data);
//         const admin = response.data.is_admin;
//         console.log(admin);
//       } catch (error) {
//         console.error("Error al obtener el perfil:", error.message);
//       }
//     };

//     fetchUserProfile();
//   }, [id]); // Esta dependencia hace que el efecto se ejecute cuando id cambia

//   if (!user) {
//     return <div>Loading...</div>;
//   } // // Datos hardcodeados solo para propósitos de visualización
//   const defaultAvatar =
//     "https://cdn.icon-icons.com/icons2/1508/PNG/512/systemusers_104569.png";
//   return (
//     <Container className={`${styles.profileContainer} ${styles.Background}`}>
//       <Row>

//         {/* Columna izquierda con la imagen y el nombre */}
//         <Col md="8">
//           <Card className={styles.profileCard}>
//             <img
//               src={defaultAvatar}
//               alt="User Avatar"
//               className={styles.profileImage}
//             />
//             <CardTitle tag="h5" className={styles.profileName}>
//               {user.first_name
//                 ? `${user.first_name} ${user.last_name}`
//                 : user.user_name}
//             </CardTitle>
//           </Card>
//         </Col>

//         {/* Columna derecha con la información del usuario */}
//         <Col md="4">
//           <Card className={styles.userInfoCard}>
//             <CardTitle tag="h5" className={styles.userInfoTitle}>
//               Información de Usuario
//             </CardTitle>
//             <Row>
//               <Col md="12">
//                 <CardSubtitle tag="h6" className="mb-2 text-muted">
//                   <strong>Nombre:</strong> {user.first_name}
//                 </CardSubtitle>
//               </Col>
//               <Col md="12">
//                 <CardSubtitle tag="h6" className="mb-2 text-muted">
//                   <strong>Apellido:</strong> {user.last_name || "N/A"}
//                 </CardSubtitle>
//               </Col>
//               <Col md="12">
//                 <CardSubtitle tag="h6" className="mb-2 text-muted">
//                   <strong>Email:</strong> {user.e_mail || "N/A"}
//                 </CardSubtitle>
//               </Col>
//               <Col md="12">
//                 <CardSubtitle tag="h6" className="mb-2 text-muted">
//                   <strong>Teléfono:</strong> {user.phone || "N/A"}
//                 </CardSubtitle>
//               </Col>

//               {user.is_admin && (
//                 <Col md="12">
//                   <button
//                     className={styles.botonAdmin}
//                     onClick={() =>
//                       (window.location.href = "http://localhost:3000/admin")
//                     }
//                   >
//                     Ir al Panel de Administración
//                   </button>
//                 </Col>
//               )}
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Profile;

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
  const { id } = useParams();
  const { user: auth0User, isAuthenticated } = useAuth0(); // Obtén la información del usuario de Auth0
  const userIsAuthenticated = localStorage.getItem("token") !== null;

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/profile/${id}`);
        setUser(response.data);
        const admin = response.data.is_admin;
        console.log(admin);
      } catch (error) {
        console.error("Error al obtener el perfil:", error.message);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Obtiene la imagen de perfil de Auth0
  const userImage = userIsAuthenticated ? auth0User.picture : null;
  const defaultAvatar =
    "https://cdn.icon-icons.com/icons2/1508/PNG/512/systemusers_104569.png";

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
              {user.first_name
                ? `${user.first_name} ${user.last_name}`
                : user.user_name}
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
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  <strong>Nombre:</strong> {user.first_name}
                </CardSubtitle>
              </Col>
              <Col md="12">
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  <strong>Apellido:</strong> {user.last_name || "N/A"}
                </CardSubtitle>
              </Col>
              <Col md="12">
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  <strong>Email:</strong> {user.e_mail || "N/A"}
                </CardSubtitle>
              </Col>
              <Col md="12">
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  <strong>Teléfono:</strong> {user.phone || "N/A"}
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
    </Container>
  );
};

export default Profile;

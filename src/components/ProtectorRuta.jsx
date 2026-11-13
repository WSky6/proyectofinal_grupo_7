import { Navigate } from "react-router-dom";
import { useUsuarios } from "../hooks/useUsuarios.js";

const ProtectorRuta = ({ children, soloProfesor }) => {
  const { usuarioActivo } = useUsuarios();

  // No hay sesión → login
  if (!usuarioActivo) {
    return <Navigate to="/" replace />;
  }

  // Hay sesión pero no tiene el rol necesario
  if (soloProfesor && usuarioActivo.rol !== soloProfesor) {
    return <Navigate to="/juego-1" replace />;
  }

  return children;
};

export default ProtectorRuta;
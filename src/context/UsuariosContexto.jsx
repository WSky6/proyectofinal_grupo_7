import { createContext, useState } from "react";
import { guardarUsuarioEnSesion, limpiarSesion, obtenerUsuarioEnSesion } from "../services/servicesUsuarios";

const ROLES_PROFESOR = "profesor";

export const UsuariosContext = createContext(null);

export const ProveedorUsuariosContext = ({ children }) => {

    const [usuarioActivo, setUsuarioActivo] = useState(obtenerUsuarioEnSesion);

    const guardarSesion = (usuario) => {
        setUsuarioActivo(usuario);
        guardarUsuarioEnSesion(usuario);
    };

    const cerrarSesion = () => {
        setUsuarioActivo(null);
        limpiarSesion();
    };

    const esProfesor = usuarioActivo?.rol === ROLES_PROFESOR;

    return (
        <UsuariosContext.Provider value={{ usuarioActivo, esProfesor, guardarSesion, cerrarSesion }}>
            {children}
        </UsuariosContext.Provider>
    );
};

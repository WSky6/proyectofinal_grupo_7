import { useContext } from "react";
import { UsuariosContext } from "../context/UsuariosContexto.jsx";

export const useUsuarios = () => {
    const contexto = useContext(UsuariosContext);
    if (!contexto) {
        throw new Error("useUsuarios debe ser usado dentro de ProveedorUsuariosContext");
    }

    return (
        contexto
    )
};

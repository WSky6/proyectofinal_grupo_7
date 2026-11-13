import { useContext } from "react";
import { JuegoContext } from "../contexts/JuegoContext.jsx";
 
export const useJuego = () => {
    const contexto = useContext(JuegoContext);
    if (!contexto) {
        throw new Error("useJuego debe ser usado dentro de ProveedorJuegoContext");
    }
 
    return (
        contexto
    )
};
 
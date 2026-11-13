import { useContext } from "react";
import { JuegoContext } from "../context/JuegoContexto.jsx";
 
export const useJuego = () => {
    const contexto = useContext(JuegoContext);
    if (!contexto) {
        throw new Error("useJuego debe ser usado dentro de ProveedorJuegoContext");
    }
 
    return (
        contexto
    )
};
 
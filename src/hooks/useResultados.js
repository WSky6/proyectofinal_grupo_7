import { useContext } from "react";
import { ResultadosContext } from "../context/ResultadosContexto.jsx";
 
export const useResultados = () => {
    const contexto = useContext(ResultadosContext);
    if (!contexto) {
        throw new Error("useResultados debe ser usado dentro de ProveedorResultadosContext");
    }
 
    return (
        contexto
    )
};
 
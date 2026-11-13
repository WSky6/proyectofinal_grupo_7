import { createContext, useEffect, useState } from "react";
import { listarResultados, guardarResultados } from "../services/servicesResultados";

export const ResultadosContext = createContext(null);

export const ProveedorResultadosContext = ({ children }) => {

    const [resultados, setResultados] = useState(listarResultados);

    useEffect(() => {
        guardarResultados(resultados);
    }, [resultados]);

    const registrarResultado = ({ usuario, puntajeJuego1, puntajeJuego2 }) => {
        const nuevoResultado = {
            id: usuario.id,
            nombre: usuario.nombre,
            puntajeJuego1,
            puntajeJuego2,
            puntajeTotal: puntajeJuego1 + puntajeJuego2,
        };
        setResultados((prev) => [...prev, nuevoResultado]);
    };

    return (
        <ResultadosContext.Provider value={{ resultados, registrarResultado }}>
            {children}
        </ResultadosContext.Provider>
    );
};

import { createContext, useEffect, useState } from "react";
import { PARTIDA_INICIAL, guardarPartidaEnSesion, obtenerPartidaEnSesion } from "../services/servicesPartida";

export const JuegoContext = createContext(null);

export const ProveedorJuegoContext = ({ children }) => {

    const [partida, setPartida] = useState(obtenerPartidaEnSesion);
    useEffect(() => {
        guardarPartidaEnSesion(partida);
    }, [partida]);

    const guardarPuntajeJuego1 = (puntos) => {
        setPartida((prev) => ({ ...prev, puntajeJuego1: puntos }));
    };

    const guardarPuntajeJuego2 = (puntos) => {
        setPartida((prev) => ({ ...prev, puntajeJuego2: puntos }));
    };

    const reiniciarJuego = () => {
        setPartida(PARTIDA_INICIAL);
    };

    const puntajeTotal = partida.puntajeJuego1 + partida.puntajeJuego2;

    return (
        <JuegoContext.Provider value={{
            puntajeJuego1: partida.puntajeJuego1,
            puntajeJuego2: partida.puntajeJuego2,
            puntajeTotal,
            guardarPuntajeJuego1,
            guardarPuntajeJuego2,
            reiniciarJuego
        }}>
            {children}
        </JuegoContext.Provider>
    );
};

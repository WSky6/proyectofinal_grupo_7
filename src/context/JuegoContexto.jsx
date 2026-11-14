import { createContext, useEffect, useState } from "react";
import { PARTIDA_INICIAL, guardarPartidaEnSesion, obtenerPartidaEnSesion } from "../services/servicesPartidas.js";

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

    const guardarProgresoJuego1 = (progreso) => {
        setPartida((prev) => ({...prev, progresoJuego1: progreso}));
    }

    const guardarProgresoJuego2 = (progreso) => {
        setPartida((prev) => ({...prev, progresoJuego2: progreso}));
    }

    const reiniciarJuego = () => {
        setPartida(PARTIDA_INICIAL);
    };

    const puntajeTotal = partida.puntajeJuego1 + partida.puntajeJuego2;

    return (
        <JuegoContext.Provider value={{
            puntajeJuego1: partida.puntajeJuego1,
            puntajeJuego2: partida.puntajeJuego2,
            puntajeTotal,
            progresoJuego1: partida.progresoJuego1,
            progresoJuego2: partida.progresoJuego2,
            guardarPuntajeJuego1,
            guardarPuntajeJuego2,
            guardarProgresoJuego1,
            guardarProgresoJuego2,
            reiniciarJuego
        }}>
            {children}
        </JuegoContext.Provider>
    );
};

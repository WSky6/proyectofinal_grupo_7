const CLAVE_PARTIDA = "partidaEnCurso";
 
export const PARTIDA_ACTUAL = {
    rondaActual: 0,
    puntaje: 0,
    respuestaSeleccionada: null,
    feedback: null
}

export const PARTIDA_INICIAL = {
    puntajeJuego1: 0,
    puntajeJuego2: 0,
    progresoJuego1: PARTIDA_ACTUAL,
    progresoJuego2: PARTIDA_ACTUAL
};
 
export const obtenerPartidaEnSesion = () => {
    try {
        const guardada = sessionStorage.getItem(CLAVE_PARTIDA);
        return guardada
            ? { ...PARTIDA_INICIAL, ...JSON.parse(guardada) }
            : PARTIDA_INICIAL;
    } catch {
        return PARTIDA_INICIAL;
    }
};
 
export const guardarPartidaEnSesion = (partida) => {
    try {
        sessionStorage.setItem(CLAVE_PARTIDA, JSON.stringify(partida));
    } catch (e) {
        console.log("Error al guardar la partida en sessionStorage:", e);
    }
};

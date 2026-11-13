import axios from "axios";
 
const RUTAS_JUEGOS = {
    1: "/data/juego1.json",
    2: "/data/juego2.json"
};
 
export const listarRondas = async (numeroJuego) => {
    const ruta = RUTAS_JUEGOS[numeroJuego];
 
    if (!ruta) {
        throw new Error(`El juego ${numeroJuego} no existe`);
    }
 
    try {
        const respuesta = await axios.get(ruta);
        if (!Array.isArray(respuesta.data) || respuesta.data.length === 0) {
            throw new Error("El archivo de rondas está vacío o es inválido");
        }
 
        return respuesta.data;
    } catch (e) {
        throw new Error(`Hay un error en la carga del juego ${numeroJuego}`);
    }
};
 
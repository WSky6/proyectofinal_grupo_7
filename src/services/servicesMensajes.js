import axios from "axios";

const RUTA_MENSAJES = "/data/mensajesResultados.json";

export const listarMensajesResultados = async () => {
    try {
        const respuesta = await axios.get(RUTA_MENSAJES);
        if (!Array.isArray(respuesta.data) || respuesta.data.length === 0) {
            throw new Error("El archivo de mensajes está vacío o es inválido");
        }
        return respuesta.data;
    } catch {
        throw new Error("Hay un error en la carga de los mensajes de resultados");
    }
};

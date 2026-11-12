import axios from "axios";

export const obtenerJuego1 = async () => {
  try {
    const respuesta = await axios.get("/data/juego1.json");
    console.log("Datos del juego 1 obtenidos:", respuesta.data);
    return respuesta.data;

  } catch (error) {
    console.error("Error al cargar el Juego 1:", error);
    throw error;
  }
};

export const obtenerJuego2 = async () => {
  try {
    const respuesta = await axios.get("/data/juego2.json");
    return respuesta.data;
  } catch (error) {
    console.error("Error al cargar el Juego 2:", error);
    throw error;
  }
};
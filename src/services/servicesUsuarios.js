import axios from "axios";
 
export const listarUsuarios = async () => {
    try {
        const respuesta = await axios.get('/data/usuarios.json');
        if (!Array.isArray(respuesta.data)) {
            throw new Error("El archivo de usuarios es inválido");
        }
        return respuesta.data;
    } catch (e) {
        throw new Error(e);
    }
};
 
const CLAVE_SESION = "usuarioEnSesion";
 
export const guardarUsuarioEnSesion = (usuario) => {
    sessionStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
};
 
export const obtenerUsuarioEnSesion = () => {
    try {
        const u = sessionStorage.getItem(CLAVE_SESION);
        return u ? JSON.parse(u) : null;
    } catch {
        return null;
    }
};
 
export const limpiarSesion = () => {
    sessionStorage.removeItem(CLAVE_SESION);
};
 
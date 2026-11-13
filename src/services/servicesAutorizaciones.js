import { listarUsuarios } from "./servicesUsuarios";

const servicesAutorizaciones = (() => {

    const login = async (user, password) => {
        const usuarios = await listarUsuarios();
        const encontrado = usuarios.find(
            (u) => u.user === user.trim() && u.password === password
        );

        if (!encontrado) return null;
        return { id: encontrado.id, nombre: encontrado.nombre, rol: encontrado.rol };
    };

    return (
        { login }
    )
})();

export default servicesAutorizaciones;
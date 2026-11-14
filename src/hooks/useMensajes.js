import { useEffect, useState } from "react";
import { listarMensajesResultados } from "../services/servicesMensajes";

export const useMensajes = () => {
    const [mensajes, setMensajes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let activo = true;

        const cargarMensajes = async () => {
            try {
                setError(null);
                const data = await listarMensajesResultados();
                if (activo) {
                    setMensajes(Array.isArray(data) ? data : []);
                }
            } catch (e) {
                if (activo) {
                    setMensajes([]);
                    setError(e.message);
                }
            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        };

        cargarMensajes();

        return () => {
            activo = false;
        };
    }, []);

    return { mensajes, cargando, error };
};

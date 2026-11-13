import { useEffect, useState } from "react";
import { listarRondas } from "../services/serviciosDeJuego.js";
 
export const useRondas = (numeroJuego) => {
    const [rondas, setRondas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [intento, setIntento] = useState(0);
 
    useEffect(() => {
        let activo = true;
 
        const cargarRondas = async () => {
            try {
                setCargando(true);
                setError(null);
                const data = await listarRondas(numeroJuego);
                if (activo) setRondas(data);
            } catch (e) {
                if (activo) {
                    setRondas([]);
                    setError(e.message);
                }
            } finally {
                if (activo) setCargando(false);
            }
        };
 
        cargarRondas();
 
        return () => {
            activo = false;
        };
    }, [numeroJuego, intento]);

    const reintentar = () => setIntento((anterior) => anterior + 1);
 
    return { rondas, cargando, error, reintentar };
};
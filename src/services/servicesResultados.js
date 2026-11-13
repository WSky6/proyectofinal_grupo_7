const ALMACEN_LOCAL = "resultadosGuardados";
 
export const listarResultados = () => {
    const guardados = localStorage.getItem(ALMACEN_LOCAL);
    if (guardados && guardados !== "undefined" && guardados !== "null") {
        try {
            const datos = JSON.parse(guardados);
            return Array.isArray(datos) ? datos : [];
        } catch (e) {
            console.log("Error al parsear los resultados guardados en localStorage:", e);
            return [];
        }
    }
    return [];
};
 
export const guardarResultados = (resultados) => {
    try {
        localStorage.setItem(ALMACEN_LOCAL, JSON.stringify(resultados));
    } catch (e) {
        console.log("Error al guardar los resultados en localStorage:", e);
    }
};

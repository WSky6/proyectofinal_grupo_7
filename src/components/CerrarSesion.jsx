import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUsuarios } from "../hooks/useUsuarios";

import "../../css/Components.css";

const CerrarSesion = () => {

    const { usuarioActivo, cerrarSesion } = useUsuarios();
    const navegar = useNavigate();

    const gestionarCerrarSesion = () => {
        cerrarSesion();
        navegar("/");
    };

    return (
        <div>
            {usuarioActivo && (
                <Button color="inherit" variant="outlined" className="boton-cerrar"
                    onClick={gestionarCerrarSesion}>
                    {usuarioActivo.nombre} Cerrar Sesion
                </Button>
            )}
        </div>
    )
};
export default CerrarSesion;
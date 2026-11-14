import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { useUsuarios } from "../hooks/useUsuarios";
import { useJuego } from "../hooks/useJuego";
import { useMensajes } from "../hooks/useMensajes";
import CartaAnimal from "../components/CartaAnimal";

import "../../css/Components.css";

const PUNTAJE_POR_JUEGO = 50;
const PUNTAJE_MAXIMO = PUNTAJE_POR_JUEGO * 2;

const Resultados = () => {
  const navigate = useNavigate();

  const { usuarioActivo, cerrarSesion } = useUsuarios();
  const nombre = usuarioActivo?.nombre;
  const { puntajeJuego1, puntajeJuego2, puntajeTotal, reiniciarJuego } = useJuego();
  const { mensajes, cargando, error } = useMensajes();

  // Se elige el mensaje de mayor "minimo" que alcanza el total (sin depender del orden del JSON)
  const resultado = useMemo(() => {
    const elegido = [...mensajes]
      .sort((a, b) => b.minimo - a.minimo)
      .find((m) => puntajeTotal >= m.minimo);

    if (!elegido) {
      return null;
    }

    // Misma forma que usa CartaAnimal: imagen, animal y descripcion
    return {
      imagen: elegido.imagen,
      animal: elegido.titulo,
      descripcion: elegido.mensaje.replace("{nombre}", nombre)
    };
  }, [mensajes, puntajeTotal, nombre]);

  const jugarDeNuevo = () => {
    reiniciarJuego();
    cerrarSesion();
    navigate("/");
  };

  return (
    <div className="game-container">
      <header className="game-header">
        <h1>🏆 Resultados finales 🏆</h1>

        <p>¡Hola {nombre}! Mirá cómo te fue en la granja.</p>
      </header>

      {/* maxHeight libre: en pantallas chicas las cajas de puntaje pasan a 2 filas */}
      <section className="game-info" style={{ maxHeight: "none", marginBottom: "15px" }}>
        <div className="score-box">
          🐮 Juego 1: {puntajeJuego1} / {PUNTAJE_POR_JUEGO}
        </div>

        <div className="score-box">
          🔍 Juego 2: {puntajeJuego2} / {PUNTAJE_POR_JUEGO}
        </div>

        <div className="score-box">
          ⭐ Total: {puntajeTotal} / {PUNTAJE_MAXIMO}
        </div>
      </section>

      {cargando && <p>Preparando tu mensaje... 🏆</p>}

      {/* Si falla el JSON igual se ven los puntajes y el botón */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <CartaAnimal animal={resultado} />

      <button className="next-button" onClick={jugarDeNuevo}>
        Jugar de nuevo
      </button>
    </div>
  );
};

export default Resultados;

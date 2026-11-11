import { useState, useEffect, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AutorizacionesContext } from "../context/JuegoContexto";
import { obtenerJuego1 } from "../services/serviciosDeJuego";
import CartaAnimal from "../components/CartaAnimal";
import BotonOpcion from "../components/BotonOpcion";
import Mensaje from "../components/Mensaje";

import "../../css/Components.css";

const Juego1 = () => {
  const navigate = useNavigate();

  const {
    nombre,
    guardarPuntajeJuego1
  } = useContext(AutorizacionesContext);

  const [rondas, setRondas] = useState([]);
  const [rondaActual, setRondaActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);

  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [intentoCarga, setIntentoCarga] = useState(0);

  useEffect(() => {
    let activo = true;

    const cargarRondas = async () => {
      try {
        setCargando(true);
        setError(false);

        const datos = await obtenerJuego1();

        if (!Array.isArray(datos) || datos.length !== 5) {
          throw new Error("Los datos del juego no son válidos.");
        }

        if (activo) {
          setRondas(datos);
        }

      } catch (error) {
        console.error(error);

        if (activo) {
          setError(true);
        }

      } finally {

        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarRondas();

    return () => {
      activo = false;
    };

  }, [intentoCarga]);

  const animalActual = useMemo(() => {
    return rondas[rondaActual];
  }, [rondas, rondaActual]);

  const seleccionarRespuesta = (opcion) => {

    if (respuestaSeleccionada !== null) {
      return;
    }

    setRespuestaSeleccionada(opcion);

    const esCorrecta =
      opcion === animalActual.respuestaCorrecta;

    if (esCorrecta) {

      setPuntaje((anterior) => anterior + 10);

      setFeedback({
        correcta: true,
        mensaje: `¡Correcto! ¡La ${animalActual.animal.toLowerCase()} comió! +10 puntos`
      });

    } else {

      setFeedback({
        correcta: false,
        mensaje: `¡Error! La respuesta correcta era: ${animalActual.respuestaCorrecta}`
      });
    }
  };

  const siguienteRonda = () => {

    if (respuestaSeleccionada === null) {
      return;
    }

    if (rondaActual < rondas.length - 1) {

      setRondaActual((anterior) => anterior + 1);
      setRespuestaSeleccionada(null);
      setFeedback(null);

    } else {

      guardarPuntajeJuego1(puntaje);
      navigate("/juego-2");
    }
  };

  if (cargando) {
    return (
      <div className="game-container">
        <h2>Cargando los animalitos...</h2>
        <p>¡Estamos preparando la comida de la granja! 🐮</p>
      </div>
    );
  }

  if (error || !animalActual) {
    return (
      <div className="game-container">
        <h2>¡Ups! Algo salió mal.</h2>

        <p>No pudimos cargar los animales.</p>

        <button
          onClick={() =>
            setIntentoCarga((anterior) => anterior + 1)
          }
        >
          Intentar nuevamente
        </button>

      </div>
    );
  }

  return (
    <div className="game-container">

      <header className="game-header">
        <h1>🐮 ¡Hora de Comer! 🐔</h1>

        <p>
          ¡Hola {nombre}! Ayudá a los animales a encontrar
          su comida favorita.
        </p>
      </header>

      <section className="game-info">

        <p>
          Pregunta {rondaActual + 1} de {rondas.length}
        </p>

        <div className="score-box">
          ⭐ Puntaje: {puntaje} / 50
        </div>

      </section>

      <CartaAnimal animal={animalActual} />

      <section className="options-container">

        <h3>¿Qué come este animal?</h3>

        <div className="options-grid">

          {animalActual.opciones.map((opcion) => {

            const seleccionada =
              respuestaSeleccionada === opcion;

            const correcta =
              seleccionada &&
              opcion === animalActual.respuestaCorrecta;

            return (
              <BotonOpcion
                key={opcion}
                opcion={opcion}
                onClick={() => seleccionarRespuesta(opcion)}
                disabled={respuestaSeleccionada !== null}
                seleccionada={seleccionada}
                correcta={correcta}
              />
            );
          })}

        </div>

      </section>

      <Mensaje
        mensaje={feedback?.mensaje}
        correcta={feedback?.correcta}
      />

      {respuestaSeleccionada !== null && (
        <button
          className="next-button"
          onClick={siguienteRonda}
        >
          {rondaActual === rondas.length - 1
            ? "Finalizar juego"
            : "Siguiente animal"}
        </button>
      )}

    </div>
  );
}

export default Juego1;
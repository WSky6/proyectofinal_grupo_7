import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AutorizacionesContext } from '../context/JuegoContexto';
import { Box, Typography, Button, Container, Grid, Paper, Alert } from '@mui/material';
import { obtenerJuego2 } from '../services/serviciosDeJuego'; // Asegúrate de importar el servicio

const Juego2 = () => {
  const { nombre, guardarPuntajeJuego2 } = useContext(AutorizacionesContext);
  const navigate = useNavigate();

  const [rondasJuego2, setRondasJuego2] = useState([]);
  const [rondaActual, setRondaActual] = useState(0);
  const [puntosLocal, setPuntosLocal] = useState(0);
  const [mensajeFeedback, setMensajeFeedback] = useState("");
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [intentoCarga, setIntentoCarga] = useState(0);

  useEffect(() => {
    let activo = true;

    const cargarRondas = async () => {
      try {
        setCargando(true);
        setError(false);

        const datos = await obtenerJuego2();

        if (!Array.isArray(datos) || datos.length !== 5) {
          throw new Error("Los datos del juego 2 no son válidos.");
        }

        if (activo) {
          setRondasJuego2(datos);
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

  const ronda = useMemo(() => {
    return rondasJuego2[rondaActual];
  }, [rondasJuego2, rondaActual]);

  const seleccionarOpcion = (opcion, index) => {
    if (opcionSeleccionada !== null) return; // Evita doble clic

    setOpcionSeleccionada(index);

    let nuevosPuntos = puntosLocal;
    if (opcion.esIntruso) {
      nuevosPuntos += 10;
      setPuntosLocal(nuevosPuntos);
      setMensajeFeedback("¡Sacaste al intruso! La granja está a salvo. El niño gana 10 puntos.");
    } else {
      setMensajeFeedback("Incorrecto. Ese sí es de la granja.");
    }

    // Espera 1.5 segundos para pasar a la siguiente ronda o finalizar
    setTimeout(() => {
      setMensajeFeedback("");
      setOpcionSeleccionada(null);

      if (rondaActual + 1 < rondasJuego2.length) {
        setRondaActual(rondaActual + 1);
      } else {
        guardarPuntajeJuego2(nuevosPuntos);
        navigate('/resultados');
      }
    }, 1500);
  };

  if (cargando) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="primary">Buscando al intruso...</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>¡Preparando los animales de la granja! 🔍</Typography>
      </Container>
    );
  }

  if (error || !ronda) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: '#ffebee' }}>
          <Typography variant="h5" color="error" gutterBottom>¡Ups! Algo salió mal.</Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>No pudimos cargar los datos del Juego 2.</Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => setIntentoCarga((anterior) => anterior + 1)}
          >
            Intentar nuevamente
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, backgroundColor: '#fffde7' }}>
        <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
          Juego 2: El Intruso de la Granja 🔍
        </Typography>

        <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
          ¡Un animal que NO es de la granja se metió! Tenés que encontrarlo y sacarlo.
        </Typography>

        <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
          Ronda {rondaActual + 1} de {rondasJuego2.length}
        </Typography>

        <Typography variant="h5" sx={{ my: 3, color: '#333', fontWeight: 'bold' }}>
          Haz clic en el animal que NO pertenece a la granja
        </Typography>

        <Grid container spacing={3} sx={{ justifyContent: 'center', my: 2 }}>
          {ronda.opciones.map((opcion, index) => {
            // Estilos dinámicos para acierto (verde) o error (rojo) como en el ejemplo
            let backgroundColor = '#81c784'; // Verde por defecto para animales de granja
            if (opcion.esIntruso && opcionSeleccionada !== null) {
              backgroundColor = '#e57373'; // Rojo si es el intruso revelado
            }

            return (
              <Grid item xs={12} sm={4} key={index}>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={opcionSeleccionada !== null}
                  onClick={() => seleccionarOpcion(opcion, index)}
                  sx={{
                    height: 160,
                    flexDirection: 'column',
                    fontSize: '1.2rem',
                    backgroundColor: opcionSeleccionada === index 
                      ? (opcion.esIntruso ? '#e57373' : '#81c784') 
                      : '#a5d6a7',
                    color: '#000',
                    borderRadius: '50px',
                    boxShadow: 3,
                    '&:hover': { backgroundColor: '#81c784' }
                  }}
                >
                  <span style={{ fontSize: '3.5rem', marginBottom: '8px' }}>{opcion.emoji}</span>
                  <b>{opcion.nombre}</b>
                  {opcionSeleccionada !== null && opcion.esIntruso && (
                    <Typography variant="caption" sx={{ color: '#b71c1c', fontWeight: 'bold', mt: 1 }}>
                      ¡INTRUSO!
                    </Typography>
                  )}
                </Button>
              </Grid>
            );
          })}
        </Grid>

        {mensajeFeedback && (
          <Box sx={{ mt: 3 }}>
            <Alert 
              severity={mensajeFeedback.includes("salvo") ? "success" : "error"}
              sx={{ fontSize: '1.1rem', justifyContent: 'center' }}
            >
              {mensajeFeedback}
            </Alert>
          </Box>
        )}

        <Typography variant="h6" sx={{ mt: 4, color: '#2e7d32' }}>
          Puntos acumulados en este juego: {puntosLocal}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Juego2;
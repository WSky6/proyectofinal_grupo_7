import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AutorizacionesContext } from '../context/JuegoContexto';
import { Box, Typography, Button, Container, Paper } from '@mui/material';

const PUNTAJE_MAXIMO = 100;

const mensajePorPuntaje = (total, nombre) => {
  if (total >= 90) return { emoji: '🏆', texto: `¡Excelente, ${nombre}! Sos un gran granjero.` };
  if (total >= 60) return { emoji: '🎉', texto: `¡Muy bien, ${nombre}! Conocés muy bien la granja.` };
  if (total >= 30) return { emoji: '👏', texto: `¡Buen trabajo, ${nombre}! Con un poco más de práctica vas a ser un experto.` };
  return { emoji: '🌱', texto: `¡Gracias por jugar, ${nombre}! Probá de nuevo y vas a mejorar.` };
};

const Resultados = () => {
  const { nombre, puntajeJuego1, puntajeJuego2, reiniciarJuego } =
    useContext(AutorizacionesContext);
  const navigate = useNavigate();

  const nombreMostrado = nombre || guardarNombre(); //Revisar y resolver esta mrd
  const total = puntajeJuego1 + puntajeJuego2;
  const mensaje = mensajePorPuntaje(total, nombreMostrado);

  const jugarDeNuevo = () => {
    reiniciarJuego();
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, backgroundColor: '#fffde7' }}>
        <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
          Resultados finales
        </Typography>

        <Typography variant="h5" sx={{ mb: 3 }}>
          Jugador: <b>{nombreMostrado}</b>
        </Typography>

        <Box sx={{ textAlign: 'left', mb: 3, fontSize: '1.2rem' }}>
          <Typography variant="h6">Juego 1 (¡Hora de Comer!): <b>{puntajeJuego1}</b> / 50</Typography>
          <Typography variant="h6">Juego 2 (El Intruso): <b>{puntajeJuego2}</b> / 50</Typography>
        </Box>

        <Typography variant="h4" sx={{ color: '#2e7d32', fontWeight: 'bold', mb: 3 }}>
          Total: {total} / {PUNTAJE_MAXIMO}
        </Typography>

        <Typography variant="h5" sx={{ mb: 4 }}>
          <span style={{ fontSize: '2.5rem' }}>{mensaje.emoji}</span>
          <br />
          {mensaje.texto}
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={jugarDeNuevo}
          sx={{ borderRadius: '50px', px: 5, py: 1.5, fontSize: '1.2rem', textTransform: 'none' }}
        >
          Jugar de nuevo
        </Button>
      </Paper>
    </Container>
  );
};

export default Resultados;
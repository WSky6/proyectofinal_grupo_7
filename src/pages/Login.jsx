import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AutorizacionesContext } from '../context/JuegoContexto';
import servicesAutorizaciones from '../services/servicesAutorizaciones';

import '../../css/PantallaLoginDiseno.css';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  // 1. Creamos el estado para el error, exactamente como hizo el profe
  const [error, setError] = useState('');

  const navegar = useNavigate();
  const { guardarNombre } = useContext(AutorizacionesContext);

  const manejarIngreso = async (e) => {
    e.preventDefault();
    // 2. Limpiamos cualquier error previo al intentar un nuevo ingreso
    setError('');

    const userLimpio = usuario.trim();
    const passLimpio = password.trim();

<<<<<<< Updated upstream
    if (userLimpio !== '' && passLimpio !== '') {
      const usuarioEncontrado = await servicesAutorizaciones.login(userLimpio, passLimpio);

      if (usuarioEncontrado) {
        guardarNombre(usuarioEncontrado);
        navegar('/Juego_1');
      } else {
        alert('Usuario o contraseña incorrectos. ¡Revisá tus datos!');
      }
    } else {
      alert('Por favor, ingresá tu usuario y contraseña.');
=======
    if (userLimpio === '' || passLimpio === '') {
      setError('Por favor, ingresá tu usuario y contraseña.');
      return;
    }

    try {
      const usuarioEncontrado = await servicesAutorizaciones.login(userLimpio, passLimpio);

      if (!usuarioEncontrado) {
        setError('Usuario o contraseña incorrectos. ¡Revisá tus datos!');
        return;
      }

      guardarSesion(usuarioEncontrado);
      reiniciarJuego();

      navegar(usuarioEncontrado.rol === 'profesor' ? '/usuarios-resultados' : '/juego-1');
    } catch (err) {
      console.log('Error al iniciar sesión:', err);
      setError('No se pudo iniciar sesión. Intentá de nuevo en un momento.');
>>>>>>> Stashed changes
    }
  };

  return (
    <div className="contenedor-login">
      <div className="columna-formulario">
        <form className="formulario-login" onSubmit={manejarIngreso}>
          <h2 className="titulo-formulario">Ingreso al Sistema</h2>

          {/* 3. Renderizado condicional: Solo se dibuja en pantalla si hay un texto en "error" */}
          {error && (
            <div 
              className="alerta-error" 
              style={{
                backgroundColor: '#fdeded',
                color: '#ef5350',
                padding: '12px',
                borderRadius: '6px',
                marginBottom: '15px',
                textAlign: 'center',
                fontWeight: 'bold',
                border: '1px solid #ef5350'
              }}
            >
              {error}
            </div>
          )}

          <label htmlFor="usuario" className="etiqueta-input">Usuario</label>
          <input
            id="usuario"
            type="text"
            className="entrada-datos"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Ej: alumno1"
          />

          <label htmlFor="password" className="etiqueta-input">Contraseña</label>
          <input
            id="password"
            type="password"
            className="entrada-datos"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Escribí tu contraseña"
          />

          <button type="submit" className="boton-comenzar">
            Entrar a la Granja
          </button>
        </form>
      </div>

      <div className="columna-texto">
        <h1 className="titulo-granja">¡Bienvenidos a la Granja!</h1>
        <p className="descripcion-granja">
          Descubrí cómo funciona el mundo agrícola. Prepará la tierra, 
          cuidá tus cultivos y aprendé divirtiéndote.
        </p>
      </div>
    </div>
  );
};

export default Login;
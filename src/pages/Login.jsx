import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsuarios } from '../hooks/useUsuarios';
import { useJuego } from '../hooks/useJuego';
import servicesAutorizaciones from '../services/servicesAutorizaciones';

import '../../css/PantallaLoginDiseno.css';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const navegar = useNavigate();
  const { guardarSesion } = useUsuarios();
  const { reiniciarJuego } = useJuego();

  const manejarIngreso = async (e) => {
    e.preventDefault();

    const userLimpio = usuario.trim();
    const passLimpio = password.trim();

    if (userLimpio === '' || passLimpio === '') {
      alert('Por favor, ingresá tu usuario y contraseña.');
      return;
    }

    try {
      const usuarioEncontrado = await servicesAutorizaciones.login(userLimpio, passLimpio);

      if (!usuarioEncontrado) {
        alert('Usuario o contraseña incorrectos. ¡Revisá tus datos!');
        return;
      }

      guardarSesion(usuarioEncontrado);
      reiniciarJuego();

      navegar(usuarioEncontrado.rol === 'profesor' ? '/usuarios-resultados' : '/juego-1');
    } catch (error) {
      console.log('Error al iniciar sesión:', error);
      alert('No se pudo iniciar sesión. Intentá de nuevo en un momento.');
    }
  };

  return (
    <div className="contenedor-login">
      <div className="columna-formulario">
        <form className="formulario-login" onSubmit={manejarIngreso}>
          <h1 className="titulo-formulario">Ingreso al Sistema</h1>

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
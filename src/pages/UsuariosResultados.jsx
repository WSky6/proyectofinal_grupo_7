import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsuarios } from '../hooks/useUsuarios';
import { useResultados } from '../hooks/useResultados';
import { listarUsuarios } from '../services/servicesUsuarios'
import BotonNavegar from '../components/BotonNavegar';
import '../../css/Resultados.css';

const UsuariosResultados = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  
  const navegar = useNavigate();
  const contextoUsuarios = useUsuarios();
  const cerrarSesion = contextoUsuarios.cerrarSesion;
  
  const { resultados } = useResultados();

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const datos = await listarUsuarios();
        setUsuarios(datos);
      } catch (e) {
        console.error(e);
        setError('No se pudo cargar la lista de alumnos.');
      }
    };

    cargarUsuarios();
  }, []);

    const resultadosAlumnos = useMemo(() => {
    return usuarios
      .filter((u) => u.rol === 'estudiante')
      .map((alumno) => {
        const partidas = resultados.filter((r) => r.usuarioId === alumno.id);
        const ultima = partidas[partidas.length - 1]; // la partida más reciente

        return {
          id: alumno.id,
          nombre: alumno.nombre,
          jugo: partidas.length > 0,
          partidas: partidas.length,
          juego1: ultima ? ultima.puntajeJuego1 : 0,
          juego2: ultima ? ultima.puntajeJuego2 : 0
        };
      });
  }, [usuarios, resultados]);

  const manejarCerrarSesion = () => {
    if (cerrarSesion) {
      cerrarSesion();
    }
    navegar('/'); 
  };

  return (
    <div className="contenedor-resultados">
      <h1 className="titulo-resultados">Resultados de los Usuarios</h1>
      
      <table className="tabla-resultados">
        <thead>
          <tr>
            <th>Nombre del Alumno</th>
            <th>Puntaje Juego 1</th>
            <th>Puntaje Juego 2</th>
            <th>Puntaje Total</th>
            <th>Partidas Jugadas</th>
          </tr>
        </thead>
        <tbody>
          {resultadosAlumnos.map((alumno) => (
            <tr key={alumno.id}>
              <td>{alumno.nombre}</td>
              <td>{alumno.juego1}</td>
              <td>{alumno.juego2}</td>
              <td>{alumno.juego1 + alumno.juego2}</td>
              <td>{alumno.partidas}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="botones-navegacion">
        <BotonNavegar ruta="/juego-1" texto="Ir a Juego 1" />
        <BotonNavegar ruta="/juego-2" texto="Ir a Juego 2" />
        
        <button 
          onClick={manejarCerrarSesion} 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#e74c3c', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer', 
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default UsuariosResultados;
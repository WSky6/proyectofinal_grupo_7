import { useState, useEffect } from 'react';
import BotonNavegar from '../components/BotonNavegar';

const UsuariosResultados = () => {
  const [resultadosAlumnos, setResultadosAlumnos] = useState([]);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const respuesta = await fetch('/data/usuarios.json');
        const usuarios = await respuesta.json();
        
        const estudiantes = usuarios
          .filter(u => u.rol === 'estudiante')
          .map(e => ({
            id: e.id,
            nombre: e.nombre,
            juego1: 0,
            juego2: 0
          }));
          
        setResultadosAlumnos(estudiantes);
      } catch (error) {
        console.error(error);
      }
    };
    
    cargarUsuarios();
  }, []);

  return (
    <div>
      <h1>Resultados de los Usuarios</h1>
      
      <table border="1" style={{ width: '100%', textAlign: 'center', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th>Nombre del Alumno</th>
            <th>Puntaje Juego 1</th>
            <th>Puntaje Juego 2</th>
            <th>Puntaje Total</th>
          </tr>
        </thead>
        <tbody>
          {resultadosAlumnos.map((alumno) => (
            <tr key={alumno.id}>
              <td>{alumno.nombre}</td>
              <td>{alumno.juego1}</td>
              <td>{alumno.juego2}</td>
              <td>{alumno.juego1 + alumno.juego2}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <BotonNavegar ruta="/juego-1" texto="Ir a Juego 1" />
        <BotonNavegar ruta="/juego-2" texto="Ir a Juego 2" />
      </div>
    </div>
  );
};

export default UsuariosResultados;
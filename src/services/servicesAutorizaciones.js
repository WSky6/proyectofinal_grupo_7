const servicesAutorizaciones = (() => {
  
 
  const listarUsuarios = async () => {
    try {
      const respuesta = await fetch('/data/usuarios.json'); 
      const usuarios = await respuesta.json();
      return usuarios;
    } catch (error) {
      console.error("Error al leer el archivo JSON:", error);
      return [];
    }
  };


  const login = async (user, password) => {
    const usuarios = await listarUsuarios();
    
    const encontrado = usuarios.find(
      (u) => u.user === user && u.password === password
    );

    if (!encontrado) return null;

    return { 
      id: encontrado.id, 
      nombre: encontrado.nombre, 
      rol: encontrado.rol 
    };
  };

  return {
    login,
    listarUsuarios
  };
})();

export default servicesAutorizaciones;
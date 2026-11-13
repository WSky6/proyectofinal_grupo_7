import { createBrowserRouter } from "react-router-dom";
import UsuariosResultados from "../pages/UsuariosResultados";
import Login from "../pages/Login";
import Juego1 from "../pages/Juego_1";
import Juego2 from "../pages/Juego_2";
import Resultados from "../pages/Resultados";
import Error from "../pages/Error";
import App from "../App";
import ProtectorRuta from "../components/ProtectorRuta";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Login /> },
            { path: "juego-1", element: <ProtectorRuta><Juego1 /> </ProtectorRuta> },
            { path: "juego-2", element: <ProtectorRuta><Juego2 /> </ProtectorRuta> },
            { path: "resultados", element: <ProtectorRuta><Resultados  /> </ProtectorRuta> },
            { path: "usuarios-resultados", element: <ProtectorRuta soloProfesor="profesor"><UsuariosResultados /> </ProtectorRuta> }
        ]
    }
]);
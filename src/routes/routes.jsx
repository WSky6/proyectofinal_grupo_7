import { createBrowserRouter } from "react-router-dom";
import UsuariosResultados from "../pages/UsuariosResultados";
import Login from "../pages/Login";
import Juego1 from "../pages/Juego_1";
import Juego2 from "../pages/Juego_2";
import Resultados from "../pages/Resultados";
import Error from "../pages/Error";
import App from "../App";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Login /> },
            { path: "juego-1", element: <Juego1 /> },
            { path: "juego-2", element: <Juego2 /> },
            { path: "resultados", element: <Resultados  /> },
            { path: "usuarios-resultados", element: <UsuariosResultados /> }
        ]
    }
]);
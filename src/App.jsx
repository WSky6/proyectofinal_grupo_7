import { Outlet } from "react-router-dom";
import CerrarSesion from "./components/CerrarSesion";

const App = () => {
  return (
    <div>
      <CerrarSesion />
      <Outlet />
    </div>
  );
};

export default App;
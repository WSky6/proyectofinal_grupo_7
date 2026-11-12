import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

const App = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
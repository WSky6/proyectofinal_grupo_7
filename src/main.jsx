import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { routes } from "./routes/routes";

import { ProveedorUsuariosContext } from './context/UsuariosContexto';
import { ProveedorJuegoContext } from './context/JuegoContexto';
import { ProveedorResultadosContext } from './context/ResultadosContexto';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProveedorUsuariosContext>
      <ProveedorJuegoContext>
        <ProveedorResultadosContext>
          <CssBaseline />
          <RouterProvider router={routes} />
        </ProveedorResultadosContext>
      </ProveedorJuegoContext>
    </ProveedorUsuariosContext>
  </StrictMode>
);

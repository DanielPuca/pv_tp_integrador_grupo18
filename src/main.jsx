import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes.jsx'
import { AdminProvider } from './context/AdminContext';
import 'bootstrap/dist/css/bootstrap.min.css';


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminProvider>
      <RouterProvider router={routes} />
    </AdminProvider>
  </StrictMode>
);

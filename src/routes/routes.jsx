import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ListaClientes from '../pages/ListaClientes';
import DetalleCliente from '../pages/DetalleCliente';
import RutaProtegida from '../components/RutaProtegida';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Navigate to="/login" /> },
            { path: 'login', element: <Login /> },
            { path: 'dashboard', element: <RutaProtegida><Dashboard /></RutaProtegida> },
            { path: 'clientes', element: <RutaProtegida><ListaClientes /></RutaProtegida> },
            { path: 'clientes/:id', element: <RutaProtegida><DetalleCliente /></RutaProtegida> },
        ]
    }
]);

export default routes;
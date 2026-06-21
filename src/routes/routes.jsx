import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Dashboard from '../views/Dashboard';
import ListaClientes from '../views/ListaClientes';
import DetalleCliente from '../views/DetalleCliente';
import RutaProtegida from '../components/RutaProtegida';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'clientes', element: <RutaProtegida><ListaClientes /></RutaProtegida> },
            { path: 'clientes/:id', element: <RutaProtegida><DetalleCliente /></RutaProtegida> },
        ]
    }
]);

export default routes;

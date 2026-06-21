import { Navigate } from 'react-router-dom';
import { useAdmin } from '../hook/useAdmin';

const RutaProtegida = ({ children }) => {
    const { admin } = useAdmin();

    if (!admin) return <Navigate to="/" replace />;

    return children;
};

export default RutaProtegida;
import { NavLink } from 'react-router-dom';

const Nav = () => {
    const estiloLink = ({ isActive }) =>
        isActive
            ? 'text-warning text-decoration-none fw-bold'
            : 'text-white text-decoration-none';
    return (
        <ul className="d-flex gap-3 list-unstyled mb-0 me-auto">
            <li><NavLink to="/dashboard" className={estiloLink}>Inicio</NavLink></li>
            <li><NavLink to="/clientes" className={estiloLink}>Clientes</NavLink></li>
        </ul>
    );
};

export default Nav;
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Button} from 'react-bootstrap';
import { useAdmin } from '../hook/useAdmin';
import Nav from './Nav';

const Header = () => {
    const { admin, cerrarSesion } = useAdmin();
    const navigate = useNavigate();

    const manejarCierreSesion = () => {
        cerrarSesion();
        navigate('/');
    };

    return (
        <Navbar bg="dark" variant="dark" className="px-3">
            <Container fluid>
                <Navbar.Brand> 🎓Grupo 18</Navbar.Brand>
                <Nav />
                {admin && (
                    <div className="d-flex align-items-center gap-3">
                        <Navbar.Text className="text-white">
                            {admin.nombre} — <span className="text-warning">{admin.rol}</span>
                        </Navbar.Text>
                        <Button variant="outline-light" size="sm" onClick={manejarCierreSesion}>
                            Cerrar Sesión
                        </Button>
                    </div>
                )}
            </Container>
        </Navbar>
    );
};

export default Header;
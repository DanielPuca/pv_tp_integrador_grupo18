import { Col, Container, Row, Card } from 'react-bootstrap';
import Login from '../components/Login';

const Dashboard = () => {
    return (
        <div className="bg-dark min-vh-100 d-flex flex-column justify-content-center py-5">
            <Container>
                <Row className="mb-5">
                    <Col className="text-center">
                        <h1 className="text-white fw-bold">Bienvenido al Panel de Control de Clientes</h1>
                    </Col>
                </Row>
                <Row className="align-items-center g-4">
                    <Col md={7} className="text-white">
                        <h4 className="text-warning mb-3">¿Qué puedes hacer aquí?</h4>
                        <p className="text-light">
                           Desde aquí podés consultar, registrar y administrar clientes en tiempo real. 
                           Contamos con acceso seguro por usuario y contraseña, control de permisos según tu rol y conexión directa 
                           a la base de datos en la nube.
                           Cada administrador accede solo a las funciones habilitadas para su sector, garantizando la seguridad y 
                           privacidad de la información en todo momento.
                        </p>
                    </Col>
                    <Col md={5}>
                        <Card className="p-4 shadow">
                            <Card.Body>
                                <Login />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;
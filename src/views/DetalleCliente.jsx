import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Card, Col, Container, Row, Spinner, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../hook/useAdmin';
import clienteServices from '../services/clienteServices';

const DetalleCliente = () => {
  const { id } = useParams();

  const [cliente, setCliente] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { admin } = useAdmin();

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        setCargando(true);
        setError('');

        const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`);

        if (!respuesta.ok) {
          throw new Error('No se pudo obtener el cliente');
        }

        const datos = await respuesta.json();
        setCliente(datos);
      } catch (e) {
        setError('No se pudo cargar el detalle del cliente.');
      } finally {
        setCargando(false);
      }
    };

    obtenerCliente();
  }, [id]);

  const formatearTexto = (texto) => {
    if (!texto) return '';

    return texto
      .split(' ')
      .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
      .join(' ');
  };

  if (cargando) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <p className="mt-3">Cargando ficha del cliente...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!cliente) {
    return (
      <Container className="py-4">
        <Alert variant="warning">No se encontró información del cliente.</Alert>
      </Container>
    );
  }

  const { name, email, phone, address, username, password } = cliente;

  const manejarEliminar = async () => {

    const confirmar = window.confirm(
        '¿Desea eliminar este cliente?'
    );

    if (!confirmar) return;

    try {

        await clienteServices.eliminarCliente(id);

        alert('Cliente eliminado correctamente');

        navigate('/clientes');

    } catch (err) {

        setError(err.message);

    }

};

  return (
    
    <Container className="py-4">
      <Button variant="secondary" className="mb-3" onClick={() => navigate('/clientes')}>
        ← Volver
    </Button>
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="mb-1">Detalle del Cliente</h2>
          <p className="text-muted mb-4">
            Ficha completa obtenida desde FakeStoreAPI según el ID de la URL.
          </p>

          <Row>
            <Col md={6}>
              <h5>Datos personales</h5>
              <p><strong>ID:</strong> {cliente.id}</p>
              <p>
                <strong>Nombre completo:</strong>{' '}
                {formatearTexto(name.firstname)} {formatearTexto(name.lastname)}
              </p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Teléfono:</strong> {phone}</p>
            </Col>

            <Col md={6}>
              <h5>Credenciales de acceso</h5>
              <p><strong>Usuario:</strong> {username}</p>
              <p><strong>Contraseña:</strong> {password}</p>
            </Col>
          </Row>

          <hr />

          <h5>Dirección completa</h5>

          <Row>
            <Col md={6}>
              <p><strong>Calle:</strong> {formatearTexto(address.street)}</p>
            </Col>

            <Col md={6}>
              <p><strong>Número:</strong> {address.number}</p>
            </Col>

            <Col md={6}>
              <p><strong>Código postal:</strong> {address.zipcode}</p>
            </Col>

            <Col md={6}>
              <p><strong>Ciudad:</strong> {formatearTexto(address.city)}</p>
            </Col>
            {admin.rol === 'Gerencia' &&(
              <Col xs={12} className='text-center'>
                <Button variant="danger"  className="mb-3" onClick={ manejarEliminar }>
                  Eliminar
                </Button>
              </Col>
            )}
          </Row>
          
  
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DetalleCliente;
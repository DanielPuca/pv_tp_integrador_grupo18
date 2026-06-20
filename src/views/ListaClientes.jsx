import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Alert, Badge, Card, Container, Form, Spinner, Table, Button} from 'react-bootstrap';

const ListaClientes = () => {

  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        setCargando(true);
        setError('');

        const respuesta = await fetch('https://fakestoreapi.com/users');

        if (!respuesta.ok) {
          throw new Error('Error al consultar la API');
        }

        const datos = await respuesta.json();
        setClientes(datos);
      } catch (e) {
        setError('No se pudo cargar la lista de clientes. Intentá nuevamente más tarde.');
      } finally {
        setCargando(false);
      }
    };

    cargarClientes();
  }, []);

  const texto = busqueda.trim().toLowerCase();

  const clientesFiltrados = clientes.filter((cliente) => {
    const apellido = cliente.name.lastname.toLowerCase();
    const ciudad = cliente.address.city.toLowerCase();

    return apellido.includes(texto) || ciudad.includes(texto);
  });

  return (
    <Container className="py-4">
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
            <div>
              <h2 className="mb-1">Panel de Clientes</h2>
              <p className="text-muted mb-0">
                Consulta de clientes obtenidos desde FakeStoreAPI.
              </p>
            </div>

            <Badge bg="secondary" className="fs-6">
              {clientesFiltrados.length} de {clientes.length} clientes
            </Badge>
          </div>

          <Form.Group className="mt-4">
            <Form.Label>Buscar cliente</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese apellido o ciudad"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </Form.Group>
        </Card.Body>
      </Card>

      {cargando && (
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p className="mt-3 mb-0">Cargando información de clientes...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {!cargando && !error && clientesFiltrados.length === 0 && (
        <Alert variant="warning">
          No hay clientes que coincidan con la búsqueda realizada.
        </Alert>
      )}

      {!cargando && !error && clientesFiltrados.length > 0 && (
        <Table responsive bordered hover className="align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre completo</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Ciudad</th>
              <th>Ficha</th>
            </tr>
          </thead>

          <tbody>
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>
                  {cliente.name.firstname} {cliente.name.lastname}
                </td>
                <td>{cliente.email}</td>
                <td>{cliente.phone}</td>
                <td>{cliente.address.city}</td>
                <td>
                  <Button variant="outline-primary" size="sm"
                    onClick={() => navigate(`/clientes/${cliente.id}`)}
                  >
                    Ver Ficha 
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ListaClientes;
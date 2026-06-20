import {useState, useEffect} from 'react';
import clienteServices from '../services/clienteServices';
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import MensajeExito from './MensajeExito';

const FormCliente = () =>{
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        city: '',
        street: '',
        number: '',
        zipcode: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [erroresCampo, setErroresCampo] = useState({});
    const [mostrarExito, setMostrarExito] = useState(false);
    const [idCliente, setIdCliente] = useState(null);

    useEffect(() => {
        if (mostrarExito) {
            const timer = setTimeout(() => {
                setMostrarExito(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [mostrarExito]);


    const validarForm = ({ firstname, lastname, email, username, password }) => {
        const errores = {};

        if (!firstname.trim()) {
            errores.firstname = 'El nombre es obligatorio';
        } 
        if (!lastname.trim()) {
            errores.lastname = 'El apellido es obligatorio';
        } 
        if (!email.trim()) {
            errores.email = 'El email es obligatorio';            
        } else if (!email.includes('@')) {
            errores.email = 'Debe ingresar un email valido';
        }
        if (!username.trim()) {
            errores.username = 'El usuario es obligatorio';
        } else if (username.trim().length < 5) {
            errores.username = 'El usuario debe tener al menos 5 caracteres';
        }

        if (!password.trim()) {
            errores.password = 'La contraseña es obligatoria';
        } else if (password.trim().length < 7) {
            errores.password = 'La contraseña debe tener al menos 7 caracteres';
        }

        return errores;
    };


    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setError('');
        if (erroresCampo[name]) {
            setErroresCampo(prev => ({ ...prev, [name]: null }));
        }
    };


    const manejarEnvio = async (e) => {
        e.preventDefault();
        setError('');

        const errores = validarForm(form);

        if (Object.keys(errores).length > 0) {
            setErroresCampo(errores);
            return;
        }

        setLoading(true);

        try {
            const {
                firstname,
                lastname,
                city,
                street,
                number,
                zipcode,
                ...resto
            } = form;

            const nuevoCliente = {
                ...resto,

                name: {
                    firstname,
                    lastname
                },

                address: {
                    city,
                    street,
                    number,
                    zipcode
                }
            };

            
            const respuesta = await clienteServices.crearCliente(nuevoCliente);
            setIdCliente (respuesta.id);
            setMostrarExito(true);
            
            setForm({
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                username: '',
                password: '',
                city: '',
                street: '',
                number: '',
                zipcode: ''
            })
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }   
    };

    return(
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={7}>
                    <Card className="p-4 shadow">
                        <Card.Header>
                            <h3>Alta Cliente</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={manejarEnvio} noValidate>
                                <h5 className="mt-4 mb-3">Datos Personales</h5>
                                <hr />
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="firstname"
                                                    placeholder="Ingrese nombre"
                                                    value={form.firstname}
                                                    onChange={manejarCambio}
                                                />
                                                {erroresCampo.firstname && <p className="text-danger" style={{ fontSize: '0.85rem' }}>{erroresCampo.firstname}</p>}
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                                <Form.Label>Apellido</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="lastname"
                                                    placeholder="Ingrese apellido "
                                                    value={form.lastname}
                                                    onChange={manejarCambio}
                                                />
                                                {erroresCampo.lastname && <p className="text-danger" style={{ fontSize: '0.85rem' }}>{erroresCampo.lastname}</p>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                                <Form.Label>Correo</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    placeholder="Ingrese correo"
                                                    value={form.email}
                                                    onChange={manejarCambio}
                                                />
                                                {erroresCampo.email && <p className="text-danger" style={{ fontSize: '0.85rem' }}>{erroresCampo.email}</p>}
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                                <Form.Label>Telefono</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="phone"
                                                    placeholder="Ingrese telefono"
                                                    value={form.phone}
                                                    onChange={manejarCambio}
                                                />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <h5 className="mt-4 mb-3">Datos de Acceso</h5>
                                <hr />
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                                <Form.Label>Usuario</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="username"
                                                    placeholder="Ingrese usuario"
                                                    value={form.username}
                                                    onChange={manejarCambio}
                                                />
                                                {erroresCampo.username && <p className="text-danger" style={{ fontSize: '0.85rem' }}>{erroresCampo.username}</p>}
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                                <Form.Label>Contraseña</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    placeholder="Ingresá contraseña"
                                                    value={form.password}
                                                    onChange={manejarCambio}
                                                />
                                                {erroresCampo.password && <p className="text-danger" style={{ fontSize: '0.85rem' }}>{erroresCampo.password}</p>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <h5 className="mt-4 mb-3">Direccion</h5>
                                <hr />
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                                <Form.Label>Ciudad</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="city"
                                                    placeholder="Ingrese ciudad"
                                                    value={form.city}
                                                    onChange={manejarCambio}
                                                />                           
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                                <Form.Label>Calle</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="street"
                                                    placeholder="Ingrese calle"
                                                    value={form.street}
                                                    onChange={manejarCambio}
                                                />                    
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                                <Form.Label>Numero</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="number"
                                                    placeholder="Ingrese numero"
                                                    value={form.number}
                                                    onChange={manejarCambio}
                                                />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                                <Form.Label>Codigo Postal</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="zipcode"
                                                    placeholder="Ingrese codigo"
                                                    value={form.zipcode}
                                                    onChange={manejarCambio}
                                                />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {error && <p className="text-danger">{error}</p>}
                                    <Button variant="dark" type="submit" className="w-100 mt-3" disabled={loading}>
                                        {loading ? 'Guardando...' : 'Guardar Cliente'}
                                    </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <MensajeExito 
                        show={mostrarExito}
                        onClose={() => setMostrarExito(false)}
                        idCliente={idCliente}
                    />
                </Col>
            </Row>
        </Container>
    );

}
export default FormCliente;
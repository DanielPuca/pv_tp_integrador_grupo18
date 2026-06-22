import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import {  Form, Button, Card} from 'react-bootstrap';
import { useAdmin } from '../hook/useAdmin';
import adminService from '../services/adminServices';

const Login = () => {

    const navigate = useNavigate();
    const {admin, guardarSesion } = useAdmin();

    const [form, setForm] = useState({ usuario: '', contrasena: ''});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [verContrasena, setVerContrasena] = useState(false);
    const [erroresCampo, setErroresCampo] = useState({});
    if (admin) {
    return <Navigate to="/dashboard" replace />;
    }
    const validarForm = () => {
        const errores = {};
        
        if (form.usuario.trim().length < 3) {
            errores.usuario = 'El usuario debe tener al menos 3 caracteres';
        }
        if (form.contrasena.length < 7) {
            errores.contrasena = 'La contraseña debe tener al menos 7 caracteres';
        } else if (!/[A-Z]/.test(form.contrasena)) {
            errores.contrasena = 'La contraseña debe tener al menos una mayúscula';
        } else if (!/[0-9]/.test(form.contrasena)) {
            errores.contrasena = 'La contraseña debe tener al menos un número';
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

    const manejarIngreso = async (e) => {
        e.preventDefault();
        setError('');

       const errores = validarForm();
        if (Object.keys(errores).length > 0) {
            setErroresCampo(errores);
            return;
        }

        setLoading(true);
        try {
            const encontrado = await adminService.validarAdmin(form.usuario, form.contrasena);
            guardarSesion(encontrado);
            navigate('/clientes');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const formularioIncompleto = !form.usuario.trim() || !form.contrasena.trim();

    return (
        <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center">
            <Card style={{ width: '400px' }} className="p-4 shadow">
                <Card.Body>
                    <h3 className="text-center mb-4">Iniciar Sesión</h3>
                    <Form onSubmit={manejarIngreso} noValidate>
                        <Form.Group className="mb-3">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                name="usuario"
                                placeholder="Ingresá tu usuario"
                                value={form.usuario}
                                onChange={manejarCambio}
                            />
                            {erroresCampo.usuario && <p className="text-danger" style={{ fontSize: '0.85rem' }}>{erroresCampo.usuario}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <div className="d-flex gap-2">
                                <Form.Control
                                    type={verContrasena ? 'text' : 'password'}
                                    name="contrasena"
                                    placeholder="Ingresá tu contraseña"
                                    value={form.contrasena}
                                    onChange={manejarCambio}
                                />
                                <Button variant="outline-secondary" onClick={() => setVerContrasena(!verContrasena)}>
                                    {verContrasena ? '🙈' : '🙉'}
                                </Button>
                            </div>
                            {erroresCampo.contrasena && <p className="text-danger" style={{ fontSize: '0.85rem' }}>{erroresCampo.contrasena}</p>}
                        </Form.Group>
                        {error && <p className="text-danger">{error}</p>}
                        <Button variant="warning" type="submit" className="w-100" disabled={loading || formularioIncompleto}>
                            {loading ? 'Verificando...' : 'Ingresar'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;
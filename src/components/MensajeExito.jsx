import { Modal, Button } from "react-bootstrap";

const MensajeExito = ({show, onClose, idCliente}) => {
    
    return(
        
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Cliente creado</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Cliente creado correctamente.
                <br />
                ID asignado: {idCliente}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="success" onClick={onClose}>
                    Aceptar
                </Button>
            </Modal.Footer>
        </Modal>

    );

};

export default MensajeExito;
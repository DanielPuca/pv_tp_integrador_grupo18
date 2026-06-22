import { Modal, Button } from "react-bootstrap";

const MensajeExito = ({show, onClose, titulo, mensaje}) => {
    
    return(
        
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {mensaje}
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
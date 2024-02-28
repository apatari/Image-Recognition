import React from "react";
import { Modal, Button } from "react-bootstrap";

function AddImageModal({ show, handleClose }) {
    return (
        <Modal show={show} >
            <Modal.Header>
                <Modal.Title>
                    Add Image
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Form here
                
            </Modal.Body>
            <Modal.Footer>
                <Button className="me-auto" >Add</Button>
                <Button className="btn-secondary" onClick={handleClose} >Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddImageModal
import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function EditModal({ showEdit , setShowEdit, image }) {

    const handleClose = () => setShowEdit(false)


    return (
        <Modal show={showEdit} onHide={handleClose}>

            {/* Should preview show up too?  Or just error messages?  I like the preview */}

            <Modal.Header closeButton>
            <Modal.Title>Edit Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>Form goes here</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
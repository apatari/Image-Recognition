import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function DeleteModal({ showDelete , setShowDelete, image, images, setImages }) {

    const handleClose = () => setShowDelete(false)

    const handleDelete = () => {
        fetch(`/api/images/${image.id}`, {
            method: "DELETE",
        })
        .then(res => {
            if (res.ok) {
                handleClose()
                setImages(images => images.filter(img => img.id != image.id) )

            } else {
                alert("Error, delete unsuccessful")
                handleClose()
            }
        })
    }


    return (
        <Modal show={showDelete} onHide={handleClose}>

            {/* Note: show the image and name so users can be sure */}

            <Modal.Header closeButton>
            <Modal.Title>Delete Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
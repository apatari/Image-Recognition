import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ImageCard from "./ImageCards";

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
            <Modal.Title>Delete Image:</Modal.Title>
            </Modal.Header>
            <Modal.Body className="fs-4 " >
                <ImageCard image={image} setImages={setImages} images={images} showMenu={false} />
                Are you sure?
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} className="me-auto" >
                Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
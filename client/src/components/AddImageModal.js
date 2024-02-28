import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AddImageModal({ show, handleClose }) {
    return (
        <Modal show={show} >
            <Modal.Header>
                <Modal.Title>
                    Add Image
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="m-3 form-floating" >
                        <Form.Control
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Name"
                            // value={formik.values.name}
                            // onChange={formik.handleChange} 
                        >
                        </Form.Control>
                        <Form.Label> Name </Form.Label>
                    </Form.Group>

                    <Form.Group className="m-3 form-floating" >
                        <Form.Control
                            type="text" 
                            name="url" 
                            id="url" 
                            placeholder="Image URL"
                            // value={formik.values.url}
                            // onChange={formik.handleChange} 
                        >
                        </Form.Control>
                        <Form.Label> Image URL </Form.Label>

                    </Form.Group>
                </Form>
                
            </Modal.Body>
            <Modal.Footer>
                <Button className="me-auto" >Add</Button>
                <Button className="btn-secondary" onClick={handleClose} >Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddImageModal
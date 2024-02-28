import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Modal, Button, Form } from "react-bootstrap";

function AddImageModal({ show, handleClose }) {


    const [errors, setErrors] = useState([])
    const history = useHistory()

    const formSchema = yup.object().shape({
        name: yup.string().required("Please enter a name").max(20, "Name must be 20 characters or fewer"),
        url: yup.string().required("Please enter an image url")
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            url: ""
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            
            setErrors([])
            fetch("/api/images", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then(r => {
                if (r.ok) {
                     
                    history.push('/')    
                } else {
                    r.json().then(err => {
                        
                        console.log(err.errors)
                        setErrors(err.errors)
                    })
                }
            })
        }
    })


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
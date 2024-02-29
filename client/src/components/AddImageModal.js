import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import ImageCard from "./ImageCards";

function AddImageModal({ show, handleClose, images, setImages }) {


    const [errors, setErrors] = useState([])
    const [showPreview, setShowPreview] = useState(false)
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
                    r.json().then(data => {
                        
                        setImages([...images, data])
                        formik.resetForm()
                        setShowPreview(false)
                        handleClose() 
                    // history.push('/')
                    } )
                        
                } else {
                    r.json().then(err => {
                        
                        
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
            <Form onSubmit={formik.handleSubmit} >
            <Modal.Body>
                
                <Form.Group className="m-3 mb-4 form-floating" >
                    <Form.Control
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange} 
                    >
                    </Form.Control>
                    <Form.Label> Name </Form.Label>
                </Form.Group>
                {formik.errors.name? <p className="ms-4 text-danger" >{formik.errors.name}</p> : ""}
                <p className="my-2 " > <strong>Image URL must link to an image with exactly one face:</strong> </p>
                <Form.Group className="m-3 form-floating" >
                    <Form.Control
                        type="text" 
                        name="url" 
                        id="url" 
                        placeholder="Image URL"
                        value={formik.values.url}
                        onChange={ (e) => {
                            formik.handleChange(e)
                            setShowPreview(false)
                        }} 
                    >
                    </Form.Control>
                    <Form.Label> Image URL </Form.Label>

                </Form.Group>
                {formik.errors.url? <p className="ms-4 text-danger" >{formik.errors.url}</p> : ""}
                {errors.map(error => <p className="text-danger ms-4" key={error} >{error}</p>)}
                <Row className="m-3" >

               
                <Col>
                    <Button onClick={() => setShowPreview((prev => !prev))} >Toggle Preview</Button>
                </Col>
                <Col>
                    {showPreview? <div  className="ms-4" >  <ImageCard image={{"name":formik.values.name, "url":formik.values.url}} /></div>:""}

                </Col>
                </Row>
                
            </Modal.Body>
            <Modal.Footer>
                <Button className="me-auto" type="submit" >Add</Button>
                <Button className="btn-secondary" onClick={() => {
                    handleClose()
                    formik.resetForm()
                    setShowPreview(false)
                    }} >Cancel</Button>
            </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddImageModal
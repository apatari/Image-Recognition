import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form, Button, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LoginForm() {
    return (
        <div>
            <Col className="mx-auto" lg={5} >
                <h3 className="m-5" >Please log in</h3>
                <Form className="m-4" >
                    <Form.Group className="m-3 form-floating" >
                        <Form.Control
                            type="username" 
                            name="username" 
                            id="username" 
                            placeholder="Username"
                            // value={formik.values.username}
                            // onChange={formik.handleChange} 
                        >
                        </Form.Control>
                        <Form.Label> Username </Form.Label>
                    </Form.Group>

                    <Form.Group className="m-3 form-floating" >
                        <Form.Control
                            type="passwrod" 
                            name="password" 
                            id="password" 
                            placeholder="Password"
                            // value={formik.values.password}
                            // onChange={formik.handleChange} 
                        >
                        </Form.Control>
                        <Form.Label> Password </Form.Label>

                    </Form.Group>

                    <Button className="m-3" variant="primary" type="submit" >Log In</Button>

                </Form>
            </Col>
        </div>
    )
}

export default LoginForm
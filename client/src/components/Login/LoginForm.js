import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form, Button, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LoginForm() {
    return (
        <div>
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
            </Form>
        </div>
    )
}

export default LoginForm
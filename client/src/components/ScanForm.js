import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

export default function ScanForm() {

    const[scanUrl, setScanUrl] = useState(null)


    return (
        <div className="m-3" >
            
                <Form >
                    <Row >
                    <Col lg={6}  >

                    <Form.Group className="mb-3" >
                        <Form.Label className="fs-4">Scan an image</Form.Label>
                        <Form.Control type="text" placeholder="Enter image URL" />
                        <Form.Text className="text-muted">
                            Must be a valid image URL
                        </Form.Text>                                     
                    </Form.Group>
                    </Col>
                    </Row>
                </Form>

                <Button className="" >Scan</Button>

                    
           


            
        </div>
    )
}
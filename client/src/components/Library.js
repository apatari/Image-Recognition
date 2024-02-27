import React from "react";
import { Button, Row, Col, InputGroup, Form } from "react-bootstrap";


function Library() {
    return (
        <div className="m-4" >
            <h3 className="my-3" >Image Library</h3>
            <Button className="mb-3 ms-3" >Add new image</Button>
            <Row className="p-3" >
                <Col lg={3}>
                    <h4 >Known images</h4>
                </Col>
                <Col lg={5} >
                    <InputGroup className="mb-3 ">
                        <Button variant="info" id="button-addon1">
                        Search
                        </Button>
                        <Form.Control
                            aria-label="Example text with button addon"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Col>
            </Row>
            
        </div>
    )
}

export default Library
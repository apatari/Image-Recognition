import React, { useState, useEffect } from "react";
import { Button, Row, Col, InputGroup, Form } from "react-bootstrap";
import ImageCard from "./ImageCards"


function Library() {

    const [images, setImages] = useState([])

    useEffect(() => {
        fetch('/api/images')
        .then(res => res.json())
        .then(data => setImages(data))
    }, [])

    return (
        <div className="m-4" >
            <h3 className="my-3" >Image Library</h3>
            <Button className="mb-3 ms-3" >Add new image</Button>
            <Row className="p-3" >
                <Col lg={1}>
                    
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
            <Row className="d-flex flex-wrap" >
                {images.map(image => <ImageCard key={image.id} image={image} /> )}
            </Row>
            
        </div>
    )
}

export default Library
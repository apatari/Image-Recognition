import React, { useState } from "react";
import { Card, Dropdown } from "react-bootstrap";
import EditModal from "./EditModal";

function ImageCard({ image }) {

    const [showEdit, setShowEdit] = useState(false)

    return (
        <Card style={{ width: '12rem' }} className="m-2 p-2 bg-secondary bg-opacity-25 border-0" >
            <Card.Img variant="top" src={image.url}  className="rounded" style={{position: "relative"}} />
            <Dropdown   style={{position: "absolute", top:"12px", right: "28px", width:"20px", textAlign:"center"}} >
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{opacity: "45%"}} >
                    
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setShowEdit(true)}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => console.log(`deleting ${image.id}`)}>Delete</Dropdown.Item>
                    
                </Dropdown.Menu>
            </Dropdown>
            <Card.Body className="d-flex" >
                <Card.Title className="mt-auto" >{image.name}</Card.Title>
            </Card.Body>

            <EditModal showEdit={showEdit} setShowEdit={setShowEdit} />


        </Card>
    )
}

export default ImageCard
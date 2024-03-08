import React, { useState } from "react";
import { Card, Dropdown } from "react-bootstrap";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import AddImageModal from "./AddImageModal";

function ImageCard({ image, images, setImages, showMenu }) {

    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    return (
        <Card style={{ width: '12rem' }} className="m-2 p-2 bg-secondary bg-opacity-25 border-0" >
            <Card.Img variant="top" src={image.url}  className="rounded" style={{position: "relative"}} />
            {showMenu? 
            <Dropdown   style={{position: "absolute", top:"12px", right: "28px", width:"20px", textAlign:"center"}} >
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{opacity: "45%"}} >
                    
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setShowEdit(true)}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => setShowDelete(true)}>Delete</Dropdown.Item>
                    
                </Dropdown.Menu>
            </Dropdown>: ""}
            <Card.Body className="d-flex" >
                <Card.Title className="mt-auto" >{image.name}</Card.Title>
            </Card.Body>

            <AddImageModal  image={image} show={showEdit} handleClose={() => setShowEdit(false)} images={images} setImages={setImages} mode={"Edit"} />
            <DeleteModal showDelete={showDelete} setShowDelete={setShowDelete} image={image} images={images} setImages={setImages} />

        </Card>
    )
}

export default ImageCard
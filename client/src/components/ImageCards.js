import React from "react";
import { Card } from "react-bootstrap";

function ImageCard({ image }) {
    return (
        <Card style={{ width: '12rem' }} className="m-2 p-2 bg-secondary bg-opacity-25 border-0" >
            <Card.Img variant="top" src={image.url}  className="rounded" style={{position: "relative"}} />
            <div className="bg-secondary bg-opacity-50 rounded fs-5"  style={{position: "absolute", top:"12px", right: "13px", width:"20px", textAlign:"center"}} >&#8942;</div>
            <Card.Body className="d-flex" >
                <Card.Title className="mt-auto" >{image.name}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default ImageCard
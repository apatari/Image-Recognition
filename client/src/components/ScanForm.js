import React, { useState, useContext, useEffect } from "react";
import { Form, Col, Row, Button, Spinner } from "react-bootstrap";
import { UserContext } from "./App";
import ImageScan from "./ImageScan";

export default function ScanForm() {

    const[formText, setFormText] = useState("")
    const[scanUrl, setScanUrl] = useState("")
    const [errors, setErrors] = useState([])
    const [enteredImage, setEnteredImage] = useState(false)
    const [imageData, setImageData] = useState({"data":[]})
    const [isLoading, setIsLoading] = useState(false)

    const handleImageError = () => {
        setIsLoading(false)
        setImageData({"data": []})
    }

    const [user] = useContext(UserContext)


    const handleScanChange = (e) => {
        setFormText(e.target.value)
    }

    const handleScanClick = () => {
        setImageData({"data":[]})
        setIsLoading(true)
        setEnteredImage(true)
        setScanUrl(formText)
    }

    

    const handleScanRender = () => {
       
        setErrors([])
        fetch('/api/image_scan', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"url":scanUrl, "user_id": user.id})
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data =>{
                    setImageData(data)
                })
                console.log("good image")
            } else {
                res.json().then(err => setErrors(err.errors))
            }
        })
    }

    useEffect(handleScanRender, [scanUrl])

    return (
        <div className="m-3" >
            
                <Form >
                    <Row >
                    <Col lg={6}  >

                    <Form.Group className="mb-3" >
                        <Form.Label className="fs-4">Scan an image</Form.Label>
                        <Form.Control type="text" placeholder="Enter image URL" onChange={handleScanChange} value={formText} />
                        <Form.Text className="text-muted">
                            { (errors.length > 0 && enteredImage)? 
                                errors.map(error => <p className="text-danger m-2 " key={error} >{error}</p> )   
                                : "Must be a valid image URL"}
                        </Form.Text>                                     
                    </Form.Group>
                    </Col>
                    </Row>
                </Form>

                <Button className="" onClick={handleScanClick} >Scan</Button>
                
                {(isLoading && imageData.data.length == 0)? <div className="m-4" > <Spinner animation="grow" /> Loading</div>: ""}

                <div>
                    { (imageData.data.length > 0)? <div onError={handleImageError} > <ImageScan url={scanUrl} imageData={imageData} /></div>: ""}
                </div>

        </div>
    )
}
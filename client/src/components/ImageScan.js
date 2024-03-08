import React, { useContext, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import ImageWithNames from "./ImageWithNames";
import { Spinner } from "react-bootstrap"
import { UserContext } from "./App";

function ImageScan() {

  const [user, setUser] = useContext(UserContext)

  const PHOTO = "https://deadline.com/wp-content/uploads/2023/04/MCDHAPO_EC151.jpg?w=800"

  const [imageData, setImageData] = useState({"data":[]})

  useEffect(() => {
    fetch('/api/image_scan', {
      method: "POST", 
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({"url": PHOTO})
    })
    .then(res => res.json())
    .then(data => {
      setImageData(data)
      console.log(data)
    })
  }, [])

  if (!imageData.data.length > 0) {
    return (
      <div className="m-4" >
        <Spinner animation="grow" /> Loading
      </div>
    )
  }

  return (
    <div className="m-3" >
      {user.id}
      <ImageWithNames imageData={imageData} PHOTO={PHOTO} />
      
      
    </div>
  )
}

export default ImageScan
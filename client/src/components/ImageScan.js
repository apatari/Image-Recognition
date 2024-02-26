import React, { useContext, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import ImageWithNames from "./ImageWithNames";
import { Spinner } from "react-bootstrap"
import { UserContext } from "./App";

function ImageScan() {

  const [user, setUser] = useContext(UserContext)

  const PHOTO = "https://media.vanityfair.com/photos/597f32fff3c6f80e768c7fc4/1:1/w_916,h_916,c_limit/daenerys-game-of-thrones-recap.jpg"

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
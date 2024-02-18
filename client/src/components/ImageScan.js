import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import ImageWithNames from "./ImageWithNames";

function ImageScan() {

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

  if (!imageData) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div>
      
      <ImageWithNames imageData={imageData} PHOTO={PHOTO} />
      
      
    </div>
  )
}

export default ImageScan
import React, { useContext, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import ImageWithNames from "./ImageWithNames";
import { Spinner } from "react-bootstrap"
import { UserContext } from "./App";

function ImageScan({ url }) {

  const [user] = useContext(UserContext)


  const [imageData, setImageData] = useState({"data":[]})


  // this should be moved up to scan form, we're already making this call there.
  useEffect(() => {
    fetch('/api/image_scan', {
      method: "POST", 
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({"url": url})
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
      {/* change photo to url in component */}
      <ImageWithNames imageData={imageData} PHOTO={url} />
      
      
    </div>
  )
}

export default ImageScan
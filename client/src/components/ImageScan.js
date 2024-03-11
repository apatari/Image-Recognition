import React, { useContext, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import ImageWithNames from "./ImageWithNames";
import { Spinner } from "react-bootstrap"
import { UserContext } from "./App";

function ImageScan({ url, imageData }) {

  const [user] = useContext(UserContext)


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
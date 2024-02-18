import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

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
      
      <div  >

      
        <img 
          src={PHOTO} 
          alt="submitted image" 
          // style={{width: right - left, height: bottom - top, objectPosition: "139px 0`", objectFit:"none"}}
          style={{position:'relative'}}
          
        />
      </div>
      {imageData.data.map((item) => {
        return (
          <div>
            <div style={{position:'absolute', right:'', left:`${item.coordinates[3] + 25}px`, top:`${item.coordinates[2] + 10}px`, color:'red'}} >
              <h4 className="p-1" style={{background: "red", color:'white' }} >{item.name}</h4>
            </div>
            {/* <div style={{position:'absolute', right:'', left:`${item.coordinates[3] + 25}px`, top:`${item.coordinates[2] - 35}px`, color:'red'}} >
              <h2>______</h2>
            </div> */}
          </div>
        )
      })}
      
      
    </div>
  )
}

export default ImageScan
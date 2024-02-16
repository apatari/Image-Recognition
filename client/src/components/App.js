import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  const PHOTO = "https://hips.hearstapps.com/hmg-prod/images/harry-potter-1611601655.jpg?crop=0.5xw:1xh;center,top&resize=1200:*"

  const [imageData, setImageData] = useState([])

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
      {(imageData.data)? imageData.data.map((item) => {
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
      }): ""}
      
      
    </div>
  )






  const top = 139
  const bottom = 268
  const right = 798
  const left = 669

  // return (
  //   <div>
      
  //     <div  >

      
  //     <img 
  //       src="https://variety.com/wp-content/uploads/2019/02/game-of-thrones-season-8-1.jpeg" 
  //       alt="" 
  //       // style={{width: right - left, height: bottom - top, objectPosition: "139px 0`", objectFit:"none"}}
  //       style={{position:'relative'}}
        
  //     /></div>
  //     <div style={{position:'absolute', right:'', left:`${left + 25}px`, top:`${bottom}px`, color:'red'}} >
  //       <h2>John</h2>
  //     </div>
  //     <div style={{position:'absolute', right:'', left:`${left + 25}px`, top:`${bottom - 25}px`, color:'red'}} >
  //       <h2>__________</h2>
  //     </div>
  //     <div style={{position:'absolute', right:'', left:`${872 + 25}px`, top:`305px`, color:'red'}} >
  //       <h2>Danny</h2>
  //     </div>
  //     <div style={{position:'absolute', right:'', left:`${872 + 25}px`, top:`280px`, color:'red'}} >
  //       <h2>__________</h2>
  //     </div>
      
  //   </div>
  // )
}

export default App;

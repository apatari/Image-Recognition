import React from "react";
import { v4 as uuid } from "uuid"

function ImageWithNames ({ imageData, PHOTO }) {

    const newId = uuid()

    return (
        <div>

            <div  >
                <img 
                    src={PHOTO} 
                    alt="submitted image" 
                    style={{position:'relative'}}
                />
            </div>

            {imageData.data.map((item) => {
                return (
                    <div key={uuid()} >
                        <div 
                            style={{
                                position:'absolute', 
                                right:'', 
                                left:`${item.coordinates[3] + 55}px`, 
                                top:`${item.coordinates[2] + 300}px`, 
                                color:'red'
                            }} 
                        >
                            <h4 className="p-1" style={{background: "red", color:'white' }} >{item.name}</h4>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default ImageWithNames
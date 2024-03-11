import React from "react";

function ImageWithNames ({ imageData, PHOTO }) {
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
                    <div>
                        <div 
                            style={{
                                position:'absolute', 
                                right:'', 
                                left:`${item.coordinates[3] + 55}px`, 
                                top:`${item.coordinates[2] + 310}px`, 
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
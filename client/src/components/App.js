import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import ImageScan from "./ImageScan";

function App() {

  return (
    <div>
      <ImageScan />
    </div>
  )
}

export default App;

import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import ImageScan from "./ImageScan";

export const UserContext = createContext(null)

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/api/check_session")
    .then(res => {
      if (res.ok) {
        res.json().then(user => setUser(user))
      }
    })
  }, [])


  if (!user) return (
    <div>
      <UserContext.Provider value={[user, setUser]}>
        
        <Login onLogin={setUser}/>
      </UserContext.Provider>

    </div>
  )
  return (
    <div>
      <UserContext.Provider value = {[user, setUser]}>
        <ImageScan />
      </UserContext.Provider>
     
    </div>
  )
}

export default App;

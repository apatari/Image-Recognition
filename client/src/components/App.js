import React, { useEffect, useState, createContext } from "react";
import { Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import ImageScan from "./ImageScan";
import Login from "./Login/Login";
import Header from "./Header";
import Library from "./Library";

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
        <Header/>
        <Login onLogin={setUser}/>
      </UserContext.Provider>

    </div>
  )
  return (
    <div>
      <UserContext.Provider value = {[user, setUser]}>
        <Header/>

        <Switch>
          <Route exact path="/" >
            <Library />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/scan" >
            <ImageScan />
          </Route>
        </Switch>


        
      </UserContext.Provider>
     
    </div>
  )
}

export default App;

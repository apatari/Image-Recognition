import React, { useContext } from "react";
import { Col, Button, Navbar } from "react-bootstrap";
import { UserContext } from "./App";

function Header() {

    const [user, setUser] = useContext(UserContext)

    const handleLogoutClick = () => {
        fetch("/api/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
      }


    return (
        <div className="p-3 bg-secondary" >
            <Navbar expend="md"  >
                <Navbar.Brand>Image Rec</Navbar.Brand>
                {Boolean(user)? <Button className="ms-auto" onClick={handleLogoutClick}>Logout</Button> : ""}
                
            </Navbar>
            
        </div>
    )
}

export default Header
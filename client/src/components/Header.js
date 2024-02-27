import React, { useContext } from "react";
import { Col, Button, Navbar, Nav, NavLink } from "react-bootstrap";
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
            <Navbar expand="md"  >
                <Navbar.Brand>Image Rec</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" > 
                  <Nav>
                    <Nav.Link
                      href="/"
                      
                    >
                      Image Library
                    </Nav.Link>

                    <Nav.Link
                      href="/scan"
                      
                    >
                      Scan an image
                    </Nav.Link>

                  </Nav>
                  
                  {Boolean(user)? <Button className="ms-auto" onClick={handleLogoutClick}>Logout</Button> : ""}
                </Navbar.Collapse>
                
            </Navbar>
            
        </div>
    )
}

export default Header
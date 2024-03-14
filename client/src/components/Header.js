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
        <div  >
            <Navbar  className="bg-primary p-3" data-bs-theme="dark" expand="md"  >
                {/* <Navbar.Brand> <h2>Face Recognition</h2> </Navbar.Brand> */}
                <Navbar.Toggle />
                <Navbar.Collapse  > 
                  <Nav>
                    <Nav.Link
                      href="/"
                      
                    >
                      <h3 className="me-4" >Image Library</h3> 
                    </Nav.Link>

                    <Nav.Link
                      href="/scan"
                      
                    >
                      <h3>ID an image</h3>  
                    </Nav.Link>

                  </Nav>
                  
                  {Boolean(user)? <Button className="ms-auto" onClick={handleLogoutClick}>Logout</Button> : ""}
                </Navbar.Collapse>
                
            </Navbar>
            
        </div>
    )
}

export default Header
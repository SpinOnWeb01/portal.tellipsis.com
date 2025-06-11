// NavBarComponent.js

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function NavbarComponent() {
  const navigate = useNavigate();
  const redirect = (e) => {
    e.preventDefault();
    let data = "redirect";
    navigate("/login", { state: { data: data } });
  };
  const manage = (e) => {
    e.preventDefault();
    let data = "manage";
    navigate("/login", { state: { data: data } });
  };
  const sip = (e) => {
    e.preventDefault();
    let data = "sip";
    navigate("/login", { state: { data: data } });
  };
  const login = () => {
    navigate("/login");
  };
  return (
    <Navbar collapseOnSelect expand="lg" className="header-section">
      <Container>
        <Navbar.Brand href="#home">
          <img src="/img/logo-4-edit-1.png" className="img-fluid d-block" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* <Nav className="m-auto">
            <Nav.Link href="#DataStructures" className="nv-lnk">
              Home
            </Nav.Link>
            <NavDropdown
              title="Service"
              className="nv-lnk"
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item href="#">One</NavDropdown.Item>
              <NavDropdown.Item href="#">Two</NavDropdown.Item>
              <NavDropdown.Item href="#">Three</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title="Courses"
              className="nv-lnk"
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item href="#">One</NavDropdown.Item>
              <NavDropdown.Item href="#">Two</NavDropdown.Item>
              <NavDropdown.Item href="#">Three</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#!" className="nv-lnk">
              About
            </Nav.Link>
            <Nav.Link href="#" className="nv-lnk">
              Contact Us
            </Nav.Link>
          </Nav> */}
          <Nav className="ms-auto">
            <Button
              className="nv-lnk  hvr-mbl-btn dropdownbtn d-none d-lg-block d-md-block d-sm-none"
              id="collapsible-nav-dropdown"
              onClick={login}
            >
              Login
            </Button>
            <Button
              className="nv-lnk  d-block d-lg-none d-md-none d-sm-block"
              id="collapsible-nav-dropdown"
              onClick={login}
            >
              Login
            </Button>
            {/* <NavDropdown title="Login" className='nv-lnk  hvr-mbl-btn dropdownbtn d-none d-lg-block d-md-block d-sm-none' id="collapsible-nav-dropdown"> 
                             <NavDropdown.Item href="/" className='drop_item' onClick={redirect}> 
                                Redirect 
                            </NavDropdown.Item> 
                            <NavDropdown.Item href="/" className='drop_item'onClick={manage}> 
                                Manage 
                            </NavDropdown.Item> 
                            <NavDropdown.Item href="/" className='drop_item' style={{border:"none"}} onClick={sip}> 
                                SIP 
                            </NavDropdown.Item>  
                        </NavDropdown>  */}

            {/* <NavDropdown title="Login" className='nv-lnk  d-block d-lg-none d-md-none d-sm-block' id="collapsible-nav-dropdown"> 
                             <NavDropdown.Item href="/" className='drop_item' onClick={redirect}> 
                                Redirect 
                            </NavDropdown.Item> 
                            <NavDropdown.Item href="/" className='drop_item' onClick={manage}> 
                                Manage 
                            </NavDropdown.Item> 
                            <NavDropdown.Item href="/" className='drop_item' style={{border:"none"}} onClick={sip}> 
                                SIP 
                            </NavDropdown.Item>  
                        </NavDropdown>  */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;

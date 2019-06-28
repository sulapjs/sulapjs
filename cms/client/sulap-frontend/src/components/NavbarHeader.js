import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';

function NavbarHeader(props) {
    return (
        <>
            <Navbar bg="light" expand="lg" className='shadow-sm'>
                <Container>
                    <Navbar.Brand href=""><b>SULAP</b><span style={{ color:'#00b894'}}>-JS</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Link to="/login"> <Button variant="light" className='mr-2'>LOGIN</Button> </Link>
                            <Link to="/register"> <Button variant="light">REGISTER</Button> </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
export default NavbarHeader
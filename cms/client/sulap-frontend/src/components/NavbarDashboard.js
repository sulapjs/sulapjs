import React from 'react';
import { Navbar, Nav, Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'

function NavbarHeader(props) {
    return (
        <>
            <Container fluid>
                <Row className='shadow-sm'>
                    <Col lg={2} style={{ textAlign:'center', background:'#00b894' }} className='d-flex align-items-center justify-content-center'>
                        <div class="LogoDashboard"> <Link to="/dashboard"><h4 style={{  color:'white', verticalAlign:'center', fontWeight:'200', letterSpacing:'2px'}}><b>SULAP</b>-JS</h4> </Link></div>
                    </Col>
                    <Col lg={10}>
                        <Navbar>
                            <Nav className='d-flex align-items-center'>
                                <h5> <b> Helloo, </b> { localStorage.getItem('name') } </h5>
                            </Nav>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ml-auto">
                                    <Link to='/'> <Button variant="light" className='mr-2'>LOGOUT</Button> </Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default NavbarHeader
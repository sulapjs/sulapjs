import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Row, Col, Container } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import axios from '../api/database'

function NavbarHeader(props) {

    const [ decode, setDecode ] = useState(null)

    useEffect(() => {
        axios.get('/user/decode', { headers: { token:localStorage.getItem('token')}})
        .then(({data}) => {
            setDecode(data.decoded)
        })
        .catch(err=> {
            console.log(err)
        })
    }, [])

    function logout(e){
        e.preventDefault()
        localStorage.clear()
        props.history.push('/')
    }

    return (
        <>
            <Container fluid>
                <Row className='shadow-sm'>
                    <Col lg={2} style={{ textAlign:'center', background:'#00b894' }} className='d-flex align-items-center justify-content-center'>
                        <div className="LogoDashboard"> <Link to="/dashboard"><h4 style={{  color:'white', verticalAlign:'center', fontWeight:'200', letterSpacing:'2px'}}><b>SULAP</b>-JS</h4> </Link></div>
                    </Col>
                    <Col lg={10}>
                        <Navbar>
                            <Nav className='d-flex align-items-center'>
                                <h5> <b> Helloo, </b> { decode ? decode.name : null } </h5>
                            </Nav>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ml-auto">
                                    <Button variant="light" className='mr-2' onClick={ logout }>LOGOUT</Button>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default  withRouter(NavbarHeader)
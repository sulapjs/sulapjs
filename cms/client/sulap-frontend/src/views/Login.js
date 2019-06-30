import React, { useState } from 'react';
import axios from '../api/database'
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const styles= {
    headerForm : {
        paddingRight:'20px', paddingBottom: '20px', paddingTop:'20px', textAlign:'center'
    },
    fontHeader: {
        fontWeight:'200', letterSpacing:'2px'
    },
    formGroup: {
        backgroundColor:'white', borderRadius:'15px', padding:'40px'
    }
}

export default function Login(props) {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    function submitLogin(e){
        e.preventDefault()
        
        axios.post('/login', { email, password })
        .then(({ data }) => {
            localStorage.setItem('name', data.name)
            localStorage.setItem('token', data.token)
            props.history.push('/dashboard')
        })
        .catch(err => {
            console.log(err.response.data.message)
        })
    }

    return (
        <>
        <Container style={{ marginTop:'5%' }}>
            <Row className='justify-content-center'>
                <Col lg={6}>
                    <div  style={ styles.headerForm }>
                       <Link to='/'><h3 style={ styles.fontHeader }> SULAP-JS <b>LOGIN</b> </h3></Link>
                    </div>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col lg={6}>
                    <div className='border shadow-sm' style={styles.formGroup}>
                        <Form onSubmit={ submitLogin }>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={ email } onChange={(e) => setEmail(e.target.value)}/>
                                <Form.Text className="text-muted" >
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={ password } onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                            
                            <Row>
                                <Col lg={4}>
                                <Button block variant="primary" type="submit" className='shadow-sm'>
                                    Login
                                </Button>
                                </Col>
                                <Col lg={8} className='d-flex justify-content-center align-items-center'>
                                    <Link to='/register'> 
                                        <Form.Text className="text-muted" >
                                            don't have an account ?
                                        </Form.Text>
                                    </Link>
                                </Col>
                            </Row>
                            
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
        </>
    )
}

import React,{ useState } from 'react'
import { Container, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import axios from '../api/database'
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

export default function Register(props) {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ name, setName ] = useState('')
    const [ cekPass, setCekPass ] = useState(false)

    function submitRegister(e) {
        e.preventDefault()
        if(password !== confirmPassword){
            setCekPass(true)
        } else {
            setCekPass(false)
            axios.post('/register', { email, password, name })
            .then(data => {
                console.log('hehehehe')
            })
            .catch(err =>{
                console.log(err.message)
            })
        }
    }

    return (
        <>
        <Container style={{ marginTop:'5%' }}>
            <Row className='justify-content-center'>
                <Col lg={6}>
                    <div  style={ styles.headerForm }>
                    <Link to='/'><h3 style={ styles.fontHeader }> SULAP-JS <b>REGISTER</b> </h3></Link>
                    </div>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col lg={6}>
                    <div className='border shadow-sm' style={styles.formGroup}>
                        <Form onSubmit={ submitRegister }>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={ email } onChange={ (e) => setEmail(e.target.value) }/>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Username" value={ name } onChange={ (e) => setName(e.target.value) }/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={ password } onChange={ (e) => setPassword(e.target.value) }/>
                            </Form.Group>

                            <Form.Group controlId="formBasicConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" value={ confirmPassword } onChange={ (e) => setConfirmPassword(e.target.value) }/>
                            </Form.Group>
                            
                            <Row>
                                <Col lg={4}>
                                <Button block variant="primary" type="submit" className='shadow-sm'>
                                    Register
                                </Button>
                                </Col>
                                <Col lg={8} className='d-flex justify-content-center align-items-center'>
                                    <Link to='/login'> 
                                        <Form.Text className="text-muted" >
                                            have an account ?
                                        </Form.Text>
                                    </Link>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Col>
            </Row>

            { cekPass ?
                <Alert variant="danger">  Password didn't match !!! </Alert> : null
            }
        </Container>
        </>
    )
}

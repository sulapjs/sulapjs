import React,{ useState, useEffect } from 'react'
import { Container, Button, Form, Row, Col, Alert } from 'react-bootstrap';

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
    const [ cekPass, setCekPass ] = useState(false)

    function submitRegister(e) {
        e.preventDefault()
        if(password !== confirmPassword){
            setCekPass(true)
        } else {
            setCekPass(false)
        }
    }

    return (
        <>
        <Container style={{ marginTop:'5%' }}>
            <Row className='justify-content-center'>
                <Col lg={6}>
                    <div  style={ styles.headerForm }>
                       <h3 style={ styles.fontHeader }> SULAP-JS <b>REGISTER</b> </h3>
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
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={ password } onChange={ (e) => setPassword(e.target.value) }/>
                            </Form.Group>

                            <Form.Group controlId="formBasicConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" value={ confirmPassword } onChange={ (e) => setConfirmPassword(e.target.value) }/>
                            </Form.Group>
                            
                            <Button variant="primary" type="submit" className='shadow-sm'>
                                Submit
                            </Button>
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

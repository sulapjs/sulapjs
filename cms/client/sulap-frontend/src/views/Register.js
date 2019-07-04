import React,{ useState } from 'react'
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import axios from '../api/database'
import { Link } from 'react-router-dom';
import Toast from '../components/ToastComponent';

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
    const [ text, setText ] = useState('')
    const [ status, setStatus ] = useState(false)
    const [ showToast, setShowToast ] = useState(false) 

    function submitRegister(e) {
        e.preventDefault()
        if(password !== confirmPassword){
            setText(`Password didn't match !!!`)
            setStatus(false)
        } else {
            axios.post('/register', { email, password, name })
            .then(() => {
                setText(`Register Success, let's login !!!`)
                setStatus(true)
                setEmail('')
                setConfirmPassword('')
                setPassword('')
                setName('')
                setShowToast(true)
                setTimeout(function(){
                    props.history.push('/login')
                }, 1500)
            })
            .catch(err =>{
                setText(err.response.data.message)
                setStatus(false)
                setShowToast(true)
            })
        }
    }

    return (
        <>
        <Toast status={ status } text={text} show={ showToast } set={ setShowToast }/>
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
                                <Col lg={2} style={{ padding:0 }}>
                                    <Link to='/'>
                                        <Button block variant='secondary'> <i className="fas fa-home"></i> </Button>
                                    </Link>
                                </Col>
                                <Col lg={6} className='d-flex justify-content-center align-items-center'>
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
        </Container>
        </>
    )
}

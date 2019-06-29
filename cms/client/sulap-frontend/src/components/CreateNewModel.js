import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function CreateNewModel(props) {
    
    const [model, setModel] = useState([{}])

    function addMore(){
        setModel([...model, {}])
    }

    function cancelAdd(e, index){
        e.preventDefault()
        let newArr = model.filter( (el,i) => {
            return i !== index
        })
        setModel(newArr)
    }

    return (
        <>  
           <div style={{ padding:'30px' }}>
            <h3> <span style={{ color:'grey' }}>#</span> Add Model </h3>
            <div className='border shadow-sm mt-3' style={{ borderRadius:'5px', padding:'15px 20px' }}>
                { model.map( (el, index) => {
                    return <Row style={{ paddingTop:'15px' }}>
                        <Col lg={5}>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Enter Key Model" />
                            </Form.Group>
                        </Col>
                        <Col lg={3}>
                            <Form.Group>
                                <Form.Control as="select">
                                    <option>Text</option>
                                    <option>Text Area</option>
                                    <option>Number</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col lg={4}>
                            <Row>
                                {  model.length !== 1 ? 
                                     <Col>
                                        <Button block className='shadow-sm' variant="outline-secondary" disabled={ model.length === 1 } onClick={ (e) => cancelAdd(e, index) }> Cancel </Button>
                                    </Col>
                                    : null
                                }
                               
                                {  model.length === index +1 ? 
                                    <Col>
                                        <Button block className='shadow-sm' variant="outline-primary" onClick={ addMore }> Add More </Button>
                                    </Col>
                                    : null
                                }
                            </Row>
                            
                        </Col>
                    </Row>
                }) }
            </div>
            <div className='mt-3'>
                 <Row>
                    <Col className='d-flex justify-content-end'>
                        <Button className='shadow-sm'> Submit New Model </Button>
                    </Col>
                </Row>
            </div>
        </div>
        </>
    );
}
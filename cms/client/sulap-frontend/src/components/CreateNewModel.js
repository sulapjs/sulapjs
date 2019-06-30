import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function CreateNewModel(props) {
    
    const [ model, setModel ] = useState([])
    const [ keyModel, setKeyModel ] = useState('')
    const [ dataType, setDataType ] = useState('Text')

    function addMore(e){
        e.preventDefault()

        let found = model.find(function(element) {
            return element.key === keyModel;
        });
        
        if(keyModel && dataType && !found){
            let modelObj = { key : keyModel, datatype : dataType }
            setModel([...model, modelObj])
            setKeyModel('')
            setDataType('Text')
        }
    }

    function cancelAdd(e, indexEl){
        e.preventDefault()
        
        let newArr = model
        newArr = newArr.filter( el => {
            return el.key !== indexEl
        })
        setModel(newArr)

    }

    return (
        <>  
           <div style={{ padding:'30px' }}>
            <h3> <span style={{ color:'grey' }}>#</span> Add Model </h3>
            { model.length !== 0 && <div className='border shadow-sm mt-3' style={{ borderRadius:'5px', padding:'15px 20px' }}>
                { model.map( (el, index) => {
                    return <Row style={{ paddingTop:'15px' }} key={ index }>
                        <Col lg={5}>
                            <h4> { el.key } </h4>
                        </Col>
                        <Col lg={3}>
                            <h4> { el.datatype } </h4>
                        </Col>
                        <Col lg={4}>
                            <Row>
                                <Col>
                                    <Button block className='shadow-sm' variant="outline-secondary" onClick={ (e) => cancelAdd(e, el.key) }> Cancel </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                }) }
                </div>    
            }
            <div className='border shadow-sm mt-3' style={{ borderRadius:'5px', padding:'15px 20px' }}>
                 <Form onSubmit={ addMore }>
                    <Row style={{ paddingTop:'15px'}}>
                        <Col>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Enter Key Model" value={keyModel} onChange={ (e) => setKeyModel(e.target.value) }/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control as="select"  value={ dataType } onChange={ (e) => setDataType(e.target.value) }>
                                    <option>Text</option>
                                    <option>Text Area</option>
                                    <option>Number</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Button block className='shadow-sm' variant="outline-primary" type='submit'> Add </Button>
                        </Col>
                    </Row>
                </Form>
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
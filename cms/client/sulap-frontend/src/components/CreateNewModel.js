import React, { useState } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import Toast from '../components/ToastComponent'
import { stat } from 'fs';

export default function CreateNewModel(props) {
    
    const [ model, setModel ] = useState([])
    const [ keyModel, setKeyModel ] = useState('')
    const [ dataType, setDataType ] = useState('Text')

    const [ text, setText ] = useState('')
    const [ status, setStatus ] = useState(false)
    const [ showToast, setShowToast ] = useState(false) 

    function addMore(e){
        e.preventDefault()

        let found = model.find(function(element) {
            return element.key === keyModel;
        });
        
        if(keyModel && dataType && !found){
            let modelObj = { key : keyModel, datatype : dataType }
            setModel([...model, modelObj])
            setKeyModel('')
            setDataType(dataType)
            setText('add success')
            setShowToast(true)
            setStatus(true)
        } else {
            setText('already added')
            setShowToast(true)
            setStatus(false)
        }
    }

    function cancelAdd(e, keyEl){
        e.preventDefault()
        
        let newArr = model
        newArr = newArr.filter( el => {
            return el.key !== keyEl
        })
        setModel(newArr)
    }

    return (
        <>  
            <Toast show={ showToast } text={text} status={ status } set={ setShowToast }/>
           <div style={{ padding:'30px' }}>
            <h3> <span style={{ color:'grey' }}>#</span> Add Model </h3>
            { model.length !== 0 && <div className='border shadow-sm mt-3' style={{ borderRadius:'5px', padding:'15px 20px' }}>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Key Name</th>
                            <th>Data Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { model.map((el, index)=> {
                            return <tr key={ index }>
                                <td>{ index+1 }</td>
                                <td>{ el.key}</td>
                                <td>{ el.datatype }</td>
                                <td><Button variant='danger' block onClick={ (e) => cancelAdd(e, el.key) }> cancel add </Button></td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                <div className='mt-3'>
                    <Row>
                        <Col className='d-flex justify-content-end'>
                            <Button className='shadow-sm' block> <i className="fas fa-plus"></i> Submit New Model </Button>
                        </Col>
                    </Row>
                </div>
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
                                    <option>String</option>
                                    <option>Boolean</option>
                                    <option>Float</option>
                                    <option>Image</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Button block className='shadow-sm' variant="outline-primary" type='submit'> Add </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
        </>
    );
}
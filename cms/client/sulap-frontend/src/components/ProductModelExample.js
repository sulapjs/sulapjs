import React, { useState } from 'react';
import { Container, Table, Button, Row, Col, Modal, Form } from 'react-bootstrap'
import RowTable from './RowTableNewModel';

function NewModel(props) {

    const [ showModal, setShowModal ] = useState(false)
    const [ rowTable, setRowTable ] = useState([])
    const headerTable = ['Name', 'Price', 'Description'] // dari argv model create

    // ini menyesuaikan
    const [ name, setName ] = useState(null)
    const [ price, setPrice ] = useState(null)
    const [ description, setDescription ] = useState(null)
    
    const funcLoop = [ setName, setPrice, setDescription ]
    const stateObj = { name, price, description }

    function submitForm(e){
        e.preventDefault()
        let tempRow = [ ...rowTable, stateObj ]
        setRowTable(tempRow)
        funcLoop.map( func => {
            func(null)
        })
        handleClose()
    }

    function handleClose() {
        setShowModal(false);
    }
    
    function handleShow() {
        setShowModal(true);
    }

    return (
        <>
            <Container fluid>
                <div style={{ padding:'30px' }}>
                    <Row>
                        <Col>
                            <h3> <span style={{ color:'grey' }}>#</span> Product </h3>
                        </Col>
                        <Col className='d-flex justify-content-end'>
                            <Button variant='outline-primary' onClick={ handleShow }> Add New Product </Button>
                        </Col>
                    </Row>
               
                    <div className='shadow-sm mt-3'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    { headerTable.map( el =>{
                                        return <th> {el} </th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                { rowTable.map( (row, index) => {
                                    return <RowTable value={ row } index={index} key={ index }/>
                                }) }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Container>

        <Form >
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add //model-name </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{ name}{price}{description }</p>
                    { headerTable.map( (el, index) => {
                        return  <Form.Group>
                            <Form.Control type="text" placeholder={`Enter ${ el }`} onChange={ e => funcLoop[index]( e.target.value)}/>
                        </Form.Group>
                    }) }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={ submitForm }>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>                                 
        </Form>               
        </>
    );
}

export default NewModel
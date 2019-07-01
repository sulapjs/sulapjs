import React, { useState } from 'react';
import { Container, Table, Button, Row, Col, Modal, Form } from 'react-bootstrap'
import RowTable from './RowTableNewModel';

function NewModel(props) {

    const [ showModal, setShowModal ] = useState(false)
    const [ rowTable, setRowTable ] = useState([])
    const headerTable = ['Name', 'Price', 'Description'] 

    
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

    function submitSearch(e) {
        e.preventDefault()

        console.log('hahahha')
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
                            <Button variant='outline-primary' onClick={ handleShow }> <i className="fas fa-plus"></i> Add New </Button>
                        </Col>
                    </Row>
                    
                    <Form className='ml-3'>
                        <Row className='mt-3'>
                            <Col lg={3} style={{ padding:0 }}>
                                <Form.Group className='shadow-sm'>
                                    <Form.Control type="text" placeholder="Search..." />
                                </Form.Group>
                            </Col>
                            <Col lg={1}>
                                <Form.Group>
                                    <Button onClick={ submitSearch } className='shadow-sm'> <i className="fas fa-search"></i> </Button>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
               
                    <div className='shadow-sm mt-2'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    { headerTable.map((el, index) =>{
                                        return <th key={ index }> {el} </th>
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
                    { headerTable.map( (el, index) => {
                        return  <Form.Group key={ index }>
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
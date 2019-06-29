import React, { useState } from 'react';
import { Container, Table, Button, Row, Col, Modal, Form } from 'react-bootstrap'
import RowTable from './RowTableNewModel';

function NewModel(props) {

    const [ showModal, setShowModal ] = useState(false)
    const headerTable = ['Nama', 'Price', 'Description']
    const rowTable = [{ name:'nasi', price:'10.000', description:'enak' }, { name:'pisang', price:'10.000', description:'enak  sekali' }]

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
               
                <p> product description</p>
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

        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
             </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Enter Product Name" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="text" placeholder="Enter Product Price" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="text" placeholder="Enter Product Description" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>                                 
        </>
    );
}

export default NewModel
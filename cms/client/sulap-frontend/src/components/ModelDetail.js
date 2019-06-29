import React from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';

function ModelDetail(props) {
    return (
        <div style={{ padding:'30px' }}>
            <h3> <span style={{ color:'grey' }}>#</span> Model Product </h3>
            <div className='border shadow-sm mt-3' style={{ borderRadius:'5px', padding:'15px 20px' }}>
                <Row style={{ padding:'0px 5px' }}>
                    <Col>
                        <h5> <b>3 fields</b> </h5>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Button variant='outline-primary' size='sm'> add field </Button>
                    </Col>
                </Row>
            
            </div>
            <div className='shadow-sm mt-3'>
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
                        <tr>
                        <td>1</td>
                        <td>Title</td>
                        <td>Description</td>
                        <td>Price</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>String</td>
                        <td>String</td>
                        <td>Number</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ModelDetail
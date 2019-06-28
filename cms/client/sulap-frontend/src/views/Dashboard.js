import React from 'react';
import NavbarDashboard from '../components/NavbarDashboard';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import NewModel from '../components/NewModel';

function Dashboard(props) {
    return (
        <>
            <NavbarDashboard />
            <Container fluid style={{ height:'90vh' }}>
                <Row style={{ height:'100%' }}>
                    <Col lg={2} style={{ height:'100%', textAlign:'center',padding:'0px', backgroundColor:'#ededed' }} className='shadow-sm'>
                        <div style={{ marginTop:'10px' }}>
                            <p style={{ margin:'0px', textAlign:'left', padding:'0px 15px', letterSpacing:'1px' }}> <b>content management</b> </p>
                        </div>
                        <div className='d-flex justify-content-center' style={{ textAlign:'center', paddingTop:'10px', paddingLeft:'15px', paddingRight:'15px' }}>
                            <Button block variant="light" className='shadow-sm'>  Create New Model </Button>
                        </div>
                        <div className='d-flex justify-content-center' style={{ textAlign:'center', paddingTop:'10px', paddingLeft:'15px', paddingRight:'15px' }}>
                            <Button block variant="light" className='shadow-sm'>  Create New Model </Button>
                        </div>
                        <div style={{ marginTop:'10px', padding:'0px 15px' }}>
                            <p style={{ margin:'0px',  textAlign:'left', letterSpacing:'1px' }}> <b> content management</b> </p>
                        </div>
                        <div className='d-flex justify-content-center' style={{ textAlign:'center', paddingTop:'10px', paddingLeft:'15px', paddingRight:'15px' }}>
                            <Button block variant="light" className='shadow-sm'>  Create New Model </Button>
                        </div>
                    </Col>
                    <Col lg={10}>
                        <Container fluid>
                            <div style={{ padding:'30px' }}>
                                <h3> <span style={{ color:'grey' }}>#</span> Add New Model </h3>
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
                        </Container>
                        <NewModel />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Dashboard;
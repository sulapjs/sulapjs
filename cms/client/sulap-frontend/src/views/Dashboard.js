import React from 'react';
import NavbarDashboard from '../components/NavbarDashboard';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import NewModel from '../components/NewModel';
import ModelDetail from '../components/ModelDetail';
import CreateNewModel from '../components/CreateNewModel';

function Dashboard(props) {
    return (
        <>
            <NavbarDashboard className='fixed-top'/>
            <Container fluid style={{ position:'absolute', height:'100vh' }}>
                <Row style={{ height:'100%' }}>
                    <Col lg={2} style={{ height:'100%', textAlign:'center',padding:'0px', backgroundColor:'#ededed', overflow:'scroll' }} className='shadow-sm'>
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
                    <Col lg={10}  style={{ overflow:'scroll' }}>
                        <Container fluid style={{ height:'100vh' }}>
                            <ModelDetail />
                            <NewModel />
                            <CreateNewModel />
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Dashboard;
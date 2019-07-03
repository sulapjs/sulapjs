import React from 'react';
import { Modal, Button } from 'react-bootstrap'

function ImageModal(props) {
    return (
        <>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <img src={ props.title }  width='100%' />
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={(e) => props.onHide(false)}>Close</Button>
            </Modal.Footer>
        </Modal>  
        </>
    );
}

export default ImageModal
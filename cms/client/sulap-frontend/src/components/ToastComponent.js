import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';

function ToastComponent(props) {

    useEffect(() => {
        if(props.text){
            setShow(true)
        }
    }, [props])

    const [ show, setShow ] = useState(false)

    return (
        <>
          <Toast show={show} delay={2000} autohide 
            style={{ 
                position:'absolute', 
                right:30, bottom: 30,
                backgroundColor: (props.status === false ? '#e74c3c' : '#27ae60')
            }}>
            <Toast.Body>
                <p style={{ fontSize:'20px', fontWeight:'600', color: 'white' }}> { props.text }  </p>
            </Toast.Body>
          </Toast>
        </>
    );
}

export default ToastComponent
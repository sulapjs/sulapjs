import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';

function ToastComponent(props) {

    useEffect(() => {
        if(props.show){
            setShow(true)
        }
    }, [props.show])

    function hideShow(){
        setShow(false)
        props.set(false)
    }

    const [ show, setShow ] = useState(false)

    return (
        <>
          <Toast show={show} delay={3000} autohide onClose={ hideShow }
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
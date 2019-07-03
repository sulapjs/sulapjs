import React, { useState, useEffect } from 'react';
import Toast from './ToastComponent';
import ChartComponent from './ChartComponent';
import axios from '../api/database';

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ', ' + g + ', ' + b + ', 0.8)';
}

function DashboardHome(props) {

    const [ dataChart, setDataChart ] = useState([])
    const [ backgroundChart, setBackgroundChart ] = useState([])
    const [ labels, setLabels ] = useState([])

    //toast
    const [ text, setText ] = useState('')
    const [ status, setStatus ] = useState(false)
    const [ showToast, setShowToast ] = useState(false) 
        
    useEffect(() => { 
        Promise.all([ /*add-axios-function*/])
        .then((data) => {
            let tempLabels = []
            let tempDataChart = []
            let tempBackground = []
            data.forEach( item => {
                tempDataChart.push(item.data[Object.keys(item.data)[0]].length)
                tempLabels.push(Object.keys(item.data)[0])
                tempBackground.push(randomColor())
            })
            setLabels(tempLabels)
            setBackgroundChart(tempBackground)
            setDataChart(tempDataChart)
        })
        .catch(err => {
            setText(err.response.data.message)
            setStatus(false)
            setShowToast(true)
        })
    }, [])

    return (
        <>
        <Toast text={text} status={ status } show={ showToast} set={ setShowToast }/>
        <div style={{ padding:'50px 20px' }}>
            <div className='shadow-sm border p-5' style={{ borderRadius: '20px'}}>
                <h3> Model <b>Data</b> </h3>
                { dataChart.length === 0 ?
                    <div className='d-flex justify-content-center align-items-center'>
                        <h1> No data yet </h1>
                    </div>
                    :
                    <div>
                        <ChartComponent backgroundChart={ backgroundChart } labels={ labels } dataChart={ dataChart } />
                    </div>
                }
            </div>
        </div>
        </>
    );
}

export default DashboardHome
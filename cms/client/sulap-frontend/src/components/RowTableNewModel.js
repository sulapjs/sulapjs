import React from 'react'
import { Button } from 'react-bootstrap';
import moment from 'moment';

export default function RowTableNewModel(props) {

    let { value, index, key_model } = props

    key_model = key_model.map( el=> {
        return el.toLowerCase()
    })

    return (
        <>
        <tr>
            <td>{ index+1 }</td>
            { Object.keys(value).map( (el, elIndex) => {
                return ( el ==='updated' || el ==='created' || el ==='_id' || key_model.includes(el) ? <td key={ elIndex }>{ 
                    el ==='created' || el === 'updated' ?  moment(value[el]).format('MMMM Do YYYY, h:mm:ss a') : value[el]  
                }</td> : null  )
            })}
            <td colSpan={2}> <Button size='sm' onClick={(e) => props.edit(value)}><i className="fas fa-edit"></i></Button> <Button size='sm' onClick={(e) => props.delete(value._id)}><i className="fas fa-trash"></i></Button> </td>
        </tr>  
        </>
    )
}

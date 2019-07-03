import React from 'react'
import { Button, Image } from 'react-bootstrap';
import moment from 'moment';
import { server } from '../api/database'

export default function RowTableNewModel(props) {

    let { value, index, key_model, type } = props
    key_model = key_model.map( el=> {
        return el.toLowerCase()
    })

    function showModalImage(e, el){
        e.preventDefault()
        props.showImage(true)
        props.imageLink(`${server}/uploads/${value[el]}`) 
    }

    return (
        <>
        <tr>
            <td>{ index+1 }</td>
            { Object.keys(value).map( (el, elIndex) => {
                return ( el ==='updated' || el ==='created' || el ==='_id' || key_model.includes(el) ? 
                    <td  align='center' key={ elIndex }> 
                        { el ==='created' || el === 'updated' ?  moment(value[el]).format('MMMM Do YYYY, h:mm:ss a') 
                        : ( type[el] && type[el].toLowerCase() === 'image' && value[el] ?
                        <Image width="50px" height='50px'src={ `${server}/uploads/${value[el]}`} 
                            roundedCircle 
                            style={{ cursor:'pointer' }}
                            onClick={(e) => showModalImage(e, el) }/> 
                        : value[el]
                    )  
                } </td> : null  )
            })}
            <td colSpan={2}> <Button size='sm' onClick={(e) => props.edit(value)}><i className="fas fa-edit"></i></Button> <Button size='sm' onClick={(e) => props.delete(value._id)}><i className="fas fa-trash"></i></Button> </td>
        </tr>  
        </>
    )
}

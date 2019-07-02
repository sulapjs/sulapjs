import React from 'react'

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
                return ( el == 'updated' || el == 'created' || el =='_id' || key_model.includes(el) ? <td key={ elIndex }>{ value[el] }</td> : null  )
            })}
        </tr>  
        </>
    )
}

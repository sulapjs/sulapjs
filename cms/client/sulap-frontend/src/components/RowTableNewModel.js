import React from 'react'

export default function RowTableNewModel(props) {

    const { value, index } = props

    return (
        <>
          <tr>
                <td>{ index+1 }</td>
                <td>{ value.name }</td>
                <td>{ value.price }</td>
                <td>{ value.description }</td>
            </tr>  
        </>
    )
}

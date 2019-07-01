import React from 'react'

export default function RowTableNewModel(props) {

    const { value, index } = props

    return (
        <>
        <tr>
            <td>{ index+1 }</td>
            { Object.keys(value).map( (el, elIndex) => {
                return <td key={ elIndex }>{ value[el] }</td>
            })}
        </tr>  
        </>
    )
}

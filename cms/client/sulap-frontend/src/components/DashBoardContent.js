import React from 'react'
import { withRouter } from 'react-router-dom';
//new-component

function DashBoardContent(props) {
    const linkPath = props.match.params.id

    if(linkPath === '') {
        return ( null)
     }  //add-new-route
     else {
         return null
     }
}

export default withRouter(DashBoardContent)


import React from 'react'
import { withRouter } from 'react-router-dom';
import CreateNewModel from './CreateNewModel';
//new-component

function DashBoardContent(props) {

    const linkPath = props.match.params.id

    if(linkPath === 'create-new-model') {
        return (
            <>
                <CreateNewModel />
            </>
        )
     }  //add-new-route
     else {
         return null
     }
}

export default withRouter(DashBoardContent)


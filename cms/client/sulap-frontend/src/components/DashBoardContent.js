import React from 'react'
import { withRouter } from 'react-router-dom';
import CreateNewModel from './CreateNewModel';
import ProductModul from './ProductModelExample';
import ProductModelDetail from './ModelDetail';
//new-component

function DashBoardContent(props) {

    const linkPath = props.match.params.id

    if(linkPath === 'create-new-model') {
        return (
            <>
                <CreateNewModel />
            </>
        )
     } else if(linkPath === 'product') {
        return (
            <>
                <ProductModul />
            </>
        )
     } else if(linkPath === 'product-detail') {
        return (
            <>
                <ProductModelDetail />
            </>
        )
     } //add-new-route
     else {
         return null
     }
}

export default withRouter(DashBoardContent)


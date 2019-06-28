import React from 'react'


const styles = {
    containerHomePage: {
        justifyContent:'center', alignItems:'center', padding:'30px'
    },
    homePageSulap: {
        fontSize:'20vh', letterSpacing:'30px', fontWeight:'200'
    },
    homePageSulapInfo: {
        letterSpacing:'2px', fontSize:'30px', color:'grey', fontWeight:'200'
    }
}

export default function Homepage() {
    return (
        <div style={styles.containerHomePage}>
            <p style={styles.homePageSulap}> <b>SULAP</b><span style={{ color:'#00b894'}}>-JS</span></p>
            <p style={styles.homePageSulapInfo}> 
                package for create <b> cms </b><br/>
                npm install -g <b>sulap</b>
            </p> 
        </div>
    )
}

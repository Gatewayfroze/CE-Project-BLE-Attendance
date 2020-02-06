import React, { useState, useEffect } from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import DataTable from '../Components/DataTable'
// import component 
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import Alert from '../Components/Alert'
const layout = (props) => {
    return (
        <div class='Page'>
            <Navbar />
            <div className='section'>
                <div class='columns'>
                    <Sidebar />
                    <main className='column main'>
                        <div class='column' >
                            <div style={styles.container}>
                                {props.children}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
const styles = {
    container: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '60%'
    }
}
export default layout
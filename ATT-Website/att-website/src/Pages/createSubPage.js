import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components/dist';

// import component 
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

const CreateSubPage = props => {
    return (
        <div class='page'>
            <Navbar />
            <div class='columns'>
                <Sidebar />
                <div class='column' >
                    <div style={styles.container}>
                        <div class='box'>
                            <p>เลือกวิชาที่ต้องการลงทะเบียนในนักศึกษา</p>
                            <input class='input' placeholder='รหัสวิชา,ชื่อวิชา'></input>

                        </div>
                    </div>
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
export default CreateSubPage 
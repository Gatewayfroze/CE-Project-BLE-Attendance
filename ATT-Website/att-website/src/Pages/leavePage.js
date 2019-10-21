import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components/dist';

// import component 
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

const LeavePage =props=>{
    return (
        <div class='page'>
        <Navbar />
        <div class='columns'>
            <Sidebar />
            <div class='column' >
                <div style={styles.container}>
                    <div class='box'>
                        <h1>พิมพ์เพื่อค้นหารายวิชา</h1>
                        <div class="field is-grouped">
                            <input class='input is-primary' placeholder='รหัส,ชื่อวิชา' />
                            <Button>Search</Button>
                        </div>
                        <table class='table'>
                            <thead>
                                <tr>
                                    <th>title</th>
                                    <th>author</th>
                                    <th>Subject</th>
                                    <th>detail</th>
                                    <th>Accept</th>
                                    <th>Decline</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>232423</td>
                                    <td>Nitinon</td>
                                    <td>HCI</td>
                                    <td><Button class='button is-link'>View</Button></td>
                                    <td><Button class='button is-success'>Accept</Button></td>
                                    <td><Button class='button is-danger'>Delete</Button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class='box'>
                        graph ข้อมูลต่างๆนานา
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

export default LeavePage
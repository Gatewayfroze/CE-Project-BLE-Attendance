import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components/dist';

// import component 
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

const Enrollpage = () => {
    return (
        <div class='page'>
            <Navbar />
            <div class='columns'>
                <Sidebar />
                <div class='column' >
                    <div style={styles.container}>
                        <div class='box'>
                            <h1>พิมพ์เพื่อค้นหารายนักศึกษา</h1>
                            <div class="field is-grouped">
                                <input class='input is-primary' placeholder='รหัส,ชื่อนามสกุลนักศึกษา' />
                                <Button>Search</Button>
                            </div>
                            <table class='table'>
                                <thead>
                                    <tr>
                                        <th>student_id</th>
                                        <th>Name-Surname</th>
                                        <th>detail</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>59010734</td>
                                        <td>นิตินนท์ เพ็งเลา</td>
                                        <td><Button class='button is-warning'>View</Button></td>
                                        <td><Button class='button is-link'>View</Button></td>
                                        <td><Button class='button is-danger'>Delete</Button></td>
                                    </tr>
                                </tbody>
                            </table>


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
export default Enrollpage
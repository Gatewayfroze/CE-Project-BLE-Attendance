import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components/dist';

// import component 
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

const Enrollpage = () => {
    return (
        <div class='Page'>
            <Navbar />
            <div className='section'>
                <div class='columns'>
                    <Sidebar />
                    <main className='column main'>
                        <div class='column' >
                            <div style={styles.container}>
                                <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>View Account</h1>

                                <div class='box'>
                                    <p>Select Role</p>
                                    <div>
                                        <Button className='is-primary'>Student</Button>
                                        <Button >Teacher</Button>
                                    </div>
                                    <p>Enter Data to search</p>
                                    <div class="field is-grouped">
                                        <input class='input is-primary' placeholder='ID,name' />
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
export default Enrollpage
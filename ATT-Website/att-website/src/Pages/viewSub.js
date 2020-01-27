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
                                <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>View Subject</h1>
                                <div class='box'>
                                    <h1>Enter Subject Data</h1>
                                    <div class="field is-grouped">
                                        <input class='input is-primary' placeholder='Subject_id,Subject_Name' />
                                        <div className='control'>
                                            <Button>Search</Button>
                                        </div>
                                    </div>
                                    <table class='table'>
                                        <thead>
                                            <tr>
                                                <th>subject_id</th>
                                                <th>Subject Name</th>
                                                <th>Export Schedule</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>232423</td>
                                                <td>HCI</td>
                                                <td><Button class='button is-warning'>Export</Button></td>
                                                <td><Button class='button is-link'>View</Button></td>
                                                <td><Button class='button is-danger'>Delete</Button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class='box'>
                                    <div className="field">
                                        <label className='label'>Subject Name</label>
                                        <input class='input' value='HCI'></input>
                                    </div>
                                    <div className="field">
                                        <label className='label'>Subject Detail</label>
                                        <textarea class='textarea' value='asdsadsadsd'></textarea>
                                    </div>
                                    <div className="field is-grouped">
                                        <div className='control'>
                                            <label className='label'>Schedule</label>
                                        </div>

                                    </div>
                                    <div className='field is-grouped'>
                                        <div className='control'>
                                            <input className='input' placeholder='date' />
                                        </div>
                                        <div className='control'>
                                            <input className='input' placeholder='start time' />
                                        </div>
                                        <div className='control'>
                                            <input className='input' placeholder='end time' />
                                        </div>
                                        <div className='control'>
                                            <button className='button is-danger'>Delete</button>
                                        </div>
                                    </div>
                                    <div className='field is-grouped'>

                                        <div className='control'>
                                            <input className='input' placeholder='date' />
                                        </div>
                                        <div className='control'>
                                            <input className='input' placeholder='start time' />
                                        </div>
                                        <div className='control'>
                                            <input className='input' placeholder='end time' />
                                        </div>
                                        <div className='control'>
                                            <button className='button is-danger'>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div >
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
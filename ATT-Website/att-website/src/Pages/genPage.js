import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components/dist';

// import component 
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

const GenPage = () => {

    return (
        // <div style={{ height: '100vh', backgroundColor: '#f0fff0' }}>
        <div class='page' style={{ height: '100vh' }}>
            <Navbar />
            <div class='columns'>
                <Sidebar />
                <div class='column' >
                    <div style={styles.container}>
                        <h1>Generate Account Student</h1>
                        <div class='box'>
                            <div class="field is-grouped">
                                <div class='control'>
                                    <div class="file has-name ">
                                        <label class="file-label">
                                            <input class="file-input" type="file" name="resume" />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i class="fas fa-upload"></i>
                                                </span>
                                                <span class="file-label">
                                                    Choose a file…
                                        </span>
                                            </span>
                                            <span class="file-name">
                                                Screen Shot 2017-07-29 at 15.54.25.png
                                </span>
                                        </label>
                                    </div>
                                </div>
                                <div class='control'>
                                    <Button class='button is-primary'>Generate</Button>
                                </div>
                            </div>
                        </div>
                        {/* table */}
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
                        <Button class='button'>Save</Button>
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
export default GenPage
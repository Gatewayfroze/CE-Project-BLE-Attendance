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
                            <p>เลือกวิชาที่ต้องการลงทะเบียนในนักศึกษา</p>
                            <input class='input' placeholder='รหัสวิชา,ชื่อวิชา'></input>
                            <p>upload ข้อมูลของนักศึกษาที่ต้องการลงทะเบียน</p>
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

                            </div>

                        </div>
                        <h1>คุณต้องการลงทะเบียนวิชา .... ให้กันนักศึกษาเหล่านี้ใช่หรือไม่</h1>
                        <table class='table'>
                            <thead>
                                <tr>
                                    <th>student_id</th>
                                    <th>Name-Surname</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>59010734</td>
                                    <td>นิตินนท์ เพ็งเลา</td>
                                    <td><Button class='button is-danger'>Delete</Button></td>
                                </tr>
                            </tbody>
                        </table>
                        <Button class='button'>Enroll</Button>
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
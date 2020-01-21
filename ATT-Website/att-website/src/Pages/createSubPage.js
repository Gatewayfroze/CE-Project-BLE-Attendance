import React, { useState } from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components/dist';
import axios from 'axios'
import API from '../api'

// import component 
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

const CreateSubPage = props => {
    const [countSchedule, setSchedule] = useState(0)
    const [subjectDetail, setSubjectDetail] = useState({
        subjectID: '', subjectName: ''
    })
    const handleChange = (event) => {
        setSubjectDetail({ ...subjectDetail, [event.target.name]: event.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        API.post('createSubject/', subjectDetail)
            .then(function (response) {
                console.log("success")
                resetInput()
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const resetInput = () => {
        setSubjectDetail({ subjectID: '', subjectName: '' })
        console.log('reeee')
    }
    const createTable = () => {
        let table = []
        for (let i = 0; i < countSchedule; i++)
            table.push(
                <div className='field is-grouped'>
                    <div className='control' style={{ width: 150 }}>
                        <input className='input' placeholder='date' />
                    </div>
                    <div className='control' style={{ width: 150 }}>
                        <input className='input' placeholder='start time' />
                    </div>
                    <div className='control' style={{ width: 150 }}>
                        <input className='input' placeholder='end time' />
                    </div>
                    <div className='control' style={{ width: 150 }}>
                        <input className='input' placeholder='MAC Addr' />
                    </div>
                    <div className='control'>
                        <button className='button is-danger'>Delete</button>
                    </div>
                </div>

            )
        return table
    }

    return (
        <div class='page'>
            <Navbar />
            <div class='columns'>
                <Sidebar />
                <div class='column' >
                    <form onSubmit={handleSubmit}>
                        <div style={styles.container}>
                            <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>Create Subject</h1>
                            <div class='box'>
                                <div className="field">
                                    <label className='label'>Subject ID</label>
                                    <input class='input' name='subjectID' value={subjectDetail.subjectID} placeholder='' onChange={handleChange} required></input>
                                </div>
                                <div className="field">
                                    <label className='label'>Subject Name</label>
                                    <input class='input' name='subjectName' value={subjectDetail.subjectName} placeholder='' onChange={handleChange} required></input>
                                </div>
                                <div className="field is-grouped">
                                    <div className='control'>
                                        <label className='label'>Schedule</label>
                                    </div>
                                    <div className='control'>
                                        <button className='button is-primary' onClick={() => setSchedule(countSchedule + 1)}>Add</button>
                                    </div>
                                </div>
                                {createTable()}
                            </div>
                            <button className='button is-primary' type='submit'>Create</button>
                        </div>
                    </form>
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
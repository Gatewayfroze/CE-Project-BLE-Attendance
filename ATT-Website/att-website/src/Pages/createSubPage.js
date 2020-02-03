import React, { useState, useDebugValue, useEffect } from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components/dist';
import axios from 'axios'
import API from '../api'

// import component 
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { Table } from '@material-ui/core';
const CreateSubPage = props => {
    const [countSchedule, setCountSchedule] = useState(0)
    const [subjectDetail, setSubjectDetail] = useState({
        subjectID: '', subjectName: ''
    })
    const [schedule, setSchedule] = useState([])
    const handleChange = (event) => {
        setSubjectDetail({ ...subjectDetail, [event.target.name]: event.target.value })
    }
    const [tableBody, setTableBody] = useState()

    useEffect(() => {
        setTableBody(createTable())
        console.log('yayyy')
    }, [schedule])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit')
        // API.post('createSubject/', subjectDetail)
        //     .then(function (response) {
        //         console.log("success")
        //         resetInput()
        //     })
        //     .catch(function (error) {
        //         console.log(error)
        //     })
    }
    const resetInput = () => {
        setSubjectDetail({ subjectID: '', subjectName: '' })
        console.log('reeee')
    }
    const addSchedule = () => {
        setCountSchedule(countSchedule + 1)
        const period = {
            date: new Date(),
            start: new Date(),
            end: new Date(),
            mac:''
        }
        setSchedule([...schedule, period])
        console.log(schedule)
    }
    const setDate = (date,mode, i) => {
        const temp = schedule
        temp[i][mode] = date
        setSchedule([...temp])
        console.log(schedule)
    }
    const createTable = () => {
        let table = []
        for (let i = 0; i < countSchedule; i++)
            table.push(
                <tr>
                    <td>
                        <p>{i + 1}</p>
                    </td>
                    <td>
                        <div className='control' >
                            <DatePicker className='input' selected={schedule[i].date} onChange={date => setDate(date,'date',i)} maxLength='10' size='10' placeholder='date' />
                        </div>
                    </td>
                    <td>
                        <div className='control' >
                            <DatePicker className='input' selected={schedule[i].start} onChange={date => setDate(date,'start',i)} maxLength='10' size='10'
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa" />
                        </div>
                    </td>
                    <td>
                        <div className='control'>
                            <DatePicker className='input' selected={schedule[i].end} onChange={date => setDate(date,'end',i)} maxLength='10' size='10'
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa" />
                        </div>
                    </td>
                    <td>
                        <div className='control' >
                            <input className='input' maxLength='10' size='10' placeholder='MAC Addr' />
                        </div>
                    </td>
                    <td>
                        <div className='control'>
                            <button className='button is-danger' type='button' onClick={() => console.log("sss")}>Delete</button>
                        </div>
                    </td>
                </tr>
                // </div>

            )
        return table
    }

    return (
        <div class='Page'>
            <Navbar />
            <div className='section'>
                <div class='columns'>
                    <Sidebar />
                    <main className='column main'>
                        <div class='column' >
                            <form onSubmit={()=>handleSubmit}>
                                <div style={styles.container}>
                                    <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>Create Subject</h1>
                                    <div className='box'>
                                        <div className="field">
                                            <label className='label'>Subject ID</label>
                                            <input class='input' name='subjectID' value={subjectDetail.subjectID} placeholder='' onChange={handleChange} ></input>
                                        </div>
                                        <div className="field">
                                            <label className='label'>Subject Name</label>
                                            <input class='input' name='subjectName' value={subjectDetail.subjectName} placeholder='' onChange={handleChange} ></input>
                                        </div>
                                        <div className="field is-grouped">
                                            <div className='control'>
                                                <label className='label'>Schedule</label>
                                            </div>
                                            <div className='control'>
                                                <button className='button is-primary' type='button' onClick={() => addSchedule()}>Add</button>
                                            </div>
                                        </div>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Date</th>
                                                    <th>Start</th>
                                                    <th>End</th>
                                                    <th>MAC Addr.</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableBody}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <button className='button is-primary' type='submit'>Create</button>
                                </div>
                            </form>
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
export default CreateSubPage 
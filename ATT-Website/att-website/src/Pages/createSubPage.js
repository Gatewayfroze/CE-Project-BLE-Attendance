import React, { useState, useDebugValue, useEffect } from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import "react-datepicker/dist/react-datepicker.css";
import app from '../firebase'
// import component 
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import Loader from '../Components/loader'
import DatePicker from 'react-datepicker'
import { Table } from '@material-ui/core';
import MaskedInput from 'react-text-mask'
import NumberFormat from 'react-number-format';
import Layout from '../Layout/layout'
import API from '../api'
const CreateSubPage = props => {
    const [subjectDetail, setSubjectDetail] = useState({
        subjectID: '', subjectName: ''
    })
    const [schedule, setSchedule] = useState([])
    const [tableBody, setTableBody] = useState()
    const [loading, setLoading] = useState(false)
    const [curUser, setcurUser] = useState(null)

    useEffect(() => {
        app.auth().onAuthStateChanged(function (user) {
            if (user) {
                setcurUser(user.uid)
            } else {
            }
        });
    }, [])

    useEffect(() => {
        setTableBody(createTable())
    }, [schedule])

    const handleChange = (event) => {
        setSubjectDetail({ ...subjectDetail, [event.target.name]: event.target.value })
    }
    // hadle submiting data
    const handleSubmit = () => {
        const subjectData = { teacherUID:curUser,...subjectDetail, schedule }
        console.log(subjectData)
        setLoading(true)
        API.post('createSubject/', subjectData)
            .then(function (response) {
                console.log("success")
                resetInput()
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const resetInput = () => {
        setSubjectDetail({ subjectID: '', subjectName: '' })
        setSchedule([])
    }
    // hadle table
    const addSchedule = () => {
        const period = {
            schIndex:0,
            date: new Date(),
            start: new Date(),
            end: new Date(),
            mac: '000000000000 '
        }
        if (schedule.length > 0) {
            period.schIndex=schedule.length
            period.date=new Date(schedule[schedule.length - 1].date)
            period.date.setDate(schedule[schedule.length - 1].date.getDate() + 7)
            period.start = schedule[schedule.length - 1].start
            period.end = schedule[schedule.length - 1].end
            period.mac = schedule[schedule.length - 1].mac
        }
        setSchedule([...schedule, period])
        console.log(schedule)
    }
    const setDate = (date, mode, i) => {
        const temp = schedule
        temp[i][mode] = date
        setSchedule([...temp])
        console.log(schedule)
    }
    const deleteSchedule = schIndex => {
        const schTemp = [...schedule];
        schTemp.splice(schIndex, 1);
        setSchedule(schTemp)
    }
    const hadleMACadrr = (event, i) => {
        const temp = schedule
        temp[i].mac = event.target.value.replace(/\:/g, "")
        console.log(temp[i].mac)
        setSchedule([...temp])
        console.log(schedule)
    }
    const createTable = () => {
        let table = []
        for (let i = 0; i < schedule.length; i++)
            table.push(
                <tr key={i}>
                    <td>
                        <p>{i + 1}</p>
                    </td>
                    <td>
                        <div className='control' >
                            <DatePicker className='input' selected={schedule[i].date} onChange={date => setDate(date, 'date', i)} maxLength='10' size='10' placeholder='date' />
                        </div>
                    </td>
                    <td>
                        <div className='control' >
                            <DatePicker className='input' selected={schedule[i].start} onChange={date => setDate(date, 'start', i)} maxLength='10' size='10'
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa" />
                        </div>
                    </td>
                    <td>
                        <div className='control'>
                            <DatePicker className='input' selected={schedule[i].end} onChange={date => setDate(date, 'end', i)} maxLength='10' size='10'
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa" />
                        </div>
                    </td>
                    <td>
                        <div className='control' >
                            <MaskedInput mask={[/[0-9|A-F]/, /[0-9|A-F]/, ':', /[0-9|A-F]/, /[0-9|A-F]/, ':', /[0-9|A-F]/, /[0-9|A-F]/, ':', /[0-9|A-F]/, /[0-9|A-F]/, ':', /[0-9|A-F]/, /[0-9|A-F]/]}
                                guide={false}
                                className='input' type='input' value={schedule[i].mac} onChange={(event) => hadleMACadrr(event, i)} placeholder='MAC Addr' />
                        </div>
                    </td>
                    <td style={{ alignItems: 'center', display: 'flex' }}>
                        <div className='control'>
                            <button className='button is-danger is-outlined' type='button' onClick={() => deleteSchedule(i)}>Delete</button>
                        </div>
                    </td>
                </tr>
            )
        return table
    }

    return (
        <Layout loading={loading && <Loader />}>
            <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>Create Subject</h1>
            <div className='box'>
                <div className="field">
                    <label className='label'>Subject ID</label>
                    <NumberFormat className='input' format='########' name='subjectID' value={subjectDetail.subjectID} onChange={handleChange} />
                </div>
                <div className="field">
                    <label className='label'>Subject Name</label>
                    <input className='input' name='subjectName' value={subjectDetail.subjectName} onChange={handleChange}  ></input>
                </div>
                <div className="field is-grouped">
                    <div className='control'>
                        <label className='label'>Schedule</label>
                    </div>
                    <div className='control'>
                        <button className='button is-primary' type='button' onClick={() => addSchedule()}>Add</button>
                    </div>
                </div>
                <div style={styles.overFlowTab} >
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
            </div>
            <button className='button is-primary' onClick={() => handleSubmit()} disabled={subjectDetail.subjectID.length != 0
                && subjectDetail.subjectName.length != 0 && schedule.length != 0 ? false : true}>Create</button>
        </Layout>
    )
}
const styles = {
    container: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '60%'
    },
    overFlowTab: {
        width: '100%',
        height: '250px',
        // maxHeight: '300px',
        overflow: 'auto',
    }
}
export default CreateSubPage 
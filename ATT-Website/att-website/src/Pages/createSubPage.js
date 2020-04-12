import React, { useState, useDebugValue, useEffect } from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import "react-datepicker/dist/react-datepicker.css";
import app from '../firebase'
// import component 
import Loader from '../Components/loader'
import DatePicker from 'react-datepicker'
import { Table } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import Layout from '../Layout/layout'
import API from '../api'
import Select from 'react-select';


const CreateSubPage = props => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [subjectDetail, setSubjectDetail] = useState({
        subjectID: '', subjectName: ''
    })
    const [schedule, setSchedule] = useState([])
    const [tableBody, setTableBody] = useState()
    const [loading, setLoading] = useState(true)
    const [curUser, setcurUser] = useState(null)
    const [boardData, setBoardData] = useState([])
    const [numSch, setNumSch] = useState(1)
    useEffect(() => {
        app.auth().onAuthStateChanged(function (user) {
            if (user) {
                setcurUser(user.uid)
                fetchBoard()
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
    const fetchBoard = () => {
        setLoading(true)
        API.post('getBoard/').then((res) => {
            const temp = res.data.map((data) => {
                return { value: data.mac, label: data.boardName }
            })
            console.log(temp)
            setBoardData(temp)
            setLoading(false)
        })
    }
    // hadle submiting data
    const handleSubmit = () => {
        const subjectData = { teacherUID: curUser, ...subjectDetail, schedule }
        console.log(subjectData)
        setLoading(true)
        API.post('createSubject/', subjectData)
            .then(function (response) {
                console.log("success")
                resetInput()
                setLoading(false)
            })
            .catch(function (error) {
                setLoading(false)
                console.log(error)
            })
    }
    const resetInput = () => {
        setSubjectDetail({ subjectID: '', subjectName: '' })
        setSchedule([])
    }
    // hadle table
    const clearSch = () => {
        setNumSch(1)
        setTableBody()
        setSchedule([])
    }
    const addSchedule = () => {
        const num = numSch
        const period = {
            schIndex: 0,
            date: new Date(),
            start: new Date(),
            end: new Date(),
            mac: 'ECC-810',
            board: boardData[0]
        }
        period.end.setMinutes(period.end.getMinutes()+30)
        let temp = schedule
        for (let i = 0; i < num; i++) {
            if (temp.length > 0) {
                period.schIndex = temp.length
                const dateTemp = new Date(temp[temp.length - 1].date)
                dateTemp.setDate(temp[temp.length - 1].date.getDate() + 7)

                console.log(dateTemp)
                period.date = dateTemp
                period.start = temp[temp.length - 1].start
                period.end = temp[temp.length - 1].end
                period.mac = temp[temp.length - 1].mac
                period.board = temp[temp.length - 1].board


            }
            temp = [...temp, { ...period }]
        }
        temp = temp.map((data) => {
            const tempStart = new Date(data.start)
            const tempEnd = new Date(data.end)
            // start
            tempStart.setDate(data.date.getDate())
            tempStart.setMonth(data.date.getMonth())
            tempStart.setFullYear(data.date.getFullYear())
            // end
            tempEnd.setDate(data.date.getDate())
            tempEnd.setMonth(data.date.getMonth())
            tempEnd.setFullYear(data.date.getFullYear())
            return { ...data, start: tempStart, end: tempEnd }
        })
        console.log(temp)
        setSchedule(temp)
    }
    const setDate = (date, mode, i) => {
        const temp = schedule
        let tempDate = date
        if (mode == 'start' || mode == 'end') {
            tempDate.setDate(temp[i].date.getDate())
            tempDate.setMonth(temp[i].date.getMonth())
            tempDate.setFullYear(temp[i].date.getFullYear())
            if (mode == 'start') {
                temp[i].date.setHours(tempDate.getHours(), tempDate.getMinutes(), tempDate.getSeconds())
            }

        } else if (mode == 'date') {
            temp[i].start.setDate(tempDate.getDate())
            temp[i].start.setMonth(tempDate.getMonth())
            temp[i].start.setFullYear(tempDate.getFullYear())

            temp[i].end.setDate(tempDate.getDate())
            temp[i].end.setMonth(tempDate.getMonth())
            temp[i].end.setFullYear(tempDate.getFullYear())

        }
        temp[i][mode] = tempDate
        if(diff_minutes(temp[i].end,temp[i].start)>=30){
            setSchedule([...temp])
        }
        console.log(schedule)
    }
    const diff_minutes = (dt2, dt1) => {
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.round(diff);
    }
    const deleteSchedule = schIndex => {
        const schTemp = [...schedule];
        schTemp.splice(schIndex, 1);
        schTemp.forEach((sch, i) => {
            sch.schIndex = i
        })
        console.log(schTemp)
        setSchedule(schTemp)
    }
    const hadleMACadrr = (i, val) => {
        if (val !== null) {
            const temp = schedule
            temp[i].mac = val.value
            temp[i].board = val
            setSchedule([...temp])
        }
    }
    const handleNumChange = (event) => {
        setNumSch(event.target.value)
    }
    const createTable = () => {
        let table = []
        for (let i = 0; i < schedule.length; i++)
            table.push(
                <tr key={i} >
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
                    <td style={{ width: 150 }}>
                        <Select
                            value={schedule[i].board}
                            onChange={val => hadleMACadrr(i, val)}
                            options={boardData}
                        />
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
                        <input className='input' type='number' value={numSch} onChange={handleNumChange} />
                    </div>
                    <div className='control'>
                        <button className='button is-primary' type='button' disabled={loading} onClick={() => addSchedule()}>Add</button>
                    </div>
                    <div className='control'>
                        <button className='button is-warning' type='button' onClick={() => clearSch()}>Clear</button>
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
                                <th>Room</th>
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
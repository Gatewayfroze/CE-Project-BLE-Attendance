import React, { useState, useEffect } from 'react'
import {
    Button,
    Card,
    CardHeader,
    Table,
    Grid,
    CircularProgress,
    Divider
} from '@material-ui/core'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import "react-datepicker/dist/react-datepicker.css";
import MaskedInput from 'react-text-mask'
import DatePicker from 'react-datepicker'
import { Save, Add } from '@material-ui/icons';
import Select from 'react-select';
import API from '../../api'

const EditSch = ({ scheduleList, subjectID }, ...props) => {
    const [schedule, setSchedule] = useState(scheduleList)
    const [tableBody, setTableBody] = useState()
    const [loading, setLoading] = useState(false)
    const [boardData, setBoardData] = useState([])
    const [currentSch, setCurrentSch] = useState()
    useEffect(() => {
        scheduleList.forEach((sch) => {
            const currentDate = new Date(sch.date)
            const now = new Date
            if (now > currentDate) { setCurrentSch(sch.schIndex); }
        })
        setSchedule(scheduleList)
        fetchBoard()
    }, [scheduleList])
    useEffect(() => {
        if (schedule) {
            // console.log('=============================================')
            // console.log(schedule)
            schedule.forEach((sch) => {
                sch.date = new Date(sch.date)
                sch.start = new Date(sch.start)
                sch.end = new Date(sch.end)
            })
            setTableBody(createTable())
        }
    }, [schedule])
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
    const addSchedule = () => {
        const period = {
            schIndex: 0,
            date: new Date(),
            start: new Date(),
            end: new Date(),
            mac: 'ECC-810',
            board: boardData[0]
        }
        if (schedule.length > 0) {
            period.schIndex = schedule.length
            period.date = new Date(schedule[schedule.length - 1].date)
            period.date.setDate(schedule[schedule.length - 1].date.getDate() + 7)
            period.start = schedule[schedule.length - 1].start
            period.end = schedule[schedule.length - 1].end
            period.mac = schedule[schedule.length - 1].mac
            period.board = schedule[schedule.length - 1].board
        }
        let data = { ...period }
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

        setSchedule([...schedule, { ...data, start: tempStart, end: tempEnd }])
        console.log(schedule)
    }
    const setDate = (date, mode, i) => {
        // const temp = schedule
        // temp[i][mode] = date
        // setSchedule([...temp])
        // console.log(schedule)
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
        setSchedule([...temp])
        console.log(schedule)
    }
    const hadleMACadrr = (i, val) => {
        if (val !== null) {
            const temp = schedule
            temp[i].mac = val.value
            temp[i].board = val
            setSchedule([...temp])
        }
    }
    const deleteSchedule = schIndex => {
        const schTemp = [...schedule];
        schTemp.splice(schIndex, 1);
        schTemp.forEach((sch, i) => {
            sch.schIndex = i
        })
        setSchedule(schTemp)
    }
    const createTable = () => {
        let table = []
        for (let i = 0; i < schedule.length; i++) {
            const isDisable = currentSch >= i ? true : false
            table.push(
                <tr key={i}>
                    <td>
                        <p>{i + 1}</p>
                    </td>
                    <td>
                        <div className='control' >
                            <DatePicker className='input' selected={schedule[i].date} onChange={date => setDate(date, 'date', i)} maxLength='10' size='10' placeholder='date' disabled={isDisable} />
                        </div>
                    </td>
                    <td>
                        <div className='control' >
                            <DatePicker className='input' selected={schedule[i].start} onChange={date => setDate(date, 'start', i)} maxLength='10' size='10'
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                disabled={isDisable} />
                        </div>
                    </td>
                    <td>
                        <div className='control'>
                            <DatePicker className='input' selected={schedule[i].end} onChange={date => setDate(date, 'end', i)} maxLength='10' size='10'
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                disabled={isDisable} />
                        </div>
                    </td>
                    <td style={{ width: 150 }}>
                        <Select
                            isDisabled={isDisable}
                            value={schedule[i].board}
                            onChange={val => hadleMACadrr(i, val)}
                            options={boardData}
                        />
                    </td>
                    <td style={{ alignItems: 'center', display: 'flex' }}>
                        <div className='control'>
                            <button className='button is-danger is-outlined' type='button' onClick={() => deleteSchedule(i)} disabled={isDisable}>Delete</button>
                        </div>
                    </td>
                </tr>
            )
        }
        return table
    }
    const updateSchedule = () => {
        setLoading(true)
        API.post('updateSchedule/', { subjectID, newschedule: schedule })
            .then((res) => { setLoading(false); console.log(res) })
            .catch((err) => console.log(err))

    }
    return (
        <Card>
            <CardHeader
                action={
                    <Grid container spacing={1} alignItems="flex-end">
                        {loading && <CircularProgress />}
                        <Grid item>
                            <Button variant='contained' color='secondary' onClick={() => addSchedule()}>Add <Add /></Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' color='primary' onClick={() => updateSchedule()}>Save <Save /></Button>
                        </Grid>
                    </Grid>
                }
                title="Schedule"
            />
            <Divider />
            <div style={{ margin: 15 }}>

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
        </Card>
    )
}
const styles = {
    overFlowTab: {
        width: '100%',
        height: '250px',
        // maxHeight: '300px',
        overflow: 'auto',
    }
}
export default EditSch
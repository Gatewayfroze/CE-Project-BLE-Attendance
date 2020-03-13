import React, { useEffect, useState } from 'react';
// import { DataGrid } from 'tubular-react'
// import { ColumnModel } from 'tubular-common';
import { Grid, Container, Typography } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
// import {
//     AggregateFunctions,
//     ColumnDataType,
//     ColumnSortDirection
// } from "tubular-common";
import MaterialTable from 'material-table'
import API from '../api'

let columns = [
    { title: 'ID', field: 'studentID', editable: 'never' },
    { title: 'Name', field: 'name', editable: 'never' },
];

const SampleGrid = ({ match }, ...props) => {
    const subjectID = match.params.subjectID
    const [loading, setLoading] = useState(false)
    const [subjectData, setSubjectData] = useState('')
    const [LabelDate, setLabel] = useState([])
    const [subjectName, setSubjectName] = useState('')
    const [studentData, setStudentData] = useState([])
    const [transaction, setTransac] = useState([])
    const [currentSch, setCurrentSch] = useState(0)
    useEffect(() => {
        fetchSubject()
    }, [])
    useEffect(() => {
        if (subjectData !== '') {
            const schedule = subjectData.schedule
            let current = 0
            const schCol = schedule.map((sch, i) => {
                const currentDate = new Date(sch.date)
                const now = new Date
                // checkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
                if (now > currentDate) { setCurrentSch(i); current = i }
                const day = currentDate.getDate()
                const month = currentDate.getMonth() + 1
                const year = currentDate.getFullYear()
                let dateString = `${day}/${month}/${year}`
                return {
                    title: dateString, field: `sch${i}`, lookup: { 'ok': 'ok', 'Absent': 'Absent', 'Late': 'Late' },
                    cellStyle: rowData => {
                        if (rowData == 'Absent') return { backgroundColor: 'rgb(255, 96, 79)' }
                        else if (rowData == 'Late') return { backgroundColor: 'rgb(255, 152, 0)' }
                        else if (rowData == 'ok') { return { backgroundColor: 'rgb(0, 209, 178)' } }
                    },
                    editable: i <= current ? 'onUpdate' : 'never'
                }
            })
            columns = [...columns, ...schCol]
            fetchTrasaction()
        }
    }, [subjectData])
    useEffect(() => {
        if (transaction.length != 0)
            fetchListStudent(subjectData.students, subjectData.schedule)
    }, [transaction])

    const fetchSubject = () => {
        setLoading(true)
        API.post('getSubject/', { subjectID })
            .then((res) => {
                setSubjectData(res.data)
                setLoading(false)
                setSubjectName(res.data.subjectName)
            })
            .catch((err) => console.log(err))
    }
    const fetchListStudent = async (stdList, scheduleList) => {
        setLoading(true)
        const val = stdList.map(async (student) => {
            const detail = await API.post('getStudent/', { studentID: student })
            detail.data.name = detail.data.name + ' ' + detail.data.surname
            detail.data.studentID = detail.data.email.replace('@kmitl.ac.th', '')
            setLoading(false)
            return detail.data
        })
        const results = await Promise.all(val)
        const temp = results.map((std) => {
            const schData = scheduleList.map((sch, i) => {
                const transac = transaction.find((trans) => {
                    return trans.schIndex === i && trans.studentUID === std.uid
                })
                const defaultText = i <= currentSch ? 'Absent' : ''
                return { status: transac ? transac.status : defaultText, schId: transac ? transac.id : '' }
            })
            let objTemp = {}
            schData.forEach((sch, i) => {
                objTemp = { ...objTemp, [`sch${i}`]: sch.status, [`sch${i}ID`]: sch.schId }
            })
            return { ...std, ...objTemp }
        })
        console.log(temp)
        setStudentData(temp)

        // setLoading(false)
    }
    const fetchTrasaction = () => {
        setLoading(true)
        API.post('getTransactionSub/', { subjectID })
            .then((res) => {
                setTransac(res.data)
                setLoading(false)
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }
    return (
        <React.Fragment>

            {loading && <LinearProgress />}
            <Container maxWidth={"lg"}>

                <MaterialTable
                    columns={columns}
                    data={studentData}
                    title={subjectName}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                for (let i = 0; i <= currentSch; i++) {
                                    if (oldData[`sch${i}`] !== newData[`sch${i}`]) {
                                        // data change
                                        if (oldData[`sch${i}`] === 'Absent') {
                                            // add new transaction
                                            console.log('create transaction')
                                        } else {
                                            // update transaction
                                            console.log(oldData[`sch${i}ID`])
                                        }
                                    }
                                }
                                resolve()
                            }),

                    }}
                    options={{
                        exportButton: true
                    }}
                />
            </Container>
        </React.Fragment>
    )
}
export default SampleGrid
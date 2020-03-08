import React, { useEffect, useState } from 'react';
import { DataGrid } from 'tubular-react';
import { ColumnModel } from 'tubular-common';
import { Grid, Container, Typography } from '@material-ui/core'
import {
    AggregateFunctions,
    ColumnDataType,
    ColumnSortDirection
} from "tubular-common";
import API from '../api'

let columns = [
    new ColumnModel("studentID", {
        dataType: ColumnDataType.Numeric,
        isKey: true,
        label: "Id",
        sortDirection: ColumnSortDirection.Ascending,
        sortOrder: 1,
        sortable: true,
    }),
    new ColumnModel('name', {
        aggregate: AggregateFunctions.Count,
        searchable: true,
        sortable: true
    }),
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
            const schCol = schedule.map((sch, i) => {
                const currentDate = new Date(sch.date)
                const now = new Date
                // checkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
                if (now > currentDate) setCurrentSch(i)
                const day = currentDate.getDate()
                const month = currentDate.getMonth() + 1
                const year = currentDate.getFullYear()
                let dateString = `${day}/${month}/${year}`
                return new ColumnModel(`sch${i}`, { label: dateString })
            })
            columns = [...columns, ...schCol]
            console.log(columns)
            fetchTrasaction()
        }
    }, [subjectData])
    useEffect(() => {
        if (transaction.length != 0)
            fetchListStudent(subjectData.students, subjectData.schedule)
    }, [transaction])

    const fetchSubject = () => {
        API.post('getSubject/', { subjectID })
            .then((res) => {
                setSubjectData(res.data)
                setSubjectName(res.data.subjectName)
            })
            .catch((err) => console.log(err))
    }
    const fetchListStudent = async (stdList, scheduleList) => {
        // setLoadingStd(true)
        const val = stdList.map(async (student) => {
            const detail = await API.post('getStudent/', { studentID: student })
            detail.data.name = detail.data.name + ' ' + detail.data.surname
            detail.data.studentID = detail.data.email.replace('@kmitl.ac.th', '')
            return detail.data
        })
        const results = await Promise.all(val)
        const temp = results.map((std) => {
            const schData = scheduleList.map((sch, i) => {
                const transac = transaction.find((trans) => {
                    return trans.schIndex === i && trans.studentUID === std.uid
                })
                const defaultText = i <= currentSch ? 'Absent' : ''
                return transac ? transac.status : defaultText
            })
            let objTemp = {}
            schData.forEach((sch, i) => {
                objTemp = { ...objTemp, [`sch${i}`]: sch }
            })
            return { ...std, ...objTemp }
        })
        console.log(temp)
        setStudentData(temp)
        // setLoadingStd(false)
    }
    const fetchTrasaction = () => {
        API.post('getTransactionSub/', { subjectID })
            .then((res) => {
                setTransac(res.data)
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }
    return (
        <Container maxWidth={"lg"}>
            <Typography variant='h3' >{subjectName}</Typography>
            <DataGrid
                gridName="Tubular-React"
                columns={columns}
                dataSource={studentData}
            />
        </Container>
    )
}
export default SampleGrid
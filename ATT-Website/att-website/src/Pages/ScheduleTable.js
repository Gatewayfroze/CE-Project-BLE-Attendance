import React, { useEffect, useState } from 'react';
import { DataGrid } from 'tubular-react';
import { ColumnModel } from 'tubular-common';
import { Grid, Container,Typography } from '@material-ui/core'
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
    })
];

const SampleGrid = ({ match }, ...props) => {
    const subjectID = match.params.subjectID
    const [loading, setLoading] = useState(false)
    const [subjectData, setSubjectData] = useState('')
    const [LabelDate, setLabel] = useState([])
    const [subjectName, setSubjectName] = useState('')
    const [studentData, setStudentData] = useState([])

    useEffect(() => {
        fetchSubject()
    }, [])
    useEffect(() => {
        if (subjectData !== '') {
            console.log(subjectData.students)

            const schedule = subjectData.schedule
            const schCol = schedule.map((sch) => {
                const currentDate = new Date(sch.date)
                const day = currentDate.getDate()
                const month = currentDate.getMonth() + 1
                const year = currentDate.getFullYear()
                let dateString = `${day}/${month}/${year}`
                return new ColumnModel(dateString)
            })
            columns = [...columns, ...schCol]
        }
    }, [subjectData])


    const fetchSubject = () => {
        API.post('getSubject/', { subjectID })
            .then((res) => {
                setSubjectData(res.data)
                setSubjectName(res.data.subjectName)
                fetchListStudent(res.data.students)
            })
            .catch((err) => console.log(err))
    }
    const fetchListStudent = async (stdList) => {
        // setLoadingStd(true)
        const val = stdList.map(async (student) => {
            const detail = await API.post('getStudent/', { studentID: student })
            detail.data.name = detail.data.name + ' ' + detail.data.surname
            detail.data.studentID = detail.data.email.replace('@kmitl.ac.th', '')
            return detail.data
        })
        const results = await Promise.all(val)
        setStudentData(results)
        console.log(results)
        // setLoadingStd(false)
    }
    return (
        <Container  maxWidth={"lg"}>
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
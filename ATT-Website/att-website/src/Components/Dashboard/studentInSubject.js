import React, { useState, useEffect } from 'react'
import {
    Card,
    CardHeader,
    Grid,
    Button,
    TextField,
    CircularProgress,
    Divider
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import DataTable from '../../Components/DataTable'
import API from '../../api'

const StudentInSubject = ({ subjectData, subjectID }, ...props) => {
    const [studentData, setStudentData] = useState([])
    const [searchStd, setSearch] = useState('')
    const [stdDataSearch, setStdDataSearch] = useState([])
    const [loadingStd, setLoadingStd] = useState(false)
    const [stdList, setStdList] = useState([])
    useEffect(() => {
        if (subjectData) {
            if (subjectData.students.length != 0) {
                setStdList(subjectData.students)
            }
        }
    }, [subjectData])

    useEffect(() => {
        fetchListStudent()
    }, [stdList])

    useEffect(() => {
        if (searchStd != '') {
            const search = studentData.filter(std => {
                return std.studentID.includes(searchStd) || std.name.includes(searchStd)
            })
            setStdDataSearch(search)
        } else {
            setStdDataSearch(studentData)
        }
    }, [searchStd, studentData])
    const fetchListStudent = async () => {
        setLoadingStd(true)
        const val = stdList.map(async (student) => {
            const detail = await API.post('getStudent/', { studentID: student })
            detail.data.name = detail.data.name + ' ' + detail.data.surname
            detail.data.studentID = detail.data.email.replace('@kmitl.ac.th', '')
            return detail.data
        })
        const results = await Promise.all(val)
        setStudentData(results)
        setStdDataSearch(results)
        setLoadingStd(false)
    }
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    const dropStudent = (studentIndex) => {
        setLoadingStd(true)
        API.post('drop/', { studentID: [studentData[studentIndex].studentID], subjectID })
            .then((response) => {
                console.log(response)
                setStdList(stdList.filter((std) => { return std !== stdDataSearch[studentIndex].studentID }))
                setLoadingStd(false)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const columnDefault = [
        { id: 'studentID', label: 'Student ID', minWidth: 100 },
        { id: 'name', label: 'Name', minWidth: 100 },
    ]
    const tableExtend = []
    tableExtend.push({ text: 'Delete', class: 'is-danger', function: dropStudent })
    return (
        <Card>
            <CardHeader
                action={
                    <Grid container spacing={1} alignItems="flex-end">
                        {loadingStd && <CircularProgress />}
                        <Grid item>
                            <SearchIcon />
                        </Grid>
                        <Grid item>
                            <TextField value={searchStd} onChange={handleSearch} label='Search' size='small' />
                        </Grid>
                    </Grid>
                }
                title="Student In Class"
            />
            <Divider/>
            <DataTable maxHeight={400} columns={columnDefault} data={stdDataSearch} extraHeader={['Delete']} extraCol={tableExtend} />
        </Card>)
}
export default StudentInSubject
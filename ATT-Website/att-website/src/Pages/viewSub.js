import React, { useState, useEffect } from 'react'
// import component 
import API from '../api'
import Layout from '../Layout/layout'
import DataTable from '../Components/DataTable'
import Loader from '../Components/loader'
import { Typography, Grid, Button } from '@material-ui/core';
import Dashboard from '../Components/viewSubjectPage'
import { getThemeProps } from '@material-ui/styles'
import { Link } from 'react-router-dom'
const ViewSubjectPage = ({ match }, ...props) => {
    const [subjects, setSubjects] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentSubject, setCurrentSub] = useState('')
    const [currentSubjectID, setCurrentSubID] = useState('')
    useEffect(() => {
        fetchSubject()
        console.log('sssss')
    }, [])
    const fetchSubject = () => {
        setLoading(true)
        API.get('getAllSubject/').then((res) => {
            console.log('fetchhhhhhhhhhhhhhhhhh')
            setLoading(false)
            setSubjects(res.data)
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    const columnDefault = [
        { id: 'subjectID', label: 'Subject ID', minWidth: 100 },
        { id: 'subjectName', label: 'Name', minWidth: 100 },
    ]
    const deleteSubject = (subjectID) => {
        setLoading(true)
        console.log(subjects[subjectID].subjectID)
        API.delete('deleteSubject/', { data: { subjectID: subjects[subjectID].subjectID } })
            .then((response) => {
                console.log(response)
                setLoading(false)
                fetchSubject()
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const getLink = (subjectID) => {
        console.log(subjectID)
        return subjects[subjectID].subjectID
    }
    const tableExtend = []
    tableExtend.push({ text: 'View', class: 'is-warning', link: getLink, function: () => console.log('ssss') })
    tableExtend.push({ text: 'Delete', class: 'is-danger', function: deleteSubject })
    return (
        <Layout loading={loading && <Loader />} size='lg'>
            <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>View Subject</h1>
            <div class='box'>
                <label className='label '>Enter Data to search</label>
                <div class="field is-grouped has-addons">
                    <input class='input is-primary' placeholder='ID,name' />
                    <Button>Search</Button>
                </div>
            </div>
            <DataTable maxHeight={350} columns={columnDefault} data={subjects} extraHeader={['View', 'Delete']} extraCol={tableExtend} />
        </Layout>
    )
}
export default ViewSubjectPage
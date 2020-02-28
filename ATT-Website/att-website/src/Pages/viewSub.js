import React, { useState, useEffect } from 'react'
// import component 
import API from '../api'
import Layout from '../Layout/layout'
import DataTable from '../Components/DataTable'
import Loader from '../Components/loader'
import { Typography, Grid, Button } from '@material-ui/core';
import Dashboard from '../Components/viewSubjectPage'
const Enrollpage = () => {
    const [subjects, setSubjects] = useState([])
    const [loading, setLoading] = useState(false)
    const [viewIndicator, setViewSub] = useState(false)
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
    const viewSubject = (subjectID) => {
        setCurrentSub(subjects[subjectID].subjectName)
        setCurrentSubID(subjects[subjectID].subjectID)
        setViewSub(true)
    }
    const tableExtend = []
    tableExtend.push({ text: 'View', class: 'is-warning', function: viewSubject })
    tableExtend.push({ text: 'Delete', class: 'is-danger', function: deleteSubject })
    return (
        <Layout loading={loading && <Loader />} size='lg'>
            {viewIndicator ?
                <React.Fragment>
                    <Grid alignItems='center' container>
                        <Grid item md='1'>
                            <Button variant='contained' color='secondary' onClick={() => setViewSub(false)}>Back</Button>
                        </Grid>
                        <Grid item>
                            <Typography variant='h3'>{currentSubject}</Typography>
                        </Grid>
                    </Grid>
                    <Dashboard subjectID={currentSubjectID} />
                </React.Fragment>
                :
                <React.Fragment>
                    <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>View Subject</h1>
                    <div class='box'>
                        <label className='label '>Enter Data to search</label>
                        <div class="field is-grouped has-addons">
                            <input class='input is-primary' placeholder='ID,name' />
                            <Button>Search</Button>
                        </div>
                    </div>
                    <DataTable maxHeight={350} columns={columnDefault} data={subjects} extraHeader={['View', 'Delete']} extraCol={tableExtend} />
                </React.Fragment>}
        </Layout>
    )
}
const styles = {
    container: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '60%'
    }
}
export default Enrollpage
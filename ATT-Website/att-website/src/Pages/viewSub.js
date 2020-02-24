import React, { useState, useEffect } from 'react'
import { Button } from 'react-bulma-components/dist';
// import component 
import API from '../api'
import Layout from '../Layout/layout'
import DataTable from '../Components/DataTable'
import Loader from '../Components/loader'

const Enrollpage = () => {
    const [subjects, setSubjects] = useState([])
    const [loading, setLoading] = useState(false)
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
        }).catch((err) => {
            console.log(err)
        })
    }

    const columnDefault = [
        { id: 'subjectID', label: 'Subject ID', minWidth: 100 },
        { id: 'subjectName', label: 'Name', minWidth: 100 },
    ]
    const tableExtend = []
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
    tableExtend.push({ text: 'Delete', class: 'is-danger', function: deleteSubject })
    return (
        <Layout loading={loading && <Loader />}>
            <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>View Subject</h1>
            <div class='box'>
                <label className='label '>Enter Data to search</label>
                <div class="field is-grouped has-addons">
                    <input class='input is-primary' placeholder='ID,name' />
                    <Button>Search</Button>
                </div>
            </div>
            <DataTable columns={columnDefault} data={subjects} extraHeader={['Delete']} extraCol={tableExtend} />
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
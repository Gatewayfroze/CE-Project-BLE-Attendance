import React, { useState, useEffect } from 'react'
// import component 
import API from '../api'
import firebase from '../firebase'
import Layout from '../Layout/layout'
import DataTable from '../Components/DataTable'
import Loader from '../Components/loader'
import isAdmin from '../constant/adminUID'
import { Button } from '@material-ui/core';
const ViewSubjectPage = ({ match }, ...props) => {
    const [subjects, setSubjects] = useState([])
    const [loading, setLoading] = useState(false)
    const [uid, setUid] = useState('')
    const [searchData, setSearch] = useState('')
    const [dataSearch, setDataSearch] = useState([])

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setUid(user.uid)
            } else {
            }
        });
    }, [])
    useEffect(() => {
        if (uid != '') {
            fetchSubject()
        }
    }, [uid])
    useEffect(() => {
        if (searchData != '') {
            const search = subjects.filter(subject => {
                return subject.subjectName.includes(searchData)||subject.subjectID.includes(searchData)
            })
            setDataSearch(search)
        } else {
            setDataSearch(subjects)
        }
    }, [searchData, subjects])

    const fetchSubject = () => {
        setLoading(true)
        API.get('getAllSubject/').then((res) => {
            setLoading(false)
            setSubjects(isAdmin(uid) ? res.data : res.data.filter((subject) => {
                return subject.teacher === uid
            }))
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleSearch = (e) => {
        setSearch(e.target.value)
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
                    <input class='input is-primary' value={searchData} onChange={handleSearch}  placeholder='ID,name' />
                    <Button>Search</Button>
                </div>
            </div>
            <DataTable maxHeight={350} columns={columnDefault} data={dataSearch} extraHeader={['View', 'Delete']} extraCol={tableExtend} />
        </Layout>
    )
}
export default ViewSubjectPage
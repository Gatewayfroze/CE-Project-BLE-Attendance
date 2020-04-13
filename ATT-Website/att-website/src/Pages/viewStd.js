import React, { useState, useEffect } from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components/dist';
// import component 
import API from '../api'
import Layout from '../Layout/layout'
import DataTable from '../Components/DataTable'
import Loader from '../Components/loader'
const ManagePage = () => {
    const [data, setJson] = useState([])
    const [loading, setLoading] = useState(false)
    const [genRole, setRole] = useState('Student')
    const [searchData, setSearch] = useState('')
    const [dataSearch, setDataSearch] = useState([])
    useEffect(() => {
        fetchData(genRole)
    }, [genRole])

    useEffect(() => {
        if (searchData != '') {
            const search = data.filter(user => {
                console.log(user)
                if (genRole == 'student')
                    return user.id.includes(searchData) || user.name.includes(searchData) || user.surname.includes(searchData)
                else
                    return user.email.includes(searchData) || user.name.includes(searchData) || user.surname.includes(searchData)

            })
            setDataSearch(search)
        } else {
            setDataSearch(data)
        }
    }, [searchData, data])

    // set element extend table in Datatable
    const fetchData = (role) => {
        setLoading(true)
        API.get(`getAll${role}/`).then(function (response) {
            console.log(response)
            if (role == 'Student') {
                const dd = response.data.map(student => {
                    const studetnObj = {
                        ...student,
                        id: student.email.replace('@kmitl.ac.th', ''),
                    }
                    return studetnObj
                })
                setJson(dd)
            } else {
                setJson(response.data)
            }
            setLoading(false)
        })
            .catch(function (error) {
                console.log(error)
            })
    }
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    const column = {
        Student: [
            { id: 'id', label: 'ID', minWidth: 100 },
            { id: 'name', label: 'Name', minWidth: 100 },
            { id: 'surname', label: 'Surname', minWidth: 100 },
            { id: 'faculty', label: 'Faculty', minWidth: 100 },
            { id: 'year', label: 'Year', minWidth: 100 },
        ],
        Teacher: [
            { id: 'email', label: 'Email', minWidth: 80 },
            { id: 'name', label: 'Name', minWidth: 100 },
            { id: 'surname', label: 'Surname', minWidth: 100 },
        ]
    }
    let columnDefault = column[genRole]

    const tableExtend = []
    const deleteUser = (userIndex) => {
        setLoading(true)
        console.log(dataSearch[userIndex].uid)
        API.delete('deleteAccount/', { data: { uid: data[userIndex].uid } })
            .then(function (response) {
                console.log(response)
                // setJson(response.data)
                console.log('here')
                fetchData(genRole)
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    tableExtend.push({ text: 'Delete', class: 'is-danger', function: deleteUser })
    // toggle role of account
    let btnstdClass = genRole === 'Student' ? 'is-primary' : ''
    let btntchClass = genRole === 'Teacher' ? 'is-primary' : ''
    const handleRole = (role) => {
        setRole(role)
        setJson([])
        console.log(genRole)
    }
    return (
        <Layout loading={loading && <Loader />}>
            <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>View Account</h1>
            <div class='box'>
                <label className='label'>Select Role</label>
                <div class="buttons has-addons" style={{ marginBottom: '0' }}>
                    <Button className={btnstdClass} onClick={() => handleRole('Student')}>Student</Button>
                    <Button className={btntchClass} onClick={() => handleRole('Teacher')}>Teacher</Button>
                </div>
                <label className='label '>Enter Data to search</label>
                <div class="field is-grouped has-addons">
                    <input class='input is-primary' value={searchData} onChange={handleSearch} placeholder='ID,name' />
                    <Button>Search</Button>
                </div>
            </div>
            <DataTable columns={columnDefault} data={dataSearch} extraHeader={['Delete']} extraCol={tableExtend} />
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
export default ManagePage
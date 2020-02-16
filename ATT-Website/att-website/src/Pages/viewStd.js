import React, { useState, useEffect } from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components/dist';

// import component 
import API from '../api'
import Layout from '../Layout/layout'
import DataTable from '../Components/DataTable'
const ManagePage = () => {
    const [data, setJson] = useState([])
    const [genRole, setRole] = useState('Student')
    useEffect(() => {
        if (genRole === 'Student') {
            API.post('getAllStudent/').then(function (response) {
                console.log(response)
                setJson(response.data)
            })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }, [genRole])
    // set element extend table in Datatable
    const columnDefault = [
        { id: 'studentID', label: 'Student ID', minWidth: 100 },
        { id: 'name', label: 'Name', minWidth: 100 },
        { id: 'surname', label: 'Surname', minWidth: 100 },
    ]
    const tableExtend = []
    const deleteUser=()=>{

    }
    tableExtend.push({ text: 'Delete', class: 'is-danger', function: deleteUser })
    // toggle role of account
    let btnstdClass = genRole === 'Student' ? 'is-primary' : ''
    let btntchClass = genRole === 'Teacher' ? 'is-primary' : ''
    const handleRole = (role) => {
        setRole(role)
        console.log(genRole)
    }
    return (
        <Layout>
            <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>View Account</h1>
            <div class='box'>
                <label className='label'>Select Role</label>
                <div class="buttons has-addons" style={{ marginBottom: '0' }}>
                    <Button className={btnstdClass} onClick={() => handleRole('Student')}>Student</Button>
                    <Button className={btntchClass} onClick={() => handleRole('Teacher')}>Teacher</Button>
                </div>
                <label className='label '>Enter Data to search</label>
                <div class="field is-grouped has-addons">
                    <input class='input is-primary' placeholder='ID,name' />
                    <Button>Search</Button>
                </div>
            </div>
            <DataTable columns={columnDefault} data={data} extraHeader={['Delete']} extraCol={tableExtend} />

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
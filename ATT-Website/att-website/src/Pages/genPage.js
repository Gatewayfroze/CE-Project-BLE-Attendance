import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import Papa from "papaparse"
import DataTable from '../Components/DataTable'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components/dist';
import Layout from '../Layout/layout'
import Loader from '../Components/loader'
import API from '../api'

const GenPage = () => {
    const [data, setJson] = useState([])
    const [tableBody, setTableBody] = useState(<tr><td colSpan="5">Empty</td></tr>)
    const [genRole, setRole] = useState('Student')
    const [fileName, setFileNamed] = useState(<p>Click here to upload .CSV file</p>)
    const [loading, setLoading] = useState(false)


    const generateAccount = () => {
        setLoading(true)
        data.forEach((dataUser, i) => {
            setTimeout(() => {
                createAccount(dataUser)
            }, i * 1000);
        })
        // calculate timeout (psuedo)
        setTimeout(() => {
            setLoading(false)
        }, 1000 * data.length);
    }
    const createAccount = (dataUser) => {
        const user = {}
        if (genRole === 'Student') {
            user.email = dataUser.id + '@kmitl.ac.th'
            user.name = dataUser.name
            user.surname = dataUser.surname
            user.faculty = dataUser.faculty
            user.year = dataUser.year
            user.role = genRole.toLowerCase()
        } else {
            user.email = dataUser.email
            user.name = dataUser.name
            user.surname = dataUser.surname
            user.faculty = NaN
            user.role = genRole.toLowerCase()
        }
        console.log(user)
        API.post('createAccount/', user).then(function (response) {
            console.log(response)
        })
            .catch(function (error) {
                console.log(error)
            })
    }
    const handleRole = (role) => {
        setRole(role)
        setJson([])
        setFileNamed(<p>Click here to upload .CSV file</p>)
        console.log(genRole)
    }
    const deleteUser = userIndex => {
        const userTemp = [...data];
        userTemp.splice(userIndex, 1);
        setJson(userTemp)
    };
    // toggle role of account
    let btnstdClass = genRole === 'Student' ? 'is-primary' : ''
    let btntchClass = genRole === 'Teacher' ? 'is-primary' : ''
    // set element extend table in Datatable
    const columnDefault = [
        { id: 'id', label: 'Student ID', minWidth: 100 },
        { id: 'name', label: 'Name', minWidth: 100 },
        { id: 'surname', label: 'Surname', minWidth: 100 },
    ]
    const columnsStd = [
        ...columnDefault,
        { id: 'faculty', label: 'Faculty', minWidth: 120 },
        { id: 'year', label: 'Year', minWidth: 100 },
    ];
    const columnsTch = [
        { id: 'name', label: 'Name', minWidth: 100 },
        { id: 'surname', label: 'Surname', minWidth: 100 },
        { id: 'email', label: 'Email', minWidth: 100 },
    ];
    const tableExtend = []
    tableExtend.push({ text: 'Delete', class: 'is-danger', function: deleteUser })
    const onDrop = (e) => {
        const reader = new FileReader();
        reader.readAsText(e[0]);
        const fileName = e[0].name
        // set File name 
        const temp = fileName.split('.')
        if (temp[temp.length - 1].toLowerCase() !== 'csv') {
            alert('Please upload CSV file only')
            return
        }
        setFileNamed(<p>{fileName}</p>)
        reader.onload = () => {
            Papa.parse(e[0], {
                header: true,
                complete: function (results) {
                    results.data.pop()
                    // set data from file to json
                    setJson(results.data)
                }
            });
        };
    }
    return (
        <Layout loading={loading && <Loader />}>
            <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>Generate Account</h1>
            <div class='box'>
                <label className='label'>Select Role</label>
                <div class="buttons has-addons" style={{ marginBottom: '0' }}>
                    <Button className={btnstdClass} onClick={() => handleRole('Student')}>Student</Button>
                    <Button className={btntchClass} onClick={() => handleRole('Teacher')}>Teacher</Button>
                </div>
                <label className='label'>Upload .CSV File</label>
                <i class="fas fa-italic"></i>
                <div className="field is-grouped">
                    <Dropzone onDrop={onDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <button className='button is-primary is-outlined' {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {fileName}
                                </button>
                            </section>
                        )}
                    </Dropzone>
                </div>
            </div>
            <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>{genRole} Data</h1>
            <DataTable columns={genRole === 'Student' ? columnsStd : columnsTch} data={data} extraHeader={['Delete']} extraCol={tableExtend} />
            <div style={{ marginTop: 10 }}>
                <Button className='is-primary' onClick={generateAccount} disabled={data.length != 0 && !loading ? false : true}>
                    Generate
                    </Button>
            </div>
        </Layout>
    )

}
export default GenPage
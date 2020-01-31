import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import Papa from "papaparse"
import axios from 'axios'
import API from '../api'
import DataTable from '../Components/DataTable'

import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components/dist';

// import component 
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { generate } from 'csv'

const GenPage = () => {
    const [data, setJson] = useState([])
    const [tableBody, setTableBody] = useState(<tr><td colSpan="5">Empty</td></tr>)
    const [genRole, setRole] = useState('Student')
    const [fileName, setFileNamed] = useState(<p>Click to upload .CSV file</p>)

    useEffect(() => {
        if (data.length != 0) {
            setTableBody(data.map((person, index) => {
                return (
                    // check role
                    <tr key={person.id}>
                        <td>{person.id}</td>
                        <td>{person.name} {person.surname}</td>
                        <td>{person.id + 'kmitl.ac.th'}</td>
                        {/* <td>{person.faculty}</td>
                        <td>{person.year}</td> */}
                        <td onClick={() => deleteStudent(index)}><button class='button is-danger' >Delete</button></td>
                    </tr>
                );
            }))
        } else {
            setTableBody(<tr><td colSpan="5">Empty</td></tr>)
        }
    }, [data])

    const deleteStudent = stdIndex => {
        const stdTemp = [...data];
        stdTemp.splice(stdIndex, 1);
        setJson(stdTemp)
        console.log(data)
    };
    const generateAccount = () => {
        data.forEach((dataStudent, i) => {
            setTimeout(() => {
                createAccount(dataStudent)
            }, i * 2000);
        })
    }
    const del = (ee) => {
        console.log(ee)
    }
    const createAccount = (dataStd) => {
        const dataStudent = {
            email: dataStd.id + '@kmitl.ac.th',
            name: dataStd.name,
            surname: dataStd.surname
        }
        API.post('createAccount/', dataStudent)
            .then(function (response) {
                console.log(dataStudent)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const handleRole = (role) => {
        setRole(role)
        setJson([])
        console.log(genRole)
    }
    const onDrop = (e) => {
        const reader = new FileReader();
        reader.readAsText(e[0]);
        // set File name 
        setFileNamed(<p>{e[0].path}</p>)
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
    let btnstdClass = genRole == 'Student' ? 'is-primary' : ''
    let btntchClass = genRole == 'Teacher' ? 'is-primary' : ''
    return (

        <div className='Page'>
            <Navbar />
            <div className='section'>
                <div className='columns'>
                    <Sidebar />
                    <main className='column main'>
                        <div style={styles.container}>
                            <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>Generate Account</h1>
                            <div class='box'>
                                <p>Select Role</p>
                                <div>
                                    <Button className={btnstdClass} onClick={() => handleRole('Student')}>Student</Button>
                                    <Button className={btntchClass} onClick={() => handleRole('Teacher')}>Teacher</Button>
                                </div>
                                <p>Upload .CSV File</p>
                                <div class="field is-grouped">
                                    <div style={{ borderStyle: 'solid', borderColor: 'black', borderWidth: 1, width: '80%', height: 40 }}>
                                        <Dropzone onDrop={onDrop}>
                                            {({ getRootProps, getInputProps }) => (
                                                <section>
                                                    <div {...getRootProps()}>
                                                        <input {...getInputProps()} />
                                                        {fileName}
                                                    </div>
                                                </section>
                                            )}
                                        </Dropzone>
                                    </div>
                                </div>
                            </div>
                            <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>{genRole} Data</h1>
                            <DataTable data={data} del={deleteStudent} />
                            <Button className='is-primary' onClick={generateAccount} disabled={data.length != 0 ? false : true}>Generate</Button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )

}
const styles = {
    container: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '60%'
    },
    baseStyle: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    }
}
export default GenPage
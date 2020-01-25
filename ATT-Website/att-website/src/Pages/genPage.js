import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import Papa from "papaparse"
import axios from 'axios'
import API from '../api'

import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components/dist';

// import component 
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { generate } from 'csv'

const GenPage = () => {
    const [data, setJson] = useState([])
    const [tableBody, setTableBody] = useState(<tr><td colSpan="2">Empty</td></tr>)
    useEffect(() => {
        console.log(data.length)
        if (data.length!=0) {
            setTableBody(data.map((person, index) => {
                return (
                    <tr key={person.id}>
                        <td>{person.id}</td>
                        <td>{person.name} {person.surname}</td>
                        <td>{person.faculty}</td>
                        <td>{person.year}</td>
                        <td onClick={() => deleteStudent(index)}><button class='button is-danger' >Delete</button></td>
                    </tr>
                );
            }))
        } else {
            setTableBody(<tr><td colSpan="2">Empty</td></tr>)
            console.log("eiei")
        }
    }, [data])
    const deleteStudent = stdIndex => {
        const stdTemp = [...data];
        stdTemp.splice(stdIndex, 1);
        setJson(stdTemp)
    };
    const generateAccount = () => {
        data.forEach((dataStudent, i) => {
            setTimeout(() => {
                createAccount(dataStudent)
            }, i * 1500);
        })
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
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const onDrop = (e) => {
        const reader = new FileReader();
        reader.readAsText(e[0]);
        reader.onload = () => {
            Papa.parse(e[0], {
                header: true,
                complete: function (results) {
                    results.data.pop()
                    setJson(results.data)
                    console.log(data)
                }
            });
        };
    }
    return (
        <div class='page' style={{ height: '100vh' }}>
            <Navbar />
            <div class='columns'>
                <Sidebar />
                <div class='column' >
                    <div style={styles.container}>
                        <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>Generate Account Student</h1>
                        <div class='box'>
                            <p>Select Role</p>
                            <div>
                                <Button className='is-primary'>Student</Button>
                                <Button >Teacher</Button>
                            </div>
                            <p>Upload .CSV File</p>
                            <div class="field is-grouped">
                                <div style={{ borderStyle: 'solid', borderColor: 'black', borderWidth: 1, width: '80%', height: 40 }}>
                                    <Dropzone onDrop={onDrop}>
                                        {({ getRootProps, getInputProps }) => (
                                            <section>
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Click here to upload file .CSV</p>
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                </div>
                            </div>
                        </div>
                        <table class='table'>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Name-Surname</th>
                                    <th>faculty</th>
                                    <th>year</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableBody}
                            </tbody>
                        </table>
                        <button className='button is-primary' onClick={generateAccount}>Save</button>
                    </div>
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
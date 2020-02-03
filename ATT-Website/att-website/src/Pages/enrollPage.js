import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import Papa from "papaparse"
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components/dist';
import app from '../firebase'

// import component 
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

const Enrollpage = () => {
    const [data, setJson] = useState([])    

    const deleteStudent = stdIndex => {
        const stdTemp = [...data];
        stdTemp.splice(stdIndex, 1);
        setJson(stdTemp)
    };

    const onDrop = (e) => {
        const reader = new FileReader();
        reader.readAsText(e[0]);
        reader.onload = () => {
            Papa.parse(e[0], {
                header: true,
                complete: function (results) {
                    results.data.pop()
                    setJson(results.data)
                }
            });
        };
    }
    return (
        <div class='Page'>
            <Navbar />
            <div className='section'>
                <div class='columns'>
                    <Sidebar />
                    <main className='column main'>
                        <div class='column' >
                            <div style={styles.container}>
                                <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>Enroll Student</h1>
    
                                <div class='box'>
                                    <p>Enter Subject</p>
                                    <input class='input' placeholder='subject_id,subjectName'></input>
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
                                        {data.map((person, index) => {
                                            return (
                                                <tr key={person.id}>
                                                    <td>{person.id}</td>
                                                    <td>{person.name} {person.surname}</td>
                                                    <td>{person.faculty}</td>
                                                    <td>{person.year}</td>
                                                    <td onClick={() => deleteStudent(index)}><button class='button is-danger' >Delete</button></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <Button class='button is-primary'>Enroll</Button>
                            </div>
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
    }
}
export default Enrollpage
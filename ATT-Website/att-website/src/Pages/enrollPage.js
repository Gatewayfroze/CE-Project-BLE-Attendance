import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import Papa from "papaparse"
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components/dist';
import app from '../firebase'
import DataTable from '../Components/DataTable'
// import component 
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

const Enrollpage = () => {
    const [data, setJson] = useState([])
    const [fileName, setFileNamed] = useState(<p>Click here to upload .CSV file</p>)

    const deleteUser = userIndex => {
        const userTemp = [...data];
        userTemp.splice(userIndex, 1);
        setJson(userTemp)
        console.log(data)
    };
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
                    console.log(results.data)
                }
            });
        };
    }
    const tableExtend = []
    tableExtend.push({ text: 'Delete', class: 'is-danger', function: deleteUser })

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
                                    <div className='field'>
                                        <label className='label'>Enter Subject</label>
                                        <input className='input' placeholder='subject_id,subjectName'></input>
                                    </div>
                                    <div className='field'>
                                        <label className='label'>Upload .CSV File</label>
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
                                </div>
                                <DataTable data={data} extraHeader={['Delete']} extraCol={tableExtend}/>
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
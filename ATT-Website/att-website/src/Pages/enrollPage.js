import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import Papa from "papaparse"
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components/dist';
import NumberFormat from 'react-number-format';
import DataTable from '../Components/DataTable'
// import component 
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

const Enrollpage = () => {
    const [data, setJson] = useState([])
    const [fileName, setFileNamed] = useState(<p>Click here to upload .CSV file</p>)
    const [subjectDetail, setSubjectDetail] = useState('')
    useEffect(()=>{
        if(subjectDetail.replace(/ /g,"").length===8){
            console.log('ready!!')
            // prepare to fetch data
        }
    },[subjectDetail])

    const deleteUser = userIndex => {
        const userTemp = [...data];
        userTemp.splice(userIndex, 1);
        setJson(userTemp)
        console.log(data)
    };
    const handleSubjectDetail = (e) => {
        setSubjectDetail(e.target.value)
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
                                        <NumberFormat className='input' name='subjectID' placeholder='subject_id' value={subjectDetail} onChange={handleSubjectDetail}
                                        format='########'/>
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
                                <DataTable data={data} extraHeader={['Delete']} extraCol={tableExtend} />
                                <div style={{ marginTop: 10 }}>
                                    <Button class='button is-primary' disabled={subjectDetail.length === 0 || data.length === 0 ? true : false}>Enroll</Button>
                                </div>
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
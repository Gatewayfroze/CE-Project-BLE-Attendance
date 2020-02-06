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
import Alert from '../Components/Alert'

const Enrollpage = () => {
    const [data, setJson] = useState([])
    const [fileName, setFileNamed] = useState(<p>Click here to upload .CSV file</p>)
    const [subjectDetail, setSubjectDetail] = useState('')
    const [textAlert,setTextAlert]=useState(false)
    useEffect(() => {
        if (subjectDetail.replace(/ /g, "").length === 8) {
            console.log('ready!!')
            // prepare to fetch data
        }
    }, [subjectDetail])

    const deleteUser = userIndex => {
        const userTemp = [...data];
        userTemp.splice(userIndex, 1);
        setJson(userTemp)
        console.log(data)
    };
    const handleSubjectDetail = (e) => {
        setSubjectDetail(e.target.value)
    }
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
        reader.onload = () => {
            Papa.parse(e[0], {
                header: true,
                complete: function (results) {
                    results.data.pop()
                    // set data from file to json
                    const key = Object.keys(results.data[0])
                    const studentKey = ['id','name', 'surname', 'faculty', 'year']
                    // const teacherKey = ['id','name', 'surname', 'Email']
                    if(!(JSON.stringify(key.sort()) === JSON.stringify(studentKey.sort()))){
                        alert('Your CSV File is corrupted')
                        return
                    }
                    setJson(results.data)
                    setFileNamed(<p>{fileName}</p>)
                }
            });
        };
    }

    return (
        <div class='Page'>
            <Alert text={textAlert} enable={textAlert}/>
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
                                            format='########' />
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
                                <DataTable columns={columnsStd} data={data} extraHeader={['Delete']} extraCol={tableExtend} />
                                <div style={{ marginTop: 10 }}>
                                    <Button class='button is-primary' disabled={subjectDetail.replace(/ /g, "").length !== 8 || data.length === 0 ? true : false}>Enroll</Button>
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
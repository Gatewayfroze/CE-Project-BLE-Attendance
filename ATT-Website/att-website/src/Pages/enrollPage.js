import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import Papa from "papaparse"
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components/dist';
import NumberFormat from 'react-number-format';
import DataTable from '../Components/DataTable'
import API from '../api'
// import component 
import Alert from '../Components/Alert'
import Layout from '../Layout/layout'
import Spinner from '../Components/Spinner'
const Enrollpage = () => {
    const [data, setJson] = useState([])
    const [fileName, setFileNamed] = useState(<p>Click here to upload .CSV file</p>)
    const [subjectDetail, setSubjectDetail] = useState('')
    const [textAlert, setTextAlert] = useState('')
    const [alert, isAlert] = useState(false)
    const [subjectName, setSubjectName] = useState('')
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        if (subjectDetail.replace(/ /g, "").length === 8) {
            console.log('ready!!')
            setLoading(true)
            // prepare to fetch data
            API.post('getSubject/', { subjectID: subjectDetail })
                .then(function (response) {
                    console.log(response.data)
                    setSubjectName(response.data.subjectName)
                    setLoading(false)
                })
                .catch(function (error) {
                    console.log(error)
                })
        } else {
            setSubjectName('')
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
            setTextAlert('Please upload CSV file only')
            isAlert(true)
            return
        }
        reader.onload = () => {
            Papa.parse(e[0], {
                header: true,
                complete: function (results) {
                    results.data.pop()
                    // set data from file to json
                    const key = Object.keys(results.data[0])
                    const studentKey = ['id', 'name', 'surname', 'faculty', 'year']
                    // const teacherKey = ['id','name', 'surname', 'Email']
                    if (!(JSON.stringify(key.sort()) === JSON.stringify(studentKey.sort()))) {
                        setTextAlert('eiei')
                        isAlert(true)
                        return
                    }
                    setJson(results.data)
                    setFileNamed(<p>{fileName}</p>)
                }
            });
        };
    }
    const hadelClose = () => {
        isAlert(false)
        setTextAlert('')
    }
    return (
        <Layout>
            <Alert text={textAlert} enable={alert} close={hadelClose} />
            <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>Enroll Student</h1>
            <div class='box'>
                <div className='field'>
                    <label className='label'>Enter Subject</label>
                    <div className='field is-grouped'>
                        <NumberFormat className='input' name='subjectID' placeholder='subject_id' value={subjectDetail} onChange={handleSubjectDetail}
                            format='########' />
                        {loading&&<Spinner />}
                    </div>
                    <p>{subjectName}</p>
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
        </Layout>
    )
}
export default Enrollpage
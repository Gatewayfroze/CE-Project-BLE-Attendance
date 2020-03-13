import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import Papa from "papaparse"
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components/dist';
import MaterialTable from 'material-table'
import DataTable from '../Components/DataTable'
import API from '../api'
// import component 
import Alert from '../Components/Alert'
import Layout from '../Layout/layout'
import Loader from '../Components/loader'
const columns = [
    { title: 'Room', field: 'boardName' },
    { title: 'ServiceUID', field: 'serviceUID' },
    { title: 'MAC', field: 'mac' },
]

const BLEDataPage = () => {
    const [data, setJson] = useState([])
    const [fileName, setFileNamed] = useState(<p>Click here to upload .CSV file</p>)
    const [subjectDetail, setSubjectDetail] = useState('')
    const [textAlert, setTextAlert] = useState('')
    const [alert, isAlert] = useState(false)
    const [subjectName, setSubjectName] = useState('')
    const [boardData, setBoardData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetchBoard()
    }, [])
    const fetchBoard = () => {
        API.post('getBoard/').then((res) => {
            setBoardData(res.data)
            console.log(res.data)
        })
    }
    const deleteUser = userIndex => {
        const userTemp = [...data];
        userTemp.splice(userIndex, 1);
        setJson(userTemp)
        console.log(data)
    };
    const columnDefault = [
        { id: 'boardName', label: 'Room', minWidth: 100 },
        { id: 'serviceUID', label: 'Service UID', minWidth: 100 },
        { id: 'mac', label: 'MAC', minWidth: 100 },
    ]
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
                    const studentKey = ['boardName', 'serviceUID', 'mac']
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

    const generateBLE = () => {
        setLoading(true)
        data.forEach((dataBLE, i) => {
            setTimeout(() => {
                createdata(dataBLE)
            }, i * 1000);
        })
        // calculate timeout (psuedo)
        setTimeout(() => {
            setLoading(false)
        }, 1000 * data.length);
    }
    const createdata = (dataBLE, fn = (() => { })) => {
        console.log(dataBLE)
        API.post('addBoard/', dataBLE)
            .then(function (response) {
                console.log(response)
                fetchBoard()
                fn()
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const deleteBoard = (id, fn = (() => { })) => {
        API.post('deleteBoard/', { id })
            .then(function (response) {
                fetchBoard()
                fn()
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const hadelClose = () => {
        isAlert(false)
        setTextAlert('')
    }

    return (
        <Layout loading={loading && <Loader />}>
            <Alert text={textAlert} enable={alert} close={hadelClose} />
            <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>Upload BLE Data</h1>
            <div class='box'>
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
                    <DataTable columns={columnDefault} data={data} extraHeader={['Delete']} extraCol={tableExtend} />
                    <div style={{ marginTop: 10 }}>
                        <button className='button is-warning' onClick={generateBLE} disabled={data.length === 0 ? true : false}>Save</button>
                    </div>
                </div>
            </div>
            <MaterialTable
                title="Board Data"
                columns={columns}
                data={boardData}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            createdata(newData, resolve)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            deleteBoard(oldData.id, resolve)
                        }),
                }}
            />
        </Layout>
    )
}
export default BLEDataPage
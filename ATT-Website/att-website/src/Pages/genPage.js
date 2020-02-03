import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import Papa from "papaparse"
import API from '../api'
import DataTable from '../Components/DataTable'
import TableCell from '@material-ui/core/TableCell';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components/dist';

// import component 
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

const GenPage = () => {
    const [data, setJson] = useState([])
    const [tableBody, setTableBody] = useState(<tr><td colSpan="5">Empty</td></tr>)
    const [genRole, setRole] = useState('Student')
    const [fileName, setFileNamed] = useState(<p>Click here to upload .CSV file</p>)


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
                        <td onClick={() => deleteUser(index)}><button class='button is-danger' >Delete</button></td>
                    </tr>
                );
            }))
        } else {
            setTableBody(<tr><td colSpan="5">Empty</td></tr>)
        }
    }, [data])

    const deleteUser = userIndex => {
        const userTemp = [...data];
        userTemp.splice(userIndex, 1);
        setJson(userTemp)
        console.log(data)
    };
    const generateAccount = () => {
        data.forEach((dataUser, i) => {
            setTimeout(() => {
                createAccount(dataUser)
            }, i * 2000);
        })
    }
    const createAccount = (dataUser) => {
        const user = {
            email: dataUser.id + '@kmitl.ac.th',
            name: dataUser.name,
            surname: dataUser.surname,
            role: genRole.toLowerCase()
        }
        console.log(user.role)
        API.post('createAccount/', user)
            .then(function (response) {
                console.log(user)
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
    const printUser = userIndex => {
        console.log(data[userIndex])
    };
    // toggle role of account
    let btnstdClass = genRole === 'Student' ? 'is-primary' : ''
    let btntchClass = genRole === 'Teacher' ? 'is-primary' : ''
    // set element extend table in Datatable
    const tableExtend = []
    tableExtend.push({ text: 'Delete', class: 'is-danger', function: deleteUser })
    tableExtend.push({ text: 'print', class: '', function: printUser })
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
                                <div class="buttons has-addons" style={{ marginBottom: '0' }}>
                                    <Button className={btnstdClass} onClick={() => handleRole('Student')}>Student</Button>
                                    <Button className={btntchClass} onClick={() => handleRole('Teacher')}>Teacher</Button>
                                </div>
                                <p>Upload .CSV File</p>
                                <div class="field is-grouped">
                                    <Button className='is-primary is-outlined' >
                                        {/* <span class="icon">
                                            <i class="fas fa-home"></i>
                                        </span> */}
                                        <span>
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
                                        </span>
                                    </Button>
                                </div>
                            </div>
                            <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>{genRole} Data</h1>
                            <DataTable data={data} extraHeader={['Delete', 'Print']} extraCol={tableExtend} />
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
import React, { useState } from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components/dist';

// import component 
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

const CreateSubPage = props => {
    const [countSchedule, setSchedule] = useState(0)

    const createTable = () => {
        let table = []
        for (let i = 0; i < countSchedule; i++)
            table.push(
                <div className='field is-grouped'>
                    <div className='control'>
                        <input className='input' placeholder='date' />
                    </div>
                    <div className='control'>
                        <input className='input' placeholder='start time' />
                    </div>
                    <div className='control'>
                        <input className='input' placeholder='end time' />
                    </div>
                    <div className='control'>
                        <button className='button is-danger'>Delete</button>
                    </div>
                </div>

            )
        console.log(table)
        return table
    }

    return (
        <div class='page'>
            <Navbar />
            <div class='columns'>
                <Sidebar />
                <div class='column' >
                    <div style={styles.container}>
                        <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>Create Subject</h1>
                        <div class='box'>
                            <div className="field">
                                <label className='label'>Subject Name</label>
                                <input class='input' placeholder=''></input>
                            </div>
                            <div className="field">
                                <label className='label'>Subject Detail</label>
                                <textarea class='textarea' placeholder='รหัสวิชา,ชื่อวิชา'></textarea>
                            </div>
                            <div className="field is-grouped">
                                <div className='control'>
                                    <label className='label'>Schedule</label>
                                </div>
                                <div className='control'>
                                    <button className='button is-primary' onClick={() => setSchedule(countSchedule + 1)}>Add</button>
                                </div>
                            </div>
                            {createTable()}
                        </div>
                        <Button class='button is-primary'>Create</Button>

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
    }
}
export default CreateSubPage 
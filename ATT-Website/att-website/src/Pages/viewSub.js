import React, { useState } from 'react'
import { Button } from 'react-bulma-components/dist';
// import component 
import API from '../api'
import Layout from '../Layout/layout'
import DataTable from '../Components/DataTable'
import Loader from '../Components/loader'

const Enrollpage = () => {
    const [loading, setLoading] = useState(false)
    const columnDefault = [
        { id: 'id', label: 'Student ID', minWidth: 100 },
        { id: 'name', label: 'Name', minWidth: 100 },
        { id: 'surname', label: 'Surname', minWidth: 100 },
    ]
    return (
        <Layout loading={loading && <Loader />}>
            <h1 style={{ color: 'rgb(69, 172, 156)', fontSize: 30, margin: 20 }}>View Account</h1>
            <div class='box'>
                <label className='label '>Enter Data to search</label>
                <div class="field is-grouped has-addons">
                    <input class='input is-primary' placeholder='ID,name' />
                    <Button>Search</Button>
                </div>
            </div>
            <DataTable columns={columnDefault} data={[]} extraHeader={[]} extraCol={[]} />
        </Layout>
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
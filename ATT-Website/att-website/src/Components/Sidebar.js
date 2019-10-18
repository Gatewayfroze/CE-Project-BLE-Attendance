import React from 'react'

const Sidebar = (props) => {
    return (
        <aside class="menu column is-2" style={{ backgroundColor: 'rgb(69, 172, 156)', height: '95.5vh' }} >
            <ul class="menu-list">
                <li><a>Dashboard</a></li>
                <li><a>Customers</a></li>
            </ul>
        </aside>
    )
}

export default Sidebar
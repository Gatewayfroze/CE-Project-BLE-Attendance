import React from 'react'

const Sidebar = (props) => {
    return (
        <aside class="menu column is-2" style={{ backgroundColor: 'rgb(69, 172, 156)', height: '95.5vh' }} >
            <ul class="menu-list">
                <li><a href='/generate'>Generate Account</a></li>
                <li><a href='/enroll'>Enroll Student</a></li>
                <li><a href='/viewStd'>Manage Student</a></li>
                <li><a href='/viewSub'>Manage Subject</a></li>
            </ul>
        </aside>
    )
}

export default Sidebar
import React from 'react'

const Sidebar = (props) => {
    return (
        <aside class="menu column is-2 aside" style={{ backgroundColor: 'rgb(69, 172, 156)'}} >
            <p class='menu-label' style={{color:'white' ,fontSize:20,padding:10}}>Menu</p>
            <ul class="menu-list">
                <li><a href='/generate'>Generate Account</a></li>
                <li><a href='/enroll'>Enroll Student</a></li>
                <li><a href='/viewStd'>Manage Account</a></li>
                <li><a href='/viewSub'>Manage Subject</a></li>
                <li><a href='/createSub'>Create Subject</a></li>
            </ul>
        </aside>
    )
}
export default Sidebar
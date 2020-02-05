import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';

const Sidebar = (props) => {
    return (
        <aside class="menu column is-2 aside" style={{ backgroundColor: 'rgb(69, 172, 156)' }} >
            <p  style={{ color: 'white', fontSize: 20, padding: 10 }}>Menu</p>
            <ul class="menu-list">
                <li><a style={styles.textMenu} href='/generate'>Generate Account</a></li>
                <li><a style={styles.textMenu} href='/enroll'>Enroll Student</a></li>
                <li><a style={styles.textMenu} href='/viewStd'>Manage Account</a></li>
                <li><a style={styles.textMenu} href='/viewSub'>Manage Subject</a></li>
                <li><a style={styles.textMenu} href='/createSub'>Create Subject</a></li>
            </ul>
        </aside>
    )

}
const styles = {
    textMenu: {
        color: 'black',
    }
}
export default Sidebar
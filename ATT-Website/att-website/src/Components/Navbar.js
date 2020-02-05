import React, { useEffect, useState } from 'react'
import app from '../firebase'
import Person from 'react-ionicons/lib/MdPerson'

const Navbar = (props) => {
    const [curUser, setcurUser] = useState(null)

    useEffect(() => {
        app.auth().onAuthStateChanged(function (user) {
            if (user) {
                setcurUser(user.email)
                console.log(user)
            } else {

            }
        });

    }, [])

    return (
        <header className='hero'>
            <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
            <div className='hero-head'>
                <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="/">
                            ATTENDA
                        </a>
                    </div>
                    <div id="navbarBasicExample" class="navbar-menu">
                        <div class="navbar-end">
                            <div class="navbar-item">
                                <div className='field is-grouped'>
                                    <div className='control'>
                                        <Person onClick={() => alert('Hi!')} fontSize="30px" />
                                    </div>
                                    <div className='control'>
                                    <p>{curUser}</p>
                                    </div>
                                    <div class="buttons">
                                        <a class="button is-dark" onClick={() => app.auth().signOut()}>
                                            Logout
                                    </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>


    )
}
export default Navbar
import React, { useEffect, useState } from 'react'
import app from '../firebase'


const Navbar = (props) => {
    const [curUser, setcurUser] = useState(null)

    useEffect(() => {
        app.auth().onAuthStateChanged(function (user) {
            if (user) {
                setcurUser(user.email)
            } else {
                console.log('no')
            }
        });

    }, [])

    return (
        <header className='hero'>
            <div className='hero-head'>
                <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="/">
                            ATTENDA
                </a>
                        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>

                    </div>

                    <div id="navbarBasicExample" class="navbar-menu">
                        {/* <div class="navbar-start">

</div> */}

                        <div class="navbar-end">
                            <div class="navbar-item">
                                <h2>{curUser}</h2>
                                <div class="buttons">
                                    <a class="button is-dark" onClick={() => app.auth().signOut()}>
                                        Logout
                                    </a>
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
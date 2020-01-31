import React from 'react'



const Navbar = (props) => {

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
                                <div class="buttons">
                                    <a  class="button is-dark">
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
import React, { useEffect, useState } from 'react'
import app from '../firebase'
import Person from 'react-ionicons/lib/MdPerson'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    logoContainer: {
        padding: 0,
        marginLeft:'10px'
    },
    rightMenu: {
        marginLeft: 'auto'
    },
    title: {
        color:'white'
    },
    button: {
        borderRadius: '50px',
        marginRight: '25px',
        marginLeft: '15px'
    }
}))
const Navbar = (props) => {
    const classes = useStyles()
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
        <React.Fragment>
            <AppBar position='static' className={classes.toolbarMargin}>
                <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
                <Toolbar disableGutters>
                    <div className={classes.logoContainer}>
                        <Typography className={classes.title} variant='h4'  >
                            ATTENDA
                    </Typography>
                    </div>
                    <div className={classes.rightMenu}>
                        <Person onClick={() => alert('Hi!')} fontSize="30px" />
                        {curUser}
                        <Button variant="contained" className={classes.button} color='secondary' onClick={() => app.auth().signOut()}>logout</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </React.Fragment>


    )
}
export default Navbar
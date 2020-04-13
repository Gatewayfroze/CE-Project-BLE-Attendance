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
        marginLeft: '10px'
    },
    rightMenu: {
        marginLeft: 'auto'
    },
    title: {
        color: 'white'
    },
    button: {
        borderRadius: '50px',
        marginRight: '25px',
        marginLeft: '15px'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
}))
const Navbar = (props) => {
    const classes = useStyles()
    
    return (
        <React.Fragment>
            <AppBar position='fixed' className={classes.appBar}>
                <Toolbar disableGutters>
                    <div className={classes.logoContainer}>
                        <Typography className={classes.title} variant='h4'  >
                            ATTENDA
                        </Typography>
                    </div>
                    <div className={classes.rightMenu}>
                        <Person onClick={() => alert('Hi!')} fontSize="30px" />
                        {props.currentUser}
                        <Button variant="contained" className={classes.button} color='secondary' onClick={() => app.auth().signOut()}>logout</Button>
                    </div>
                </Toolbar>
            {props.loading}
            </AppBar>
        </React.Fragment>


    )
}
export default Navbar
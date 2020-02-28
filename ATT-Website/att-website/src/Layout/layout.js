import React, { useState, useEffect } from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import DataTable from '../Components/DataTable'
import Container from '@material-ui/core/Container'
// import component 
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import Alert from '../Components/Alert'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography } from '@material-ui/core'
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        paddingTop: 20
    },
    toolbar: theme.mixins.toolbar,
}))
const Layout = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar loading={props.loading} />
            <Sidebar />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Container maxWidth={props.size ? props.size : 'md'}>
                    {props.children}
                </Container>
            </main>
        </div>
    )
}
export default Layout
import React, { useState, useEffect } from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import DataTable from '../Components/DataTable'
import Container from '@material-ui/core/Container'
// import component 
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    AppBar, Toolbar, Typography, Tab, Tabs,
    Button, List, ListItem, Grid, SwipeableDrawer
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        paddingTop: 20,
    },
    toolbar: theme.mixins.toolbar,
    title: {
        flexGrow: 1,
        color:'white'
      },
}))
const Layout = (props) => {
    const classes = useStyles()
    const [drawerActivate, setDrawerActivate] = useState(false)
    const [drawer, setDrawer] = useState(false)

    useEffect(() => {
        if (window.innerWidth <= 700) {
            setDrawerActivate(true)
        }
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 700) {
                setDrawerActivate(true)
            }
            else {
                setDrawerActivate(false)
            }
        });
    })

    const createDrawer = () => {
        return (
            <div>
                <AppBar >
                    <Toolbar>
                        
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <MenuIcon
                                onClick={() => setDrawer(true)} />
                            <div style={{ display: 'flex' }}>
                            </div>
                        </Grid>
                        <Typography variant="h4" className={classes.title}>
                            ATTENDA
                        </Typography>
                    </Toolbar>
                </AppBar>

                <SwipeableDrawer
                    open={drawer}
                    onClose={() => setDrawer(false)}
                    onOpen={() => setDrawer(true)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => setDrawer(false)}
                        onKeyDown={() => setDrawer(false)}>
                        <Sidebar />
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
    const destroyDrawer = () => {
        return (
            <React.Fragment>
                <Navbar loading={props.loading} />
                <Toolbar disableGutters>
                    <Sidebar />
                </Toolbar>
                <div className={classes.toolbarMargin} />
            </React.Fragment>
        )
    }
    return (
        <div className={classes.root} style={{backgroundColor:'#f7f7f7'}}>
            {drawerActivate ? createDrawer() : destroyDrawer()}
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
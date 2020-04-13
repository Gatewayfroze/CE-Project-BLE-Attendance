
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import isAdmin from '../constant/adminUID'
// icon
import CreateSub from 'react-ionicons/lib/IosCreate'
import Account from 'react-ionicons/lib/IosContact'
import CreateUser from 'react-ionicons/lib/MdPersonAdd'
import Subject from 'react-ionicons/lib/MdDocument'
import Enroll from 'react-ionicons/lib/IosDownload'
import Bluetooth from 'react-ionicons/lib/IosBluetooth'


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: 'rgb(69, 172, 156)',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    menuList: {
        height: '45px',
        paddingLeft: '20px'
    },
    menuText: {
        // color:'#4d4d4d',
        color: '#f0f0f0',
        paddingLeft: 10
    }
}));
function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}
export default function ClippedDrawer(props) {
    const classes = useStyles();
    const list = [
        { name: 'Generate Accout', icon: CreateUser, link: '/generate' },
        { name: 'BLE Data', icon: Bluetooth, link: '/bledata' },
        { name: 'Enroll Student', icon: Enroll, link: '/enroll' },
        { name: 'Manage Account', icon: Account, link: '/viewStd' },
        { name: 'Create Subject', icon: CreateSub, link: '/createSub' },
        { name: 'Manage Subject', icon: Subject, link: '/viewSub' },
    ]
    const adminMenu=[1,3]
    const listMenu = list.map((menu, i) => {
        console.log(props.currentUser)
        if (!(i in adminMenu)||(i in adminMenu&&isAdmin(props.currentUser))) {
            return (
                <React.Fragment>
                    <ListItemLink className={classes.menuList} href={menu.link}>
                        <menu.icon color='rgba(0, 0, 0, 0.54)' fontSize="23px" />
                        <ListItemText className={classes.menuText} primary={menu.name} />
                    </ListItemLink>
                    {i == 3 || i == 1 ? <Divider /> : ''}
                </React.Fragment>
            )
        } else {
            return null
        }

    })

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar} />
            <List style={{ marginTop: 20 }} component="nav" >
                {listMenu}
            </List>

        </Drawer>
    );
}
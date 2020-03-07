// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';


// // icon
// import CreateSub from 'react-ionicons/lib/IosCreate'
// import Account from 'react-ionicons/lib/IosContact'
// import CreateUser from 'react-ionicons/lib/MdPersonAdd'
// import Subject from 'react-ionicons/lib/MdDocument'
// import Enroll from 'react-ionicons/lib/IosDownload'


// function ListItemLink(props) {
//     return <ListItem button component="a" {...props} />;
// }
// const useStyles = makeStyles(theme => ({
//     toolbarMargin: {
//         ...theme.mixins.toolbar,
//     },
//     menuList: {
//         height: '45px',
//         paddingLeft: '20px'
//     },
//     menuText: {
//         // color:'#4d4d4d',
//         color: '#f0f0f0',
//         paddingLeft: 10
//     }
// })
// )
// const Sidebar = (props) => {
//     const list = [
//         { name: 'Generate Accout', icon: CreateUser, link: '/generate' },
//         { name: 'Enroll Student', icon: Enroll, link: '/enroll' },
//         { name: 'Manage Account', icon: Account, link: '/viewStd' },
//         { name: 'Manage Subject', icon: Subject, link: '/viewSub' },
//         { name: 'Create Subject', icon: CreateSub, link: '/createSub' },
//     ]
//     const classes = useStyles()
//     return (
//         <aside class="menu column is-2 aside" style={{ backgroundColor: 'rgb(69, 172, 156)', padding: 0 }} >
//             <List style={{ marginTop: 20 }} component="nav" >
//                 {list.map((menu, i) => (
//                     <ListItemLink className={classes.menuList} href={menu.link}>
//                         <menu.icon color='#212121' fontSize="23px" />
//                         <ListItemText className={classes.menuText} primary={menu.name} />
//                     </ListItemLink>
//                 ))}
//             </List>
//         </aside>
//     )

// }
// const styles = {
//     textMenu: {
//         color: 'black',
//     }
// }
// export default Sidebar

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

// icon
import CreateSub from 'react-ionicons/lib/IosCreate'
import Account from 'react-ionicons/lib/IosContact'
import CreateUser from 'react-ionicons/lib/MdPersonAdd'
import Subject from 'react-ionicons/lib/MdDocument'
import Enroll from 'react-ionicons/lib/IosDownload'
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
export default function ClippedDrawer() {
    const classes = useStyles();
    const list = [
        { name: 'Generate Accout', icon: CreateUser, link: '/generate' },
        { name: 'Enroll Student', icon: Enroll, link: '/enroll' },
        { name: 'Manage Account', icon: Account, link: '/viewStd' },
        { name: 'Create Subject', icon: CreateSub, link: '/createSub' },
        { name: 'Manage Subject', icon: Subject, link: '/viewSub' },
    ]
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
                {list.map((menu, i) => {
                    return (
                        <React.Fragment>
                            <ListItemLink className={classes.menuList} href={menu.link}>
                                <menu.icon color='rgba(0, 0, 0, 0.54)' fontSize="23px" />
                                <ListItemText className={classes.menuText} primary={menu.name} />
                            </ListItemLink>
                            
                            {i==2||i==0?<Divider />:''}
                        </React.Fragment>

                    )
                })}
            </List>

        </Drawer>
    );
}
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}
const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
    },
    menuList:{
        height:'45px',
        paddingLeft:'20px'
    },
    menuText:{
        color:'#4d4d4d'
    }
})
)
const Sidebar = (props) => {
    const list = [{ name: 'Generate Accout', link: '/generate' },
    { name: 'Enroll Student', link: '/enroll' },
    { name: 'Manage Account', link: '/viewStd' },
    { name: 'Manage Subject', link: '/viewSub' },
    { name: 'Create Subject', link: '/createSub' },
    ]
    const classes=useStyles()
    return (
        <aside class="menu column is-2 aside" style={{ backgroundColor: 'rgb(69, 172, 156)', padding: 0 }} >
            <List component="nav" >
                {list.map((menu, i) => (
                    <ListItemLink className={classes.menuList} href={menu.link}>
                        <ListItemText className={classes.menuText} primary={menu.name} />
                    </ListItemLink>
                ))}
            </List>
        </aside>
    )

}
const styles = {
    textMenu: {
        color: 'black',
    }
}
export default Sidebar
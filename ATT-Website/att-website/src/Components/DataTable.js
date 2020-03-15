import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import BT from '@material-ui/core/Button';
import { Button } from 'react-bulma-components/dist';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    button: {
        textTransform: 'none',
    }
}));
const DataTable = (props) => {
    const rows = [
        ...props.data
    ];
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const columns = props.columns
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        console.log(newPage)
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const height = props.maxHeight ? props.maxHeight : 250
    return (
        <Paper className={classes.root}>
            <TableContainer style={{ maxHeight: height }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            {props.extraHeader.map(header => (
                                <TableCell>{header}</TableCell>
                            ))}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map(column => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                    {/* <TableCell><Button className='is-danger' onClick={()=>props.del(i)} >Delete</Button></TableCell> */}
                                    {props.extraCol.map((ButtonCol) => {
                                        return (
                                            ButtonCol.link ?
                                                <TableCell><a className={`button ${ButtonCol.class}`} style={{ textDecoration: 'none' }} href={ButtonCol.link ? `viewSub/${ButtonCol.link(page * rowsPerPage + i)}` : '#'} >{ButtonCol.text}</a></TableCell>
                                                :
                                                <TableCell><a className={`button ${ButtonCol.class}`} style={{ textDecoration: 'none' }} onClick={() => ButtonCol.function(page * rowsPerPage + i)} >{ButtonCol.text}</a></TableCell>

                                        )
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
export default DataTable
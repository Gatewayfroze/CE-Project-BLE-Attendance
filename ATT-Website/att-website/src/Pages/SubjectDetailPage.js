import React, { useState, useEffect } from 'react'
// import component 
import { Link } from 'react-router-dom'
import Layout from '../Layout/layout'
import Loader from '../Components/loader'
import {
    Typography,
    Grid,
    Button,
    Card,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import {
    ScheduleGraph,
    UsersByDevice,
} from '../Components/Dashboard';
import API from '../api'
import Student from '../Components/Dashboard/studentInSubject'
import EditSch from '../Components/Dashboard/editSch'
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
}));
const ViewSubjectPage = ({ match }, ...props) => {
    const classes = useStyles();
    const subjectID = match.params.subjectID
    const [loading, setLoading] = useState(false)
    const [subjectData, setSubjectData] = useState()
    const [LabelDate, setLabel] = useState([])
    const [schedule, setSchedule] = useState([])
    const [subjectName, setSubjectName] = useState('')
    useEffect(() => {
        fetchSubject()
    }, [])
    useEffect(() => {
        if (subjectData) {
            const str = subjectData.schedule.map(schedule => {
                const date = new Date(schedule.date)
                const day = date.getDate()
                const month = date.getMonth() + 1
                const year = date.getFullYear()
                let dateString = `${day}/${month}/${year}`
                return dateString
            })
            setLabel(str)
        }
    }, [subjectData])

    const fetchSubject = () => {
        API.post('getSubject/', { subjectID })
            .then((res) => {
                setSubjectData(res.data)
                setSubjectName(res.data.subjectName)
                setSchedule(res.data.schedule)
                console.log(res.data)
                console.log("===========subject==========")
            })
            .catch((err) => console.log(err))
    }
    return (
        <Layout loading={loading && <Loader />} size='lg'>
            <Grid alignItems='center' container>
                <Grid item md='1'>
                    <Button variant='contained' color='secondary' component={Link} to='/viewSub'>Back</Button>
                </Grid>
                <Grid item>
                    <Typography variant='h3'>{subjectName}</Typography>
                </Grid>
            </Grid>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item lg={8} md={12} xl={9} xs={12}>
                        <ScheduleGraph labelDate={LabelDate} subjectID={subjectID} />
                    </Grid>
                    <Grid item lg={4} md={6} xl={3} xs={12}>
                        <UsersByDevice />
                    </Grid>
                    <Grid item lg={5} md={12} xl={9} xs={12}>
                        <Student subjectData={subjectData} subjectID={subjectID} />
                    </Grid>

                    <Grid item lg={7} md={12} xl={9} xs={12}>
                        <EditSch scheduleList={schedule} subjectID={subjectID} />
                    </Grid>
                </Grid>
            </div>


        </Layout>
    )
}
export default ViewSubjectPage
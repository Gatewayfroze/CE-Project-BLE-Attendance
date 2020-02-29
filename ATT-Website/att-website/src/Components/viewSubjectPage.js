import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Card, CardHeader, Button, TextField } from '@material-ui/core'
import DataTable from '../Components/DataTable'
import API from '../api'
import SearchIcon from '@material-ui/icons/Search';
import {
  LatestSales,
  UsersByDevice,
} from './Dashboard';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const Dashboard = (props) => {
  const subjectID = props.subjectID
  const classes = useStyles();
  const [subjectData, setSubjectData] = useState()
  const [studentData, setStudentData] = useState([])
  const [LabelDate, setLabel] = useState([])
  const [searchStd, setSearch] = useState('')
  const [stdDataSearch, setStdDataSearch] = useState([])
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
      // set string of date
      setLabel(str)
      if (subjectData.students.length != 0) {
        fetchListStudent()
      }
    }
  }, [subjectData])
  useEffect(() => {
    if (searchStd != '') {
      const search = studentData.filter(std => {
        return std.studentID.includes(searchStd) || std.name.includes(searchStd)
      })
      setStdDataSearch(search)
    } else {
      setStdDataSearch(studentData)
    }
  }, [searchStd,studentData])

  const fetchListStudent = async () => {
    const val = subjectData.students.map(async (student) => {
      const detail = await API.post('getStudent/', { studentID: student })
      detail.data.name = detail.data.name + ' ' + detail.data.surname
      detail.data.studentID = detail.data.email.replace('@kmitl.ac.th', '')
      return detail.data
    })
    const results = await Promise.all(val)
    console.log('=================================')
    console.log(results)
    setStudentData(results)
    setStdDataSearch(results)
  }
  const fetchSubject = () => {
    API.post('getSubject/', { subjectID })
      .then((res) => {
        setSubjectData(res.data)
        console.log(res.data)
        console.log("===========subject==========")
      })
      .catch((err) => console.log(err))
  }
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const columnDefault = [
    { id: 'studentID', label: 'Student ID', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 100 },
  ]
  const dropStudent = (studentIndex) => {
    // setLoading(true)
    console.log(stdDataSearch[studentIndex].studentID)
    API.post('drop/', { studentID: [studentData[studentIndex].studentID], subjectID })
      .then((response) => {
        console.log(response)
        fetchListStudent()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const tableExtend = []
  tableExtend.push({ text: 'Delete', class: 'is-danger', function: dropStudent })
  return (
    <div className={classes.root}>
      <p>{subjectID}</p>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestSales labelDate={LabelDate} />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice />
        </Grid>
        <Grid
          item
          lg={6}
          md={12}
          xl={9}
          xs={12}
        >
          <Card>
            <CardHeader
              action={
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <SearchIcon />
                  </Grid>
                  <Grid item>
                    <TextField value={searchStd} onChange={handleSearch} label='Search' size='small' />
                  </Grid>
                </Grid>
              }
              title="Student In Class"
            />
            <DataTable maxHeight={350} columns={columnDefault} data={stdDataSearch} extraHeader={['Delete']} extraCol={tableExtend} />
          </Card>
        </Grid>

        <Grid
          item
          lg={6}
          md={12}
          xl={9}
          xs={12}
        >
          <Card>

          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

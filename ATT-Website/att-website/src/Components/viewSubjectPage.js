import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Card } from '@material-ui/core';
import DataTable from '../Components/DataTable'
import API from '../api'

import {
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders
} from './Dashboard';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = (props) => {
  const subjectID = props.subjectID
  const classes = useStyles();
  const [subjectData, setSubjectData] = useState()
  const [studentData, setStudentData] = useState([])
  useEffect(() => {
    fetchSubject()
  }, [])

  useEffect(() => {
    if (subjectData) {
      fetchListStudent()
    }
  }, [subjectData])
  const fetchListStudent = async () => {
    const val = subjectData.student.map(async (student) => {
      const detail = await API.post('getStudent/', { studentID: student })
      detail.data.name = detail.data.name + ' ' + detail.data.surname
      detail.data.studentID = detail.data.email.replace('@kmitl.ac.th', '')
      return detail.data
    })
    const results = await Promise.all(val)
    setStudentData(results)
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

  const fetchStudent = (studentID) => {
    API.post('getStudent/', { studentID })
      .then((res) => {
        console.log(res.data)
        // setStudentData([...studentData, res.data])
        return res.data
      })
      .catch((err) => console.log(err))
  }
  const columnDefault = [
    { id: 'studentID', label: 'Student ID', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 100 },
  ]
  const deleteSubject = (subjectID) => {
    // setLoading(true)
    // console.log(subjects[subjectID].subjectID)
    // API.delete('deleteSubject/', { data: { subjectID: subjects[subjectID].subjectID } })
    //   .then((response) => {
    //     console.log(response)
    //     setLoading(false)
    //     fetchSubject()
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
  }
  const tableExtend = []
  tableExtend.push({ text: 'Delete', class: 'is-danger', function: deleteSubject })
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
          <LatestSales />
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
          <DataTable maxHeight={350} columns={columnDefault} data={studentData} extraHeader={['Delete']} extraCol={tableExtend} />
        </Grid>

        <Grid
          item
          lg={6}
          md={12}
          xl={9}
          xs={12}
        >
          <Card>
            sasdasd
            </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

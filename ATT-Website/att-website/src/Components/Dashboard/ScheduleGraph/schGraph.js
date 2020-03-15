import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button
} from '@material-ui/core';
import { Link } from 'react-router-dom'
import { options } from './chart';
import API from '../../../api'

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const ScheduleGraph = ({ subjectID, labelDate, scheduleList, className, studentNo }, ...rest) => {
  const theme = useTheme();
  const [schedule, setSchedule] = useState('')
  const [transaction, setTransac] = useState('')
  const [transacData, setTransacData] = useState([])
  useEffect(() => { setSchedule(scheduleList) }, [scheduleList])
  useEffect(() => {
    if (schedule != '') {
      const transacObj = {
        inTime: 0,
        late: 0,
        absent: studentNo
      }
      // const array = new Array(findLastSchedule()).fill({ ...transacObj })
      let array = []
      for (let i = 0; i < findLastSchedule(); i++) {
        array = [...array, { ...transacObj }]
      }
      setTransacData(array)
      fetchTrasaction()
    }
  }, [schedule])
  useEffect(() => {
    // console.log(transaction + '     ' + transaction.length)
    if (transaction !== '' && transacData.length !== 0) {
      transaction.forEach((transac) => {
        if (transac.schIndex < findLastSchedule()) {
          const temp = [...transacData]
          console.log(temp)
          if (transac.status === 'ok') {
            temp[transac.schIndex].inTime += 1
            temp[transac.schIndex].absent -= 1

          } else if (transac.status === 'late') {
            temp[transac.schIndex].late += 1
            temp[transac.schIndex].absent -= 1
          }
          setTransacData(temp)
        }
      })
    }
  }, [transaction])
  const findLastSchedule = () => {
    const now = new Date
    for (let i = 0; i < schedule.length; i++) {
      let sch = schedule[i]
      const date = new Date(sch.date)
      if (date > now) {
        return i
      } else if (i === schedule.length - 1 && now >= date) {
        return schedule.length
      }
    }
    return 0

  }
  const fetchTrasaction = () => {
    API.post('getTransactionSub/', { subjectID })
      .then((res) => {
        setTransac(res.data)
      })
      .catch((err) => console.log(err))
  }
  const data = {
    labels: labelDate,
    datasets: [
      {
        label: 'In time',
        backgroundColor: theme.palette.primary.main,
        data: transacData.map((sch) => sch.inTime)
      },
      {
        label: 'Late',
        backgroundColor: theme.palette.warning.main,
        data: transacData.map((sch) => sch.late)
      },
      {
        label: 'Absent',
        backgroundColor: theme.palette.error.main,
        data: transacData.map((sch) => sch.absent)
      }
    ]
  };
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button
            size="small"
            variant="contained"
            color='secondary'
            component={Link}
            to={`/export/${subjectID}`}
          >
            View schedule
          </Button>
        }
        title="Schedule Graph "
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar
            data={data}
            options={options}
          />
        </div>
      </CardContent>
    </Card>
  );
};

ScheduleGraph.propTypes = {
  labelDate: PropTypes.array.isRequired,
  studentNo: PropTypes.number.isRequired,
};

export default ScheduleGraph;

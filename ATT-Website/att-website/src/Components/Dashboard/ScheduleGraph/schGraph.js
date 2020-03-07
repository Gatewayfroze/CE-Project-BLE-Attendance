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

const ScheduleGraph = ({ subjectID, labelDate, schedule, className, studentNo }, ...rest) => {
  const theme = useTheme();
  const [transaction, setTransac] = useState('')
  const [transacData, setTransacData] = useState()
  useEffect(() => {
    fetchTrasaction()
  }, [])
  useEffect(() => {
    if (transaction !== '') {
      const transacObj = {
        inTime: 0,
        late: 0,
        absent: studentNo
      }
      console.log(findLastSchedule())
    }
  }, [transaction])
  const findLastSchedule = () => {
    for (let i = 0; i < schedule.length; i++) {
      let sch = schedule[i]
      const now = new Date()
      if (sch.date > now) {
        return i
      }
    }
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
        data: [20, 10]
      },
      {
        label: 'Late',
        backgroundColor: theme.palette.warning.main,
        data: [10]
      },
      {
        label: 'Absent',
        backgroundColor: theme.palette.error.main,
        data: [15]
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

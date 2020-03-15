import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import API from '../../../api'
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  status: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  statusIcon: {
    color: theme.palette.icon
  }
}));

const PercentInClass = ({ subjectID, labelDate, scheduleList, className, studentNo }, ...props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [schedule, setSchedule] = useState('')
  const [transaction, setTransac] = useState('')
  const [dataChart, setDataChart] = useState({ ok: 0, late: 0, absent: 0 })

  useEffect(() => {
    if (scheduleList.length != 0) {
      setSchedule(scheduleList)
    }
  }, [scheduleList])
  useEffect(() => {
    if (schedule !== '') {
      fetchTrasaction()
    }
  }, [schedule])
  useEffect(() => {
    if (transaction !== '') {
      let tempChart = schedule.map((sch) => {
        let defaultObj = {
          ok: 0,
          late: 0,
          absent: studentNo
        }
        const foundTransacs = transaction.filter((trans, i) => {
          return sch.schIndex == trans.schIndex
        })

        foundTransacs.forEach((foundTransac) => {
          if (foundTransac) {
            defaultObj[`${foundTransac.status}`] += 1
            defaultObj.absent -= 1
          }
        })

        return defaultObj
      })
      const currentSch = findLastSchedule()
      // console.log(tempChart)
      // console.log(currentSch)
      tempChart = tempChart.slice(0, currentSch)
      // console.log(tempChart)

      let summary =
        { ok: 0, late: 0, absent: 0 }

      tempChart.forEach((data) => {
        summary.ok += data.ok
        summary.late += data.late
        summary.absent += data.absent
      })
      let all = studentNo * currentSch
      if (all == 0) all = 1
      // ======================================= prevent case 0/0 == Nan
      summary.ok = summary.ok / all * 100
      summary.late = summary.late / all * 100
      summary.absent = summary.absent / all * 100
      console.log(summary)
      setDataChart(summary)
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
    datasets: [
      {
        data: [dataChart.ok, dataChart.late, dataChart.absent],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.warning.main,
          theme.palette.error.main,
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['Intime', 'Late', 'Absent']
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: 'white',
      bodyFontColor: 'white',
      footerFontColor: theme.palette.text.secondary
    }
  };

  const statuses = [
    {
      title: 'In time',
      value: dataChart.ok,
      color: theme.palette.primary.main
    },
    {
      title: 'Late',
      value: dataChart.late,
      color: theme.palette.warning.main
    },
    {
      title: 'Absent',
      value: dataChart.absent,
      color: theme.palette.error.main
    }
  ];

  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <IconButton size="small">
          </IconButton>
        }
        title="Percentage In class"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut
            data={data}
            options={options}
          />
        </div>
        <div className={classes.stats}>
          {statuses.map(status => (
            <div
              className={classes.status}
              key={status.title}
            >
              <span className={classes.statusIcon}></span>
              <Typography variant="body1">{status.title}</Typography>
              <Typography
                style={{ color: status.color }}
                variant="h3"
              >
                {status.value}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

PercentInClass.propTypes = {
  className: PropTypes.string
};

export default PercentInClass;

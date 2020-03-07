import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles,useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';
import { Link } from 'react-router-dom'
import { options } from './chart';

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

const Graph = ({subjectID,labelDate,className},...rest) => {
  const theme = useTheme();
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
        title="Schedule Graph"
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

Graph.propTypes = {
  labelDate: PropTypes.array.isRequired
};

export default Graph;

import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';

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

const Graph = props => {
  const { className,labelDate, ...rest } = props;
  const data = {
    labels: props.labelDate,
    datasets: [
      {
        label: 'In time',
        // backgroundColor: palette.primary.main,
        data: [20,10]
      },
      {
        label: 'Late',
        // backgroundColor: palette.neutral,
        data: [10]
      },
      {
        label: 'Absent',
        // backgroundColor: palette.neutral,
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
            variant="text"
          >
            Last 7 days
          </Button>
        }
        title="Latest Sales"
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
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </CardActions>
    </Card>
  );
};

Graph.propTypes = {
  labelDate: PropTypes.array.isRequired
};

export default Graph;

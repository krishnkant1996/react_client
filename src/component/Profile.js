import React from 'react';
import { Card ,Grid,Paper,makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paperTitle: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  Cardroot: {
    minWidth: 275,
    padding:theme.spacing(5)

  },
}));

export default function Profile() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.Cardroot}>
      <Grid container spacing={3}>
        
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paperTitle}>Full Name :- </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Krishnkant Tiwari</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paperTitle}>Email :- </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Krishnkant120@gmail.com</Paper>
        </Grid>
       
      </Grid>
      </Card>
    </div>
  );
}

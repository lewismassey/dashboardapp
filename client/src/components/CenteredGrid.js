import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//import Box from '@material-ui/core/Box';
import InputLink from './Links/InputLink';
import ListLinks from './Links/ListLinks';
import InputTodo from './Todos/InputTodo';
import ListTodos from './Todos/ListTodos';
import ListTicks from './Ticks/ListTicks';
import ListNews from './News/ListNews';
import ListResults from './News/ListResults';
import ListNotes from './Notes/ListNotes';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 1,
  },
  div: {
    background: "#fc3",
  },
  div2: {
    height: 100,
  },
  calendar: {
    height: 50,
    margin: 10,
  }
}));

const CenteredGrid = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>DASHBOARD MAGIKKKKKK</Paper>
        </Grid>
        <Grid item xs={5} container>
        <button data-toggle="collapse" data-target="#links-collapse">Press</button>
        <div id="links-collapse" className="collapse">
          <Grid item xs={12} className={classes.paper} >
            <Paper className={classes.paper}>
              <h6>Links</h6>
              <InputLink/>
              <ListLinks/>
            </Paper>
          </Grid>
          </div>
          <Grid item xs={12} container>
            <Grid item xs={6} >
              <Paper className={`${classes.paper} ${classes.calendar}`}>Calendar</Paper>
            </Grid>
            <Grid item xs={6} >
              <Paper className={classes.paper}>
              Notes
              <ListNotes/>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5} container>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
            <h6>Ticks</h6>

            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={`${classes.paper} ${classes.calendar}`}>
              News/Charts
              <ListResults/>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={2} container>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Google Search Bar</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Twitter Feed</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h6>Todos</h6>
              <InputTodo/>
              <ListTodos/>
            </Paper>
          </Grid>
        </Grid>

      </Grid>

    </div>

  );

}

export default CenteredGrid;

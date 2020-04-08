import React, { useEffect } from "react";
import { connect } from 'react-redux';
import * as actions from "../store/actions/index";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import ExpenseList from './ExpenseList';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));

export  function Expenses(props) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [categoryData, setCategoryData] = React.useState([]);
    const [budgetData, setBudgetData] = React.useState([['Amount', 'In INR']]);    
    const {  expenses,budget,getBudget } = props;
    useEffect(()=>{
      if(budget.length===0){
        getBudget()
      }
      },[budget,getBudget])
    useEffect(() => {
      console.log(expenses)
      let  exp = {};
      let cat;
      cat = expenses.forEach((d, i) => {
        let category = d['categoryName'];
        exp[category] = exp.hasOwnProperty(category) ?
          exp[category] + d['amount'] :
          d['amount']
      });
      console.log("exp",exp)
      console.log("Object.keys.exp",Object.keys(exp))
      let totalExense=0 ;
      let newObj=[['Amount', 'In INR']]
      for (let i=0; i<Object.keys(exp).length; i++) { 
        totalExense = totalExense+exp[Object.keys(exp)[i]];
        newObj.push([Object.keys(exp)[i],exp[Object.keys(exp)[i]]]) ;
      }
      console.log("budget",budget)

      let budgetValue = [['Amount', 'In INR'],["Remaining amount",(budget.amount-totalExense)],["Total Expenses",totalExense]];
      setCategoryData(newObj)
      setBudgetData(budgetValue)
    }, [expenses,budget]);
  
return (<>

<Grid container spacing={3}>
{/* Chart */}
<Grid item xs={12} md={6} lg={6}>
  <Paper className={fixedHeightPaper}>
    <Chart data={budgetData} title={"Total Budget"} />
  </Paper>
</Grid>
{/* Recent Deposits */}
<Grid item xs={12} md={6} lg={6}>
  <Paper className={fixedHeightPaper}>
  <Chart data={categoryData}  title={"Catgory expense"}/>
  </Paper>
</Grid>
{/* Recent ExpenseList */}
<Grid item xs={12}>
  <Paper className={classes.paper}>
    <ExpenseList />
  </Paper>
</Grid>
</Grid>
</>);
}
const mapStateToProps = state => {
  return {
    error: state.expense.error,
    expenses: state.expense.expenses,
    budget: state.budget.budget,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    getExpenses: () => dispatch(actions.getExpenses()),
    getBudget: () => dispatch(actions.getBudget()),

  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Expenses);

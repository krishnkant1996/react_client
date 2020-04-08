import React,{useEffect} from "react";
import { connect } from 'react-redux';
import * as actions from "../store/actions/index";
import {
  Grid,
  Button,
  Paper,
  FormLabel,
  TextField,
  makeStyles
} from "@material-ui/core";
import CategoryList from "./CategoryList";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },   

}));

export  function Setting(props) {
  const [categoryName, setCategoryName] = React.useState("");
  const [budgetValue, setBudget] = React.useState(0);
  const { addCategory,getBudget,addBudget } = props;
  const classes = useStyles();
  useEffect(()=>{
  if(props.budget.length===0){
    getBudget()
  }
  if(props.budget!==budgetValue){
    setBudget(props.budget.amount)
  }
  },[props,getBudget])
  return (

    <>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={4} md={4} lg={4}>
                <FormLabel>Total Budget</FormLabel>
              </Grid>
              <Grid item xs={4} md={4} lg={4}>
              <TextField
                id="standard-multiline-flexible"
                label="Amount"
                multiline
                rowsMax="4"
                value={budgetValue}
                onChange={(e)=>{setBudget(e.target.value)}}
              />              
              </Grid>
              <Grid item xs={4} md={4} lg={4}>
                <Button variant="contained" color="primary" onClick={()=>{addBudget(props.budget._id,budgetValue)}}>
                  Update
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={4} md={4} lg={4}>
                <FormLabel>Categories</FormLabel>
              </Grid>
              <Grid item xs={4} md={4} lg={4}>
              <TextField
                label="Categorie name here"
                multiline
                rowsMax="4"
                value={categoryName}
                onChange={(e)=>{setCategoryName(e.target.value)}}
              />                </Grid>
              <Grid item xs={4} md={4} lg={4}>
                <Button variant="contained" color="primary" onClick={(e)=>{
                  addCategory(categoryName);
                  setCategoryName("")
                }}>
                  Add
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* Recent CategoryList */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <CategoryList />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
const mapStateToProps = state => {
  return {
    error: state.budget.error,
    budget: state.budget.budget,
    category: state.category.category,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCategory: (name) => dispatch(actions.addCategory(name)),
    getBudget: () => dispatch(actions.getBudget()),
    addBudget: (id,amount) => dispatch(actions.addBudget(id,amount))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);

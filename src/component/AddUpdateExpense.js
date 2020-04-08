import React, { useEffect } from "react";
import { connect } from 'react-redux';
import * as actions from "../store/actions/index";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';

import DatePickers from './DatePickers'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  formControl: {
    width: "100%",
    marginTop: theme.spacing(2),

  },

}));

export function AddUpdateExpense(props) {
  console.log(props)
  const [id, setID] = React.useState('');
  const [name, setName] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [categoryName, setCategory] = React.useState('');
  const classes = useStyles();
  const { category,addExpense } = props;
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  useEffect(() => {
    if(props.category.length===0){
      props.getCategory()
    }
    if (props.edit) {
      setID(props.data._id);
      setName(props.data.name);
      setAmount(props.data.amount)
      setCategory(props.data.categoryName)
      setSelectedDate(props.data.date)
    }
  }, [props])

  console.log(selectedDate)

  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add/Update Expense</DialogTitle>
        <DialogContent>

          <form className={classes.root} noValidate autoComplete="off">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="component-outlined">Item name</InputLabel>
              <OutlinedInput id="component-outlined" value={name} onChange={(e) => { setName(e.target.value) }} label="Item name" />
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="select-category"
                value={categoryName}
                onChange={(e) => { setCategory(e.target.value) }}
                label="Age"
              >
                {category.map((row) =>
                  (
                    <MenuItem key={row._id} value={row.name}>{row.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="component-outlined">Amount</InputLabel>
              <OutlinedInput id="component-outlined" value={amount} onChange={(e) => { setAmount(e.target.value) }} label="Amount" />
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <DatePickers selectedDate={selectedDate} handleDateChange={(date) => {
                setSelectedDate(date);
              }} ></DatePickers>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={props.handleClose} >
            Cancel
          </Button>
          <Button variant="outlined" onClick={()=>{
            console.log(selectedDate)
            addExpense(id,name,
              amount,
              categoryName,
              selectedDate);
            props.handleClose();
            }} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


const mapStateToProps = state => {
  return {
    error: state.category.error,
    category: state.category.category,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategory: (response) => dispatch(actions.getCategory(response)),
    addExpense: (id,name,
      amount,
      categoryName,
      date) => dispatch(actions.addExpense(id,name,
        amount,
        categoryName,
        date))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUpdateExpense);

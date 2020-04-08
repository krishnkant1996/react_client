import React, { useEffect } from "react";
import { connect } from 'react-redux';
import * as actions from "../store/actions/index";

import {
  makeStyles,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Button,
} from "@material-ui/core";
import AddUpdateExpense from "./AddUpdateExpense";
import { DeleteOutlineRounded, EditOutlined } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  deleteIcon: {
    marginLeft: theme.spacing(2),
  }
}));

export function ExpenseList(props) {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [expenseData, setExpenseData] = React.useState([]);
  console.log(props)
  const classes = useStyles();
  const { getExpenses, expenses,deleteExpense } = props;

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);


  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={() => {
        setEdit(false);
        setOpen(true);
        setExpenseData("");
      }}>
        Add expense
      </Button>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Expense Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.categoryName}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setOpen(true);
                    setEdit(true);
                    setExpenseData(row)
                  }}
                  variant="outlined" color="primary"
                >
                  <EditOutlined />
                </Button>
                <Button
                  onClick={() => {
                    deleteExpense(row._id)
                  }}
                  variant="outlined" color="secondary"
                  className={classes.deleteIcon}
                >
                  <DeleteOutlineRounded />
                </Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
      <AddUpdateExpense open={open} handleClose={() => { setOpen(false) }} edit={edit} data={expenseData} />
    </React.Fragment>
  );
}
const mapStateToProps = state => {
  return {
    error: state.expense.error,
    expenses: state.expense.expenses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getExpenses: () => dispatch(actions.getExpenses()),
    deleteExpense:(id)=>dispatch(actions.deleteExpense(id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseList);

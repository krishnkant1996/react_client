import React,{useEffect} from "react";
import { connect } from 'react-redux';
import * as actions from "../store/actions/index";

import { TableBody,TableCell,TableHead,TableRow,Table,Button} from '@material-ui/core';
import {DeleteOutlineRounded} from '@material-ui/icons';
export  function CategoryList(props) {
  const { getCategory,category,deleteCategory} = props;

  useEffect(() => {
    getCategory([]);
  }, [getCategory]);

  return (
      <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {category.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell><Button onClick={()=>{deleteCategory(row._id)}}><DeleteOutlineRounded/></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
    </React.Fragment>
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
    deleteCategory: (id) => dispatch(actions.deleteCategory(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);

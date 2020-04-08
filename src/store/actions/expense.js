import * as actionTypes from './actionTypes';
import axios from "axios";
import {apiUrl} from "../../config"


export const setExpenses = ( expenses ) => {
    return {
        type: actionTypes.SET_EXPENSES,
        expenses: expenses
    };
};

export const fetchExpensesFailed = () => {
    return {
        type: actionTypes.FETCH_EXPENSES_FAILED
    }
};

export const getExpenses = () => {
    return dispatch => {
        axios.get(apiUrl+'/all-expenses')
        .then( response => {
            dispatch(setExpenses(response.data));

        })
        .catch( error => {
            dispatch(fetchExpensesFailed());
        } );
    }

            
};
export const addExpense = (id,
    name,
    amount,
    categoryName,
    date) => {
    return dispatch => {
        axios.post(apiUrl+'/expense',{id,name,amount,categoryName,date} )
        .then( response => {
           dispatch(getExpenses());
        } )
        .catch( error => {
            dispatch(fetchExpensesFailed());
        } );
    }
};
export const deleteExpense = (id) => {
    return dispatch => {
        axios.post(apiUrl+'/expense-delete',{id} )
        .then( response => {
           dispatch(getExpenses());
        } )
        .catch( error => {
            dispatch(fetchExpensesFailed());
        } );
    }
};
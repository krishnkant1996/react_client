import * as actionTypes from './actionTypes';
import axios from "axios";
import {apiUrl} from "../../config"

export const setBudget = ( budget ) => {
    return {
        type: actionTypes.SET_BUDGET,
        budget: budget
    };
};

export const fetchBudgetFailed = () => {
    return {
        type: actionTypes.FETCH_BUDGET_FAILED
    }
};

export const getBudget = () => {
    return dispatch => {
        axios.get(apiUrl+'/get-budget')
        .then( response => {
            dispatch(setBudget(response.data));
        })
        .catch( error => {
            dispatch(fetchBudgetFailed());
        } );
    }
            
};
export const addBudget = (id,amount) => {
    return dispatch => {
        axios.post(apiUrl+'/budget',{id,amount} )
        .then( response => {
           dispatch(getBudget());
        } )
        .catch( error => {
            dispatch(fetchBudgetFailed());
        } );
    }
};
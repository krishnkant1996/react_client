import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    expenses: [],
    error: false,
    building: false
};
const setExpenses = (state, action) => {
    console.log(action, state)
    return updateObject( state, {
        expenses: action.expenses,
        error: false,
        building: false
    } );
};

const fetchExpensesFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_EXPENSES: return setExpenses(state, action);    
        case actionTypes.FETCH_EXPENSES_FAILED: return fetchExpensesFailed(state, action);
        default: return state;
    }
};

export default reducer;
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    budget: [],
    error: false,
    building: false
};
const setBudget = (state, action) => {
    return updateObject( state, {
        budget: action.budget,
        error: false,
        building: false
    } );
};

const fetchBudgetFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_BUDGET: return setBudget(state, action);    
        case actionTypes.FETCH_BUDGET_FAILED: return fetchBudgetFailed(state, action);
        default: return state;
    }
};

export default reducer;
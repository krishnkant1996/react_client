import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    category: [],
    error: false,
    building: false
};
const setCategory = (state, action) => {
    return updateObject( state, {
        category: action.category,
        error: false,
        building: false
    } );
};

const fetchCategoryFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_CATEGORY: return setCategory(state, action);    
        case actionTypes.FETCH_CATEGORY_FAILED: return fetchCategoryFailed(state, action);
        default: return state;
    }
};

export default reducer;
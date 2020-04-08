import * as actionTypes from './actionTypes';
import axios from "axios";
import {apiUrl} from "../../config"


export const setCategory = ( category ) => {
    return {
        type: actionTypes.SET_CATEGORY,
        category: category
    };
};

export const fetchCategoryFailed = () => {
    return {
        type: actionTypes.FETCH_CATEGORY_FAILED
    }
};

export const getCategory = () => {
    return dispatch => {
        axios.get(apiUrl+'/all-categories')
        .then( response => {
            console.log(response)
            dispatch(setCategory(response.data));

        })
        .catch( error => {
            dispatch(fetchCategoryFailed());
        } );
    }
            
};
export const addCategory = (name) => {
    return dispatch => {
        axios.post(apiUrl+'/category',{name} )
        .then( response => {
           dispatch(getCategory());
        } )
        .catch( error => {
            dispatch(fetchCategoryFailed());
        } );
    }
};
export const deleteCategory = (id) => {
    console.log(id)
    return dispatch => {
        axios.post(apiUrl+'/category-delete',{id} )
        .then( response => {
           dispatch(getCategory());
        } )
        .catch( error => {
            dispatch(fetchCategoryFailed());
        } );
    }
};
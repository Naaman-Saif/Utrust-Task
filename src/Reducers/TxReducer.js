import {
    FETCHING_TX_DATA,
    FETCHING_TX_DATA_SUCCESS,
    FETCHING_TX_DATA_FAIL,
} from '../Utils/ActionTypes.js';

const initialState = {
    isFetching: null,
    data: [],
    hasError: false,
    errorMessage: null
};

export default function(state = initialState, action) {

    switch(action.type) {

        case FETCHING_TX_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                data: null,
                hasError: false,
                errorMessage: null
            });

        case FETCHING_TX_DATA_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.payload,
                hasError: false,
                errorMessage: null
            });

        case FETCHING_TX_DATA_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.payload,
                hasError: true,
                errorMessage: action.err
            });

    
        default:
            return state;
    }
    
}
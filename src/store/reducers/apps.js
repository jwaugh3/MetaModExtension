import * as actionTypes from '../actions';

const initialState = {
    appsAvailable: [],
    myApps: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_AVAILABLE_APPS:
            return {
                ...state,
                appsAvailable: action.payload
            }
        case actionTypes.SET_MY_APPS:
            return {
                ...state,
                myApps: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer
import * as actionTypes from '../actions';

const initialState = {
    channel: '',
    broadcasterType: '',
    jwtToken: '',
    currentApp: '',
    mods: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_CHANNEL:
            return {
                ...state,
                channel: action.payload
            }
        case actionTypes.SET_BROADCASTER_TYPE:
            return {
                ...state,
                type: action.payload
            }
        case actionTypes.SET_JWT_TOKEN:
            return {
                ...state,
                jwtToken: action.payload
            }
        case actionTypes.SET_CURRENT_APP:
            return {
                ...state,
                currentApp: action.payload
            }
        case actionTypes.SET_MODS:
            return {
                ...state,
                mods: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer
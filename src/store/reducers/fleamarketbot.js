import * as actionTypes from '../actions';

const initialState = {
    channel: '',
    modeSelection: 'allchat',
    delay: '0',
    targetRequester: false,
    channelConnected: '',
    lastChanged: '',
    tier: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_MODE_SELECTION:
            return {
                ...state,
                modeSelection: action.payload
            }
        case actionTypes.SET_DELAY:
            return {
                ...state,
                delay: action.payload
            }
        case actionTypes.SET_TARGET_REQUESTER:
            let currentStatus = state.targetRequester
            let newStatus = !currentStatus
            return {
                ...state,
                targetRequester: newStatus
            }
        case actionTypes.SET_CHANNEL_CONNECTION:
            return {
                ...state,
                channelConnected: action.payload
            }
        case actionTypes.SET_STORAGE_STATE:
            return {
                ...state,
                channel: action.payload.channel,
                modeSelection: action.payload.mode,
                delay: action.payload.delay,
                targetRequester: action.payload.targetRequester,
                channelConnected: action.payload.channelConnected,
                lastChanged: action.payload.lastChanged,
                tier: action.payload.tier
            }
        case actionTypes.SET_LAST_CHANGED:
            return {
                ...state,
                lastChanged: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer
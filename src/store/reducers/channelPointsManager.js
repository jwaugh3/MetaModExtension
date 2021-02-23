import * as actionTypes from '../actions';

const initialState = {
    customRewards: [],
    rewardSettings: [],
    displayForm: {status: false, badgeNum: 0},
    channelPointAlert: "",
    currentDisplay: 'manager'
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.CREATE_REWARD:
            let sortedArray = [...state.customRewards, action.payload]
            sortedArray.sort((a, b) => (a.cost > b.cost || (a.cost === b.cost && a.rewardName > b.rewardName)) ? 1 : -1)
            return {
                ...state,
                customRewards: sortedArray
            }
        case actionTypes.DISPLAY_FORM:
            let newDisplayForm = {status: !action.payload.status, badgeNum: action.payload.badgeNum, type: action.payload.type}
            return {
                ...state,
                displayForm: newDisplayForm
            }
        case actionTypes.SET_NEW_REWARD_ID:
            let setNewRewardIDArray = [...state.customRewards]
            setNewRewardIDArray[state.customRewards.findIndex(x => x.rewardID === '')].rewardID = action.payload.rewardID
            return {
                ...state,
                customRewards: setNewRewardIDArray
            }
        case actionTypes.CANCEL_FORM:
            let cancelledFormArray = [...state.customRewards]
            if(cancelledFormArray[action.payload].rewardID === ''){
                cancelledFormArray.splice(action.payload, 1)
                return {
                    ...state,
                    customRewards: cancelledFormArray
                }
            } else return {...state}
        case actionTypes.DELETE_FORM:
            let deletedFormArray = [...state.customRewards]
            console.log(action.payload, deletedFormArray)
            deletedFormArray.splice(action.payload, 1)
            
            return {
                ...state,
                customRewards: deletedFormArray
            }
        case actionTypes.DELETE_FAILED_REWARD:
            let failedRewardArray = [...state.customRewards]
            failedRewardArray.splice(state.customRewards.findIndex(x => x.rewardID === ''), 1) 
            return {
                ...state,
                customRewards: failedRewardArray
            }
        case actionTypes.CLEAR_REWARDS:
            return {
                ...state,
                customRewards: []
            }
        
        case actionTypes.SET_CHANNEL_POINT_ALERT:
            return {
                ...state,
                channelPointAlert: action.payload
            }
        //Update reward state by badgeNum
        case actionTypes.HANDLE_COLOR_CHANGE_COMPLETE:
            let colorChangeCompleteArray = [...state.customRewards]
            colorChangeCompleteArray[action.payload.badgeNum].backgroundColor = action.payload.color.hex
            return {
                ...state,
                customRewards: colorChangeCompleteArray
            }
        case actionTypes.TOGGLE_COLOR_SELECT:
            let newColorSelectArray = [...state.customRewards]
            newColorSelectArray[action.payload.badgeNum].displayPicker = !action.payload.status
            newColorSelectArray[action.payload.badgeNum].showCustomizer = false
            return {
                ...state,
                customRewards: newColorSelectArray
            }
        case actionTypes.SHOW_CUSTOM_PICKER:
            let customPickerArray = [...state.customRewards]
            customPickerArray[action.payload.badgeNum].showCustomizer = !action.payload.status
            return {
                ...state,
                customRewards: customPickerArray
            }
        case actionTypes.TOGGLE_HANDLER:
            let toggleHandlerArray = [...state.customRewards]
            toggleHandlerArray[action.payload.badgeNum][action.payload.option] = !action.payload.status
            return {
                ...state,
                customRewards: toggleHandlerArray
            }
        case actionTypes.ON_SELECT:
            let onSelectArray = [...state.customRewards]
            onSelectArray[action.payload.badgeNum].redemptionCooldownTimeLabel = action.payload.option
            return {
                ...state,
                customRewards: onSelectArray
            }
        case actionTypes.SET_INPUT_VALUE:
            let newInputArray = [...state.customRewards]
            newInputArray[action.payload.badgeNum][action.payload.input] = action.payload.value
            return {
                ...state,
                customRewards: newInputArray
            }
        case actionTypes.TOGGLE_REWARD_STATUS:
            let updateRewardStatusArray = [...state.customRewards]
            updateRewardStatusArray[action.payload.badgeNum].isEnabled = !action.payload.status
            return {
                ...state,
                customRewards: updateRewardStatusArray
            }
        case actionTypes.SET_CURRENT_DISPLAY:
            return {
                ...state,
                currentDisplay: action.payload
            }
        case actionTypes.SET_CUSTOM_SETTINGS:
            let updatedSettings = [...state.customRewards]
            updatedSettings[action.payload.badgeNum][action.payload.key] = action.payload.value
            return {
                ...state,
                customRewards: updatedSettings
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer
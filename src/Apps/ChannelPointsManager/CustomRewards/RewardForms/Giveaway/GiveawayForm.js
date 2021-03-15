import React, { Component } from 'react'
import { deleteCustomReward } from '../../../../../api/channelPointsManagerApi'
//Style
import styles from './GiveawayForm.module.scss'
//Components
import Subtitle from '../../../../../Components/OptionComponents/Subtitle/Subtitle'
import HorizontalTextInputCounter from '../../../../../Components/OptionComponents/HorizontalTextInputCounter/HorizontalTextInputCounter'
import HorizontalTextInputIcon from '../../../../../Components/OptionComponents/HorizontalTextInputIcon/HorizontalTextInputIcon'
import ColorSelect from '../../../../../Components/OptionComponents/ColorSelect/ColorSelect'
import TextAreaInput from '../../../../../Components/OptionComponents/TextAreaInput/TextAreaInput'
import FormButton from '../../../../../Components/OptionComponents/FormButton/FormButton'
// import SingleOptionDropdown from '../../../../../Components/OptionComponents/SingleOptionDropdown/SingleOptionDropdown'
// import TimeOption from '../../../../../Components/OptionComponents/TimeOption/TimeOption'
// import DateTimePicker from 'react-datetime-picker'
import ToggleOption from '../../../../../Components/OptionComponents/ToggleOption/ToggleOption'
import Disclaimer from '../../../../../Components/OptionComponents/Disclaimer/Disclaimer'
import HorizontalTextInput from '../../../../../Components/OptionComponents/HorizontalTextInput/HorizontalTextInput'
//Assets
import editIcon from '../../../../../resources/channelPointsManager/editEmoteIcon.png'
import channelPointsIcon from '../../../../../resources/channelPointsManager/customRewardIcon.png'
//State Management
import { connect } from 'react-redux'

// import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
// import './DateTimePicker.css'
// import './Calendar.css'

export class GiveawayForm extends Component {

    deleteCustomRewardOnTwitch = async (badgeNum) => {
        await deleteCustomReward(this.props.apiEndpoint, this.props.channel, this.props.customRewards[badgeNum].rewardID).then((res)=>{
            let statusCode = JSON.parse(res.response.statusCode)
            if(statusCode === 204){
                this.props.deleteFormHandler(badgeNum)
            } else if(statusCode === 403){
                this.props.setChannelPointAlert("Uh-oh, that didn't work")
                setTimeout(()=>{
                    this.props.setChannelPointAlert('')
                }, 10000)
            } else if(statusCode === 401){
                this.props.setChannelPointAlert("Uh-oh, that didn't work")
                setTimeout(()=>{
                    this.props.setChannelPointAlert('')
                }, 10000)
            }
        })
    }

    render() {

        let badgeNum = this.props.badgeNum
        let customRewards = this.props.customRewards[this.props.badgeNum]
        let offClick=[]

        return (
            <div className={styles.formContainer}>
            {offClick}
            <Subtitle title='Create Custom Reward' backButton={customRewards.rewardID === '' ? true : false} action={()=>{
                    this.props.deleteFormHandler(this.props.badgeNum)
                    this.props.displayFormHandler(this.props.displayForm.status, null)
                }}/>
            
            <div className={styles.form}>

                <form>
                <HorizontalTextInputCounter
                        title='Custom Reward Name*'
                        maxCount='45'
                        width='210'
                        value={customRewards.rewardName}
                        count={customRewards.rewardName.length}
                        action={(event)=>{
                            if(customRewards.rewardID === ''){
                                this.props.setInputValue(event.target.value, 'rewardName', badgeNum)
                            }
                        }}
                    />

                    <div className={styles.formSpacer}></div>

                    {/* <SingleOptionDropdown
                        title='End Giveaway'
                        width='210'
                        selected={customRewards.endGiveaway}
                        options={['On Time', 'Manually']}
                        optionHandler={(option)=>{
                            if(customRewards.rewardID === ''){
                                this.props.setInputValue(option, 'endGiveaway', badgeNum)
                            }
                        }}
                    /> */}

                    {/* {customRewards.endGiveaway === 'On Time' ? 
                        <Auxiliary>
                            <div className={styles.formSpacer}></div>
                            <DateTimePicker 
                                onChange={(time)=>{
                                    this.props.setInputValue(time, 'endAt', badgeNum)
                                }}
                                value={customRewards.endAt}
                                disableClock='true'
                                maxDetail="minute"
                                minDetail="month"
                            />
                        </Auxiliary>
                        : null
                    } */}

                    <HorizontalTextInput 
                        title='Number of Winners*'
                        text={customRewards.winnerCount}
                        width='210'
                        textInput={(text)=>{
                            if(customRewards.rewardID === ''){
                                this.props.setInputValue(text, 'winnerCount', badgeNum)
                            }
                        }}
                        maxCount='3'
                        type='number'
                    />

                    <ToggleOption 
                        title="Monetary Prize"
                        width='210'
                        toggleHandler={()=>{
                            if(customRewards.rewardID === ''){
                                this.props.toggleHandler(customRewards.monetaryPrize, 'monetaryPrize', badgeNum)
                                this.props.setInputValue(1, 'cost', badgeNum)
                            }
                        }} 
                        checked={customRewards.monetaryPrize} 
                        option={'monetaryPrize'}
                    /> 

                    <div className={styles.formSpacer}></div>

                    <div className={styles.formGrid}>
                        <HorizontalTextInputIcon
                            title='Cost*'
                            maxCount='8'
                            width='110'
                            value={customRewards.monetaryPrize ? '1' : customRewards.cost}
                            action={(event)=>{
                                if(customRewards.rewardID === '' && customRewards.monetaryPrize === false){
                                    this.props.setInputValue(event.target.value, 'cost', badgeNum)
                                }
                            }}
                            icon={channelPointsIcon}
                            type='number'
                        />

                        <ColorSelect
                            title='Reward Color'
                            icon={editIcon}
                            color={customRewards.backgroundColor}
                            badgeNum={this.props.badgeNum}
                            customRewards={this.props.customRewards}
                            showCustomPicker={this.props.showCustomPicker}
                            handleColorChangeComplete={this.props.handleColorChangeComplete}
                            toggleColorSelect={this.props.toggleColorSelect}
                            action={()=>{
                                if(customRewards.rewardID === ''){
                                    this.props.toggleColorSelect(customRewards.displayPicker, badgeNum)
                                }
                            }}
                        />

                    </div>


                    <TextAreaInput
                        title='Description (optional)'
                        maxCount='200'
                        width='300'
                        value={customRewards.description}
                        count={customRewards.description.length}
                        action={(event)=>{
                            if(customRewards.rewardID === ''){
                                this.props.setInputValue(event.target.value, 'description', badgeNum)
                            }
                        }}
                    />

                    <div className={styles.formSpacer}></div>

                    <Disclaimer 
                        width='300'
                        disclaimerText={customRewards.rewardID === '' ? 'This channel point reward will select a random winner(s) from the viewers who purchase the reward. Selecting "Monetary Prize" will default the cost to "1 point". This is for the streamers legal safety as monetary giveaways must be fair and eligible for anyone to join.'
                            : 'This reward has already been created. To edit or change this reward, delete this reward and create a new one with the desired settings.'}
                        color={customRewards.rewardID === '' ? 'white' : 'yellow'}
                    />

                    <div className={styles.formSpacer}></div>
                    
                    {this.props.alert ? <div className={styles.alert}>*Please fill in the required fields*<img src="https://cdn.betterttv.net/emote/59f27b3f4ebd8047f54dee29/1x" alt="emote"/></div> : null}

                    <FormButton title={customRewards.rewardID === '' ? 'save' : 'cancel'} color={customRewards.rewardID === '' ? '#90D48B' : '#05a1e5'} action={(event)=>{
                        if(customRewards.rewardID === ''){
                            this.props.submitForm(event, this.props.badgeNum)
                        } else {
                            this.props.displayFormHandler(this.props.displayForm.status, null)
                        }

                    }}></FormButton>

                    <FormButton title={customRewards.rewardID === '' ? 'cancel' : 'delete'}
                        color='#ff9e9e'
                        action={()=>{
                            if(this.props.customRewards[this.props.badgeNum].rewardID === ''){
                                this.props.deleteFormHandler(this.props.badgeNum)
                                this.props.displayFormHandler(this.props.displayForm.status, null)
                            } else {
                                this.props.displayFormHandler(this.props.displayForm.status, null)
                                this.deleteCustomRewardOnTwitch(this.props.displayForm.badgeNum)
                            }
                        }}>
                    </FormButton>
                </form>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customRewards: state.channelPointsManagerReducer.customRewards,
        displayForm: state.channelPointsManagerReducer.displayForm,
        channel: state.applicationReducer.channel
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateDescCharCount: (event, badgeNum) => dispatch({type: 'UPDATE_DESC_CHAR_COUNT', payload: {event, badgeNum}}),
        handleColorChangeComplete: (color, badgeNum) => dispatch({type: 'HANDLE_COLOR_CHANGE_COMPLETE', payload: {color, badgeNum}}),
        toggleColorSelect: (status, badgeNum) => dispatch({type: 'TOGGLE_COLOR_SELECT', payload: {status, badgeNum}}),
        showCustomPicker: (status, badgeNum) => dispatch({type: 'SHOW_CUSTOM_PICKER', payload: {status, badgeNum}}),
        toggleHandler: (status, option, badgeNum) => dispatch({type: 'TOGGLE_HANDLER', payload: {status, option, badgeNum}}),
        onSelect: (option, badgeNum) => dispatch({type: 'ON_SELECT', payload: {option, badgeNum}}),
        setInputValue: (value, input, badgeNum) => dispatch({type: 'SET_INPUT_VALUE', payload: {value, input, badgeNum}}),
        displayFormHandler: (status, badgeNum) => dispatch({type: 'DISPLAY_FORM', payload: {status, badgeNum}}),
        deleteFormHandler: (badgeNum) => dispatch({type: 'DELETE_FORM', payload: badgeNum})

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiveawayForm)

import React, { Component } from 'react'
import { deleteCustomReward } from '../../../../../api/channelPointsManagerApi';
//Components
import Subtitle from '../../../../../Components/OptionComponents/Subtitle/Subtitle'
import HorizontalTextInputCounter from '../../../../../Components/OptionComponents/HorizontalTextInputCounter/HorizontalTextInputCounter'
import HorizontalTextInputIcon from '../../../../../Components/OptionComponents/HorizontalTextInputIcon/HorizontalTextInputIcon'
import ColorSelect from '../../../../../Components/OptionComponents/ColorSelect/ColorSelect'
import ToggleOption from '../../../../../Components/OptionComponents/ToggleOption/ToggleOption'
import FormButton from '../../../../../Components/OptionComponents/FormButton/FormButton'
//Style
import styles from './BasicForm.module.scss';
//Assets
import editIcon from '../../../../../resources/channelPointsManager/editEmoteIcon.png'
import channelPointsIcon from '../../../../../resources/channelPointsManager/customRewardIcon.png'
//State Management
import { connect } from 'react-redux'
import TextAreaInput from '../../../../../Components/OptionComponents/TextAreaInput/TextAreaInput';

export class Form extends Component {

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
                <Subtitle title='Create Custom Reward'/>
                
                <div className={styles.form}>

                    <form>
                    <HorizontalTextInputCounter
                            title='Custom Reward Name*'
                            maxCount='45'
                            width='210'
                            value={customRewards.rewardName}
                            count={customRewards.rewardName.length}
                            action={(event)=>{
                                this.props.setInputValue(event.target.value, 'rewardName', this.props.badgeNum)
                            }}
                        />

                        <div className={styles.formSpacer}></div>

                        <div className={styles.formGrid}>
                            <HorizontalTextInputIcon
                                title='Cost*'
                                maxCount='8'
                                width='110'
                                value={customRewards.cost}
                                action={(event)=>this.props.setInputValue(event.target.value, 'cost', badgeNum)}
                                icon={channelPointsIcon}
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
                                    this.props.toggleColorSelect(customRewards.displayPicker, badgeNum)
                                }}
                            />

                        </div>


                        <div className={styles.formSpacer}></div>

                        <TextAreaInput
                            title='Description (optional)'
                            maxCount='200'
                            width='300'
                            value={customRewards.description}
                            count={customRewards.description.length}
                            action={(event)=>{this.props.setInputValue(event.target.value, 'description', badgeNum)}}
                        />

                        <div className={styles.formSpacer}></div>

                        <ToggleOption 
                            title="Require Viewer Input"
                            width='300'
                            toggleHandler={()=>{
                                this.props.toggleHandler(customRewards.viewerInputRequired, 'viewerInputRequired', badgeNum)
                            }} 
                            checked={customRewards.viewerInputRequired} 
                            option={'viewerInputRequired'}
                        />

                        <ToggleOption 
                            title="Add Redemption to Review Queue"
                            width='300'
                            toggleHandler={()=>{
                                this.props.toggleHandler(customRewards.addRedemption, 'addRedemption', badgeNum)
                            }} 
                            checked={customRewards.addRedemption} 
                            option={'addRedemption'}
                        />

                        <ToggleOption 
                            title="Cooldown/Limits"
                            width='300'
                            toggleHandler={()=>{
                                this.props.toggleHandler(customRewards.cooldown, 'cooldown', badgeNum)
                                if(customRewards.cooldown === false){
                                    this.props.setInputValue('', 'redemptionCooldownTime', badgeNum)
                                    this.props.setInputValue('', 'redemptionPerStream', badgeNum)
                                    this.props.setInputValue('', 'redemptionPerUser', badgeNum)
                                }
                            }} 
                            checked={customRewards.cooldown} 
                            option={'cooldown'}
                        />  

                        <div className={styles.formSpacer}></div>

                        {customRewards.cooldown ? 
                            <div className={styles.cooldownContainer}>
                                    <label htmlFor="redemptionCooldown" id="redemptionCooldownLabel">Redemption Cooldown</label>
                                    <div className={styles.optionGrid}>
                                        <input type="text" maxLength="10" id="redemptionCooldown" value={customRewards.redemptionCooldownTime} onChange={(event)=>this.props.setInputValue(event.target.value, 'redemptionCooldownTime', badgeNum)} className={styles.cooldownInput}/>
                                        <div className={styles.unit}>{customRewards.redemptionCooldownTimeLabel}</div>
                                    </div>
                            
                                <div className={styles.cooldownOption}>
                                    <label htmlFor="maxRedemptionPerStream" id="maxRedemptionPerStreamLabel">Max Redemptions Per Stream</label>
                                    <label htmlFor="maxRedemptionsPerStream" id="optional">(optional)</label>
                                    <input type="text" maxLength="6" id="maxRedemptionsPerStream" value={customRewards.redemptionPerStream} className={styles.inputBox} onChange={(event)=>this.props.setInputValue(event.target.value, 'redemptionPerStream', badgeNum)}/>
                                </div>
                                
                                <div className={styles.cooldownOption}>
                                    <label htmlFor="maxRedemptionPerUser" id="maxRedemptionPerUserLabel">Max Redemptions Per User</label><label htmlFor="maxRedemptionsPerUser" id="optional">(optional)</label>
                                    <input type="text" maxLength="6" id="maxRedemptionsPerUser" value={customRewards.redemptionPerUser} className={styles.inputBox} onChange={(event)=>this.props.setInputValue(event.target.value, 'redemptionPerUser', badgeNum)}/>
                                </div>
                            </div>
                            : null
                        }
                        
                        {this.props.alert ? <div className={styles.alert}>*Please fill in the required fields*<img src="https://cdn.betterttv.net/emote/59f27b3f4ebd8047f54dee29/1x" alt="emote"/></div> : null}

                        <FormButton title='save' color='#90D48B' action={(event)=>{
                            this.props.submitForm(event, this.props.badgeNum)
                            }}></FormButton>

                        <FormButton title={this.props.customRewards[this.props.badgeNum].rewardID === '' ? 'cancel' : 'delete'}
                            color='#ff9e9e'
                            action={()=>{
                                if(this.props.customRewards[this.props.badgeNum].rewardID === ''){
                                    this.props.deleteFormHandler(this.props.badgeNum)
                                    this.props.displayFormHandler(this.props.displayForm.status, null)
                                } else {
                                    this.props.displayFormHandler(this.props.displayForm.status, null)
                                    this.deleteCustomRewardOnTwitch(this.props.badgeNum)
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

export default connect(mapStateToProps, mapDispatchToProps)(Form)
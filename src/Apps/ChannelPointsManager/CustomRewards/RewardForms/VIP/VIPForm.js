import React, { Component } from 'react'
import { deleteCustomReward } from '../../../../../api/channelPointsManagerApi'
//Style
import styles from './VIPForm.module.scss'
//Components
import Subtitle from '../../../../../Components/OptionComponents/Subtitle/Subtitle'
import HorizontalTextInputCounter from '../../../../../Components/OptionComponents/HorizontalTextInputCounter/HorizontalTextInputCounter'
import HorizontalTextInputIcon from '../../../../../Components/OptionComponents/HorizontalTextInputIcon/HorizontalTextInputIcon'
import ColorSelect from '../../../../../Components/OptionComponents/ColorSelect/ColorSelect'
import TextAreaInput from '../../../../../Components/OptionComponents/TextAreaInput/TextAreaInput'
import FormButton from '../../../../../Components/OptionComponents/FormButton/FormButton'
import Disclaimer from '../../../../../Components/OptionComponents/Disclaimer/Disclaimer'
import HorizontalTextInput from '../../../../../Components/OptionComponents/HorizontalTextInput/HorizontalTextInput'
//Assets
import editIcon from '../../../../../resources/channelPointsManager/editEmoteIcon.png'
import channelPointsIcon from '../../../../../resources/channelPointsManager/customRewardIcon.png'
//State Management
import { connect } from 'react-redux'


export class VIPForm extends Component {

    state = {
        formUpdated: false
    }

    deleteCustomRewardOnTwitch = async (badgeNum) => {
        console.log(this.props.channel, this.props.customRewards[badgeNum].rewardID)
        await deleteCustomReward('http://localhost:5000', this.props.channel, this.props.customRewards[badgeNum].rewardID).then((res)=>{
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
                            this.setState({formUpdated: true})
                            this.props.setInputValue(event.target.value, 'rewardName', badgeNum)
                        }}
                    />

                    <div className={styles.formSpacer}></div>

                    {customRewards.rewardID === '' ? 
                        <HorizontalTextInput 
                            title='Length of VIP Status (hrs)*'
                            text={customRewards.statusLength}
                            width='290'
                            textInput={(text)=>{
                                if(customRewards.rewardID === ''){
                                    this.props.setInputValue(text, 'statusLength', badgeNum)
                                }
                            }}
                            // static='hours'
                            maxCount='3'
                            type='number'
                        />
                        :
                        <HorizontalTextInput 
                            title='Length of VIP Status (hrs)*'
                            text={customRewards.statusLength}
                            width='290'
                            static
                        />
                    }

                    {customRewards.rewardID === '' ? 
                        <HorizontalTextInput 
                            title='Max Redemptions Per Stream*'
                            text={customRewards.redemptionPerStream}
                            width='290'
                            textInput={(text)=>{
                                if(customRewards.rewardID === ''){
                                    this.props.setInputValue(text, 'redemptionPerStream', badgeNum)
                                }
                            }}
                            maxCount='2'
                            type='number'
                        />
                        :
                        <HorizontalTextInput 
                            title='Max Redemptions Per Stream*'
                            text={customRewards.redemptionPerStream}
                            width='290'
                            static
                        />
                    }

                    <div className={styles.formSpacer}></div>

                    <div className={styles.formGrid}>
                        <HorizontalTextInputIcon
                            title='Cost*'
                            maxCount='8'
                            width='110'
                            value={customRewards.cost}
                            action={(event)=>{
                                this.setState({formUpdated: true})
                                this.props.setInputValue(event.target.value, 'cost', badgeNum)
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
                                this.setState({formUpdated: true})
                                this.props.toggleColorSelect(customRewards.displayPicker, badgeNum)
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
                            this.setState({formUpdated: true})
                            this.props.setInputValue(event.target.value, 'description', badgeNum)
                        }}
                    />

                    <div className={styles.formSpacer}></div>

                    <Disclaimer 
                        width='300'
                        disclaimerText='This channel point reward will give the redeemed viewer
                        VIP status for the set length of time. The VIP status will
                        automatically be removed once the time is reached.
                        The max number of VIPs will only include viewers who
                        redeem this reward. Once the max number is reached, 
                        the reward will be paused until the start of next stream.'
                        color='white'
                    />

                    <div className={styles.formSpacer}></div>
                    
                    {this.props.alert ? <div className={styles.alert}>{this.props.alertMessage}<img style={{height: '24px'}} src="https://cdn.betterttv.net/emote/59f27b3f4ebd8047f54dee29/1x" alt="emote"/></div> : null}

                    <FormButton title={this.state.formUpdated ? 'save' : 'cancel'} color={customRewards.rewardID === '' ? '#90D48B' : '#05a1e5'} action={(event)=>{
                        if(this.state.formUpdated){
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
                    <div className={styles.formSpacer}></div>
                    <div className={styles.formSpacer}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VIPForm)

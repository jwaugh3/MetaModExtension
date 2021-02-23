import React, { Component } from 'react'
import { deleteCustomReward, getRewardEntries, getWinners, rerollWinner } from '../../../../../api/channelPointsManagerApi'
import { createRewardOnTwitch } from '../../../customRewardHandler'
//Style
import styles from './GiveawayReview.module.scss'
//Components
import Subtitle from '../../../../../Components/OptionComponents/Subtitle/Subtitle'
import FormButton from '../../../../../Components/OptionComponents/FormButton/FormButton'
import Disclaimer from '../../../../../Components/OptionComponents/Disclaimer/Disclaimer'
import HorizontalTextInput from '../../../../../Components/OptionComponents/HorizontalTextInput/HorizontalTextInput'


//State Management
import { connect } from 'react-redux'


export class GiveawayForm extends Component {

    componentDidMount = async () => {
        this.updateEntries(null)
        if(this.props.customRewards[this.props.badgeNum].completed === true){
            let winners = await getWinners(this.props.apiEndpoint, this.props.channel, this.props.customRewards[this.props.badgeNum].rewardID)
            this.setState({winners: winners})
        }
    }

    state = {
        entryCount: '',
        winners: [],
        formUpdated: false
    }

    updateEntries = async (event) => {
        if(event !== null){event.preventDefault()}

        let entries = await getRewardEntries(this.props.apiEndpoint, this.props.channel, this.props.customRewards[this.props.badgeNum].rewardID)
        this.setState({entryCount: entries.userEntries.length})
    }

    deleteCustomRewardOnTwitch = async (badgeNum) => {
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

        let rewardTitle = customRewards.rewardName.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });

        let renderedWinners = this.state.winners.map((winner)=> {
            return (
                <div className={styles.winnerSubContainer} key={winner}>
                    {/* <button className={styles.msgButton}><img src={msgSquare} className={styles.msgIcon} alt='msg'/></button> */}
                    <button className={styles.rerollButton} onClick={async(event)=>{
                        event.preventDefault()
                        let rerolledWinners = await rerollWinner(this.props.apiEndpoint, this.props.channel, customRewards.rewardID, winner)
                        this.setState({winners: rerolledWinners})
                    }}>
                        <div className={styles.rerollArrow}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height='22' viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                        </div>
                        <div className={styles.boxIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute'}} width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                        </div>
                    </button>
                    <div className={styles.winnerName}>{winner}</div>
                </div>
            )
        })

        return (
            <div className={styles.formContainer}>
                {offClick}
                <Subtitle title='Giveaway Review'/>
                <form>
                    <div className={styles.form}>

                        <div className={styles.formDetails}>
                            <p className={styles.title}>
                                {rewardTitle}
                            </p>

                            <div className={styles.rewardDetails}>
                                <HorizontalTextInput 
                                    title='Number of Winners'
                                    text={customRewards.winnerCount}
                                    width='220'
                                    textInput={async (text)=>{
                                        if(customRewards.completed === false){
                                            this.setState({formUpdated: true})
                                            await this.props.setInputValue(text, 'winnerCount', badgeNum)
                                            createRewardOnTwitch(this.props.apiEndpoint, this.props.channel, null, this.props.customRewards, null, this.props.setChannelPointAlert, this.props.badgeNum)
                                        }
                                    }}
                                    maxCount='3'
                                    type='number'
                                />

                                <div className={styles.entryContainer}>
                                    <HorizontalTextInput
                                        title='Number of Entries'
                                        text={this.state.entryCount}
                                        width='220'
                                        textInput={()=>{}}
                                        static='true'
                                    />
                                    <button className={styles.refreshButton} onClick={this.updateEntries}>
                                        <div className={styles.refreshIcon}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height='16' viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                        </div>
                                    </button>
                                </div>

                            </div>
                        
                        {customRewards.completed === true ? 
                            <div className={styles.winnerDetails}>
                                <div className={styles.giveawayTitle}>
                                    Giveaway Complete
                                </div>

                                <div className={styles.winnerContainer}>
                                    <p className={styles.winnerSubTitle}>Winners</p>
                                    
                                    {renderedWinners}
                                    
                                </div>

                            </div>
                            : null 
                        }

                        </div>

                    

                        <div className={styles.formSpacer}></div>

                        <div className={styles.disclaimerContainer}>
                            <Disclaimer 
                                width='300'
                                disclaimerText='This reward has already been created. To edit or change details other than the number of winners for this reward, delete this reward and create a new one with the desired settings.'
                                color='#ECE072'
                            />
                        </div>

                        {this.props.alert ? <div className={styles.alert}>*Number of Entries must be greater than the Number of Winners*</div> : null}
                        
                        {customRewards.completed === false ? 
                            <div className={styles.endGiveawayButton}>
                                <FormButton title='End Giveaway'
                                    color='#05a1e5'
                                    width='300'
                                    action={async (event)=>{
                                        if(this.state.entryCount > customRewards.winnerCount){
                                            this.props.toggleRewardStatus(badgeNum, customRewards.isEnabled)
                                            await this.props.setInputValue(true, 'completed', badgeNum)
                                            let updatedStatus = await createRewardOnTwitch(this.props.apiEndpoint, this.props.channel, this.props.setNewRewardID, this.props.customRewards, this.props.deleteFailedReward, this.props.setChannelPointAlert, this.props.badgeNum)
                                            let winners = await getWinners(this.props.apiEndpoint, this.props.channel, customRewards.rewardID)
                                            this.setState({winners: winners})
                                            if(updatedStatus.twitchStatus.error){
                                                this.props.displayFormHandler(this.props.displayForm.status, null)
                                                this.props.setInputValue(false, 'completed', badgeNum)
                                            }
                                        } else {
                                            event.preventDefault()
                                            this.props.setState(true)
                                            setTimeout(()=>{
                                                this.props.setState(false)
                                            }, 6000)
                                        }
                                    }}>
                                </FormButton>
                            </div>
                            : null
                        }

                        <div className={styles.formSpacer}></div>

                        <FormButton title='save'
                            color='#90D48B'
                            action={()=>{
                                if(customRewards.winnerCount !== ''){
                                    this.props.displayFormHandler(this.props.displayForm.status, null)
                                    this.props.setState(false)
                                } else {
                                    this.props.setState(true)
                                }
                            }}>
                        </FormButton>
                        

                        <div className={styles.formSpacer}></div>
                        
                            <FormButton title='delete'
                                color='#ff9e9e'
                                action={()=>{
                                    this.props.displayFormHandler(this.props.displayForm.status, null)
                                    this.deleteCustomRewardOnTwitch(this.props.badgeNum)
                                }}>
                            </FormButton>

                            
                </div>
            </form>
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
        deleteFormHandler: (badgeNum) => dispatch({type: 'DELETE_FORM', payload: badgeNum}),
        toggleRewardStatus: (badgeNum, status) => dispatch({type: 'TOGGLE_REWARD_STATUS', payload: {badgeNum, status}}),
        setChannelPointAlert: (alert) => dispatch({type: 'SET_CHANNEL_POINT_ALERT', payload: alert})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiveawayForm)

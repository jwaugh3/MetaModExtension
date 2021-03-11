import React, { Component } from 'react'
import { createRewardOnTwitch } from '../../customRewardHandler';
import { getMods, updateRewardSettings } from '../../../../api/channelPointsManagerApi'
//Components
import BasicForm from '../RewardForms/BasicReward/BasicForm';
import GiveawayForm from '../RewardForms/Giveaway/GiveawayForm';
import GiveawayReview from '../RewardForms/Giveaway/GiveawayReview';
import VIPForm from '../RewardForms/VIP/VIPForm';
import TimeoutForm from '../RewardForms/Timeout/TimeoutForm'
import DiscordRankForm from '../RewardForms/DiscordRank/DiscordRankForm'
//Style
import styles from './ChannelPointsFormWrapper.module.scss';
//State Management
import { connect } from 'react-redux'

class ChannelPointsForm extends Component {

    state = {
        alert: false,
        alertMessage: ''
    }

    submitForm = async (event, badgeNum) =>{
        event.preventDefault()
        let customRewards = this.props.customRewards[badgeNum]
        if(customRewards.rewardName !== '' && customRewards.cost !== ''){
            if(customRewards.rewardType === 'giveaway' && customRewards.winnerCount === ''){
                this.setState({alert: true, alertMessage: '*Please fill in the required fields*'})
            } else {
                this.props.displayFormHandler(this.props.displayForm.status, this.props.badgeNum)
                this.setState({alert: false})
                createRewardOnTwitch(this.props.apiEndpoint, this.props.channel, this.props.setNewRewardID, this.props.customRewards, this.props.deleteFailedReward, this.props.setChannelPointAlert, this.props.badgeNum)
            }
        } else {
            this.setState({alert: true, alertMessage: '*Please fill in the required fields*'})
        }
    }

    render() {

        let customRewards = this.props.customRewards[this.props.badgeNum]
        let renderedForm = []

        if(this.props.customRewards[this.props.badgeNum].rewardType === 'giveaway'){
            if(customRewards.rewardID !== ''){
                renderedForm.push(
                    <GiveawayReview key='giveawayReview' apiEndpoint={this.props.apiEndpoint} setState={(status)=>this.setState({alert: status})} alert={this.state.alert} apiEndpoint={this.props.apiEndpoint} badgeNum={this.props.badgeNum}/>
                )
            } else {
                renderedForm.push(
                    <GiveawayForm key='giveawayForm' apiEndpoint={this.props.apiEndpoint} submitForm={this.submitForm} cancelForm={this.props.cancelForm} alert={this.state.alert} badgeNum={this.props.badgeNum}/>   
                )
            }
        } else if(this.props.customRewards[this.props.badgeNum].rewardType === 'vip'){
            renderedForm.push(
                <VIPForm key='vipForm' apiEndpoint={this.props.apiEndpoint} submitForm={this.submitForm} cancelForm={this.props.cancelForm} alert={this.state.alert} alertMessage={this.state.alertMessage} badgeNum={this.props.badgeNum}/>
            )
        } else if(this.props.customRewards[this.props.badgeNum].rewardType === 'timeout'){
            renderedForm.push(
                <TimeoutForm key='timeoutForm' apiEndpoint={this.props.apiEndpoint} setState={(data)=>this.setState(data)} submitForm={this.submitForm} cancelForm={this.props.cancelForm} alert={this.state.alert} alertMessage={this.state.alertMessage} badgeNum={this.props.badgeNum}/>
            )
        } else if(this.props.customRewards[this.props.badgeNum].rewardType === 'discordRank'){
            renderedForm.push(
                <DiscordRankForm key='discordRankForm' apiEndpoint={this.props.apiEndpoint} setState={(data)=>this.setState(data)} submitForm={this.submitForm} cancelForm={this.props.cancelForm} alert={this.state.alert} alertMessage={this.state.alertMessage} badgeNum={this.props.badgeNum}/>
            )
        }
        else {
            renderedForm.push(
                <BasicForm key='basicForm' apiEndpoint={this.props.apiEndpoint} submitForm={this.submitForm} cancelForm={this.props.cancelForm} alert={this.state.alert} badgeNum={this.props.badgeNum}/>
            )
        } 

        return (
            <div className={styles.moduleContainer}>
                 {renderedForm}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        channel: state.applicationReducer.channel,
        customRewards: state.channelPointsManagerReducer.customRewards,
        displayForm: state.channelPointsManagerReducer.displayForm,
        mods: state.applicationReducer.mods
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createReward: (rewardData) => dispatch({type: 'CREATE_REWARD', payload: rewardData}),
        displayFormHandler: (status, badgeNum) => dispatch({type: 'DISPLAY_FORM', payload: {status, badgeNum}}),
        setNewRewardID: (newReward) => dispatch({type: 'SET_NEW_REWARD_ID', payload: newReward}),
        deleteFailedReward: () => dispatch({type: 'DELETE_FAILED_REWARD'}),
        setChannelPointAlert: (alert) => dispatch({type: 'SET_CHANNEL_POINT_ALERT', payload: alert})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPointsForm);

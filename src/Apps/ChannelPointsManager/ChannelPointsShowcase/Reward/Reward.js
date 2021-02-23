import React, { Component } from 'react'
import { createRewardOnTwitch } from '../../customRewardHandler';
//Components
import Auxiliary from '../../../../hoc/Auxiliary';
import ChannelPointsForm from '../../CustomRewards/ChannelPointsFormWrapper/ChannelPointsFormWrapper';
import ToggleSwitch from '../../../../Components/OptionComponents/ToggleSwitch/ToggleSwitch';
//Style
import styles from './Reward.module.scss';
//Assets
import costIcon from '../../../../resources/channelPointsManager/customRewardIcon.png';
//State Management
import { connect } from 'react-redux';

class Reward extends Component {

    cancelForm = (event) => {
        event.preventDefault()

        this.props.displayFormHandler(this.props.displayForm.status, null)
        this.props.cancelFormHandler(this.props.badgeNum)
    }

    render() {
        
        let toggler = []
        let badgeNum = this.props.badgeNum
        let customRewards = this.props.customRewards[badgeNum]
        let typeText = ''
        if(this.props.isManageable && customRewards.rewardType !== 'giveaway' && customRewards.rewardType !== undefined){
            toggler.push(
                <ToggleSwitch key='switch' toggleHandler={()=>{
                    this.props.toggleRewardStatus(this.props.badgeNum, this.props.customRewards[this.props.badgeNum].isEnabled)
                    createRewardOnTwitch(this.props.apiEndpoint, this.props.channel, this.props.setNewRewardID, this.props.customRewards, this.props.deleteFailedReward, this.props.setChannelPointAlert, this.props.badgeNum)
                }} checked={this.props.visibility === false ? null : this.props.customRewards[this.props.badgeNum].isEnabled} option={'toggleRewardStatus' + this.props.badgeNum}
                visibility={this.props.customRewards[this.props.badgeNum].rewardType !== 'giveaway' ? true : false}
                />
            )
        } else if(this.props.isManageable && customRewards.rewardType !== undefined) {
            typeText = customRewards.rewardType.charAt(0).toUpperCase() + '' + customRewards.rewardType.slice(1)
        }


        return (
            <Auxiliary>

                <div className={styles.rewardContainer} style={this.props.visibility ? {visibility: 'visible'} : {visibility: 'hidden'}} 
                        onClick={()=>this.props.isManageable ? this.props.displayFormHandler(this.props.displayForm.status, this.props.badgeNum) : ''}>

                    <div className={styles.rewardBadge} style={{backgroundColor: this.props.badgeColor}}>
                        
                        <div className={styles.toggleContainer}>
                            <div className={styles.rewardType}>
                                {customRewards.rewardType !== 'custom' && customRewards.isManageable ? 
                                    
                                        <p className={styles.typeText}>{typeText}</p>
                                
                                    : null           
                                }
                            </div>

                            {toggler}
                        </div>
                        <img className={styles.rewardIcon} src={this.props.rewardIcon} alt='reward icon'/>
                        <div className={styles.costContainer}>
                            <img className={styles.costIcon} src={costIcon} alt={'cost icon'}/>
                            <div className={styles.costText}>{this.props.rewardCost}</div>
                        </div>
                    </div>

                    <div className={styles.rewardTextContainer}>
                        <div className={styles.rewardText}>
                            {this.props.rewardText}
                        </div>
                    </div>
                </div>

                {this.props.displayForm.status && this.props.badgeNum === this.props.displayForm.badgeNum ?
                    
                        <ChannelPointsForm badgeNum={this.props.displayForm.badgeNum} cancelForm={this.cancelForm} apiEndpoint={this.props.apiEndpoint}/>
                    
                    : null
                }
            </Auxiliary>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        channel: state.applicationReducer.channel,
        displayForm: state.channelPointsManagerReducer.displayForm,
        customRewards: state.channelPointsManagerReducer.customRewards
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        displayFormHandler: (status, badgeNum, type) => dispatch({type: 'DISPLAY_FORM', payload: {status, badgeNum}}),
        cancelFormHandler: (badgeNum) => dispatch({type: 'CANCEL_FORM', payload: badgeNum}),
        toggleRewardStatus: (badgeNum, status) => dispatch({type: 'TOGGLE_REWARD_STATUS', payload: {badgeNum, status}}),
        setNewRewardID: (newReward) => dispatch({type: 'SET_NEW_REWARD_ID', payload: newReward}),
        deleteFailedReward: () => dispatch({type: 'DELETE_FAILED_REWARD'}),
        setChannelPointAlert: (alert) => dispatch({type: 'SET_CHANNEL_POINT_ALERT', payload: alert})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reward);

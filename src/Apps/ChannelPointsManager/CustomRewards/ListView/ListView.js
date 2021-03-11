import React, { Component } from 'react'
//Components
import PresetBadge from '../PresetBadge/PresetBadge'
import Subtitle from '../../../../Components/OptionComponents/Subtitle/Subtitle'
//Style
import styles from './ListView.module.scss'
//Functional Assets
import basicFormDefault from '../RewardForms/BasicReward/formDefault'
import giveawayFormDefault from '../RewardForms/Giveaway/giveawayFormDefault'
import vipFormDefault from '../RewardForms/VIP/vipFormDefault'
import timeoutFormDefault from '../RewardForms/Timeout/timeoutFormDefault'
import discordRankFormDefault from '../RewardForms/DiscordRank/discordRankFormDefault'
//State Management
import { connect } from 'react-redux'

export class ListView extends Component {
    render() {

        let renderOptions = [
            <PresetBadge 
                key='CreateYourOwn'
                title='Create Your Own'
                description='Create any type of reward you would like'
                action={()=>{
                    this.props.displayFormHandler(this.props.displayForm.status, 0)
                    this.props.createReward({...basicFormDefault})
                    this.props.setCurrentDisplay('manager')
                }}
            />,
            <PresetBadge 
                key='Giveaway'
                title='Giveaway'
                description='Create a giveaway for chat to join'
                action={()=>{
                    this.props.displayFormHandler(this.props.displayForm.status, 0)
                    this.props.createReward({...giveawayFormDefault})
                    this.props.setCurrentDisplay('manager')
                }}
            />,
            <PresetBadge 
                key='VIP'
                title='Become a VIP'
                description='Let a viewer become VIP'
                action={()=>{
                    this.props.displayFormHandler(this.props.displayForm.status, 0)
                    this.props.createReward({...vipFormDefault})
                    this.props.setCurrentDisplay('manager')
                }}
            />,
            <PresetBadge 
                key='TimeoutUser'
                title='Timeout a Chatter'
                description='Timeout viewer(s) in chat'
                action={()=>{
                    this.props.displayFormHandler(this.props.displayForm.status, 0)
                    this.props.createReward({...timeoutFormDefault})
                    this.props.setCurrentDisplay('manager')
                }}
            />,
            <PresetBadge 
                key='DiscordRanks'
                title='Discord Ranks'
                description='Allow viewers to rank up in Discord'
                action={()=>{
                    this.props.displayFormHandler(this.props.displayForm.status, 0)
                    this.props.createReward({...discordRankFormDefault})
                    this.props.setCurrentDisplay('manager')
                }}
            />
        ]


        return (
            <div className={styles.listContainer}>
                <Subtitle title='Reward Presets'></Subtitle>
                {renderOptions}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        displayForm: state.channelPointsManagerReducer.displayForm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        displayFormHandler: (status, badgeNum) => dispatch({type: 'DISPLAY_FORM', payload: {status, badgeNum}}),
        createReward: (rewardData) => dispatch({type: 'CREATE_REWARD', payload: rewardData}),
        setCurrentDisplay: (display) => dispatch({type: 'SET_CURRENT_DISPLAY', payload: display})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)

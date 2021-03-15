import React, { Component } from 'react'
import { getCustomRewardHandler } from './customRewardHandler';
import { getRewardSettings, getMods } from '../../api/channelPointsManagerApi';
//Components
import Auxiliary from '../../hoc/Auxiliary';
import TopNav from './TopNav/TopNav';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import ChannelPointsShowcase from './ChannelPointsShowcase/ChannelPointsShowcase';
import ListView from './CustomRewards/ListView/ListView'
import discordRankFormDefault from './CustomRewards/RewardForms/DiscordRank/discordRankFormDefault'
//Style
import styles from './ChannelPointsManager.module.scss';
//State Management
import { connect } from 'react-redux'

class ChannelPoints extends Component {

    state = {
        channelPointsReceived: false
    }

    componentDidMount = async() => {
        let backEndURL
        if(window.location.origin.includes("localhost")){
            backEndURL = 'http://localhost:5000'
        } else {
            backEndURL = 'https://api.metamoderation.com'
        }
        let rewardVerification = await getCustomRewardHandler(backEndURL, this.props.channel, this.props.createReward, this.props.setCustomSettings)
        
        if(rewardVerification === true){
            this.props.setChannelPointsReceived(true)
            this.setState({channelPointsReceived: true})
        }
        
        let rewardSettings = await getRewardSettings(backEndURL, this.props.channel, this.props.customRewards, this.props.setCustomSettings)

        // let mods = await getMods(this.props.apiEndpoint, this.props.channel)
        // this.props.setMods(mods)
    }

    render() {

        let renderDisplay = []

        switch(this.props.currentDisplay){
            case 'manager':
                renderDisplay.push(
                    <div className={styles.channelPointsModule} key='showcase'>
                        <ChannelPointsShowcase apiEndpoint={window.location.origin.includes("localhost") ? 'http://localhost:5000' : 'https://api.metamoderation.com'}/>                    
                    </div>
                )
                break;
            case 'list':
                renderDisplay.push(
                    <div className={styles.channelPointsModule} key='list'>
                        <ListView/>
                    </div>
                )
                break;
            default:
                renderDisplay.push(
                    <div className={styles.channelPointsModule} key='showcase1'>
                        <ChannelPointsShowcase apiEndpoint={window.location.origin.includes("localhost") ? 'http://localhost:5000' : 'https://api.metamoderation.com'}/>                    
                    </div>
                )
                break;
        }

        let renderedButton = []

        if(this.props.broadcasterType !== ''){
            renderedButton.push(
                <button key='manageButton' className={this.props.currentDisplay === 'list' ? styles.cancelButton : styles.createButton} onClick={()=>{
                    if(this.props.customRewards.length === 50){
                        this.props.setChannelPointAlert('There is a max of 50 custom rewards per channel. ')
                        setTimeout(()=>{
                            this.props.setChannelPointAlert('')
                        }, 6000)
                    } else {
                        this.props.currentDisplay === 'list' ? this.props.setCurrentDisplay('manager') : this.props.setCurrentDisplay('list')
                    }
                }}>{this.props.currentDisplay === 'list' ? 'x' : '+'}</button>
            )
        }
        


        return (
            <Auxiliary>
                <TopNav>
                    {/* <div> */}
                        <h1 className={styles.mainTitle}>Channel Points Manager</h1>
                        {/* <button onClick={()=>console.log(this.props.stateStorage, discordRankFormDefault)}></button> */}
                    {/* </div> */}
                    
                    {this.props.displayForm.status ? 
                        null
                        : 
                        <Auxiliary>
                            {renderedButton}
                        </Auxiliary>
                    }
                    

                </TopNav>
                {this.state.channelPointsReceived ?
                    renderDisplay
                    :
                    <div style={{width: '100%', height: '100%'}}>
                        <LoadingSpinner/>
                    </div>
                }
            </Auxiliary>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        channel: state.applicationReducer.channel,
        broadcasterType: state.applicationReducer.type,
        customRewards: state.channelPointsManagerReducer.customRewards,
        displayForm: state.channelPointsManagerReducer.displayForm,
        channelPointsReceived: state.applicationReducer.channelPointsReceived,
        storageState: state.applicationReducer,
        currentDisplay: state.channelPointsManagerReducer.currentDisplay,
        stateStorage: state.channelPointsManagerReducer,
        applicationStorage: state.applicationReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        displayFormHandler: (status, badgeNum) => dispatch({type: 'DISPLAY_FORM', payload: {status, badgeNum}}),
        createReward: (rewardData) => dispatch({type: 'CREATE_REWARD', payload: rewardData}),
        cancelFormHandler: (badgeNum) => dispatch({type: 'CANCEL_FORM', payload: badgeNum}),
        deleteFormHandler: (badgeNum) => dispatch({type: 'DELETE_FORM', payload: badgeNum}),
        setNewRewardID: (newReward) => dispatch({type: 'SET_NEW_REWARD_ID', payload: newReward}),
        setChannelPointAlert: (alert) => dispatch({type: 'SET_CHANNEL_POINT_ALERT', payload: alert}),
        setChannelPointsReceived: (newStatus) => dispatch({type: 'SET_CHANNEL_POINTS_RECEIVED', payload: newStatus}),
        setCurrentDisplay: (display) => dispatch({type: 'SET_CURRENT_DISPLAY', payload: display}),
        setCustomSettings: (badgeNum, key, value) => dispatch({type: 'SET_CUSTOM_SETTINGS', payload: {badgeNum, key, value}}),
        setMods: (mods) => dispatch({type: 'SET_MODS', payload: mods})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPoints)

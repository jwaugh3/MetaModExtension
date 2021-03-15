import React, { Component } from 'react'
//Components
import Reward from './Reward/Reward';
import Subtitle from '../../../Components/OptionComponents/Subtitle/Subtitle'
//Style
import styles from './ChannelPointsShowcase.module.scss';
//Assets
import tempIcon from '../../../resources/channelPointsManager/unlockEmoteIcon.png';
//State Management
import { connect } from 'react-redux'

export class ChannelPointsShowcase extends Component {

    render() {
        let renderedCustomRewards = []
        let renderedManageableCustomRewards = []

        if(this.props.customRewards.length > 0){
            this.props.customRewards.forEach((reward)=>{
                if(!reward.isManageable){
                    renderedCustomRewards.push(
                        <Reward 
                            key={this.props.customRewards.indexOf(reward)} 
                            badgeNum={this.props.customRewards.indexOf(reward)}
                            rewardText={reward.rewardName} 
                            rewardCost={reward.cost} 
                            rewardIcon={tempIcon} 
                            badgeColor={reward.backgroundColor}
                            visibility={true}
                            isManageable={reward.isManageable}
                            apiEndpoint={this.props.apiEndpoint}
                        />
                    )
                } else {
                    renderedManageableCustomRewards.push(
                        <Reward 
                            key={this.props.customRewards.indexOf(reward)} 
                            badgeNum={this.props.customRewards.indexOf(reward)}
                            rewardText={reward.rewardName} 
                            rewardCost={reward.cost} 
                            rewardIcon={tempIcon} 
                            badgeColor={reward.backgroundColor}
                            visibility={true}
                            isManageable={reward.isManageable}
                            apiEndpoint={this.props.apiEndpoint}
                        />
                    )
                }
            })
        }

        return (
            <div className={styles.showcaseContainer} style={this.props.displayForm.status ? {overflow: 'hidden'} : {visibility: 'visible'}}>
                    {this.props.broadcasterType !== '' ? 
                        <div className={styles.rewardScrollContainer}>
                            <div className={styles.customContainer}>
                                <Subtitle title='Custom Rewards'>
                                    {this.props.channelPointAlert !== '' ? <div className={styles.channelPointsAlert}>
                                        {this.props.channelPointAlert}
                                        <img src='https://cdn.betterttv.net/emote/5e0fa9d40550d42106b8a489/1x' style={{height: '20px', marginLeft: '4px'}} alt="sadge"/>
                                        </div> 
                                        : null}
                                </Subtitle>
                                <div className={styles.rewardContainer}>
                                    {renderedManageableCustomRewards.length > 0 ?
                                        renderedManageableCustomRewards
                                        : <p className={styles.subText} style={{color: '#90D48B'}}>Create a reward by clicking the + button at the top right.</p>
                                    }                       
                                </div>
                            </div>
                            {renderedCustomRewards.length > 0 ?
                            <div className={styles.customContainer}>
                                <Subtitle title='Twitch Managed Rewards'>
                                
                                    <a target="_blank" rel="noopener noreferrer" style={{display: 'inline'}} href={'https://dashboard.twitch.tv/u/' + this.props.channel + '/community/channel-points/rewards'}>
                                    <div className={styles.channelPointLink}>
                                        <p className={styles.channelPointText}>Manage Rewards</p>
                                        <div className={styles.svg}>
                                            <svg height="15px" width="15px" className={styles.svgContainer}>
                                                <path transform="scale(0.028)" fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path>
                                            </svg>
                                        </div>
                                        </div>
                                    </a>
                                </Subtitle>
                                
                                    
                                        <div className={styles.rewardContainer}>
                                            {renderedCustomRewards}
                                        </div>
                                                             
                               
                                
                                {/* <div className={styles.rewardContainer}>
                                    {this.props.broadcasterType !== '' ?
                                        null
                                        : <Reward/>
                                    }                       
                                </div> */}
                            </div>
                            : 
                            null
                        }  
                        </div>
                        
                    : <div className={styles.noRecords}>This feature requires the channel to be affiliate/partner. <img src="https://cdn.betterttv.net/emote/59f27b3f4ebd8047f54dee29/2x" style={{width: '20px'}} alt='doggo'/></div>}
                    </div>
                    
        )
    }
}

const mapStateToProps = (state) => {
    return {
        channel: state.applicationReducer.channel,
        broadcasterType: state.applicationReducer.type,
        customRewards: state.channelPointsManagerReducer.customRewards,
        channelPointAlert: state.channelPointsManagerReducer.channelPointAlert,
        displayForm: state.channelPointsManagerReducer.displayForm
    }
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPointsShowcase)

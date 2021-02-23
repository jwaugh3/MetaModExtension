import React, { Component } from 'react'
//Components
import AppLayout from '../../Components/AppLayout/AppLayout'
import Subtitle from '../../Components/OptionComponents/Subtitle/Subtitle'
import MultiSelectOption from '../../Components/OptionComponents/MultiSelectOption/MultiSelectOption'
import TimeOption from '../../Components/OptionComponents/TimeOption/TimeOption'
import ToggleOption from '../../Components/OptionComponents/ToggleOption/ToggleOption'
import HorizontalTextInput from '../../Components/OptionComponents/HorizontalTextInput/HorizontalTextInput'
import NoteText from '../../Components/OptionComponents/NoteText/NoteText'
import LinkPatreon from './LinkPatreon/LinkPatreon'
import Auxiliary from '../../hoc/Auxiliary'
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'
//Functional Asssets
import { modeSelectionHandler } from './assetFunction/assetFunction'
import { getFleamarketbotSettings, updateFleamarketbot, updateChannel } from '../../api/mainApi'
import moment from 'moment'
//Style
import styles from './Fleamarketbot.module.scss'
//State Management
import { connect } from 'react-redux'

export class Fleamarketbot extends Component {

    state = {
        waitingResponse: false,
        changeError: false,
        nextChange: '',
        updatedChannel: false
    }

    componentDidMount = async () => {
        let settings = await getFleamarketbotSettings('http://localhost:5000', this.props.jwtToken)
        this.props.setStorageState(settings)
        console.log(settings)
    }

    updateSettings = async () => {
        this.setState({waitingResponse: true})

        let response = await updateFleamarketbot('http://localhost:5000', this.props.jwtToken, this.props.stateSnapshot)
        if(response.success){
            this.setState({waitingResponse: false})
        }
    }

    updateChannel = async () => {
        let monthAgo = new Date()
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        if(monthAgo.getTime() > new Date(this.props.lastChanged).getTime()){
            console.log('ran updatechannel')
            console.log(this.props.stateSnapshot)
            updateChannel('http://localhost:5000', this.props.jwtToken, this.props.stateSnapshot)
            this.setState({updatedChannel: true})
            this.props.setLastChanged(new Date().toString())
        } else {
            let newChange = new Date(this.props.lastChanged)
            newChange.setMonth(newChange.getMonth()+1)
            // newChange
            this.setState({changeError: true, updatedChannel: false, nextChange: moment(newChange).from()})
            console.log('no long enough')
        }
        
    }

    render() {
        return (
            
            <AppLayout title="Fleamarketbot">

            {this.props.tier === '' ? 
            <LinkPatreon/>
            :
                <Auxiliary>

                {this.state.waitingResponse ? 
                    <div className={styles.waitingResponse}>
                        <div className={styles.spinnerContainer}>
                            <div className={styles.spinner}>
                                <LoadingSpinner className={styles.spinner} height='10px' width='10px'/>
                            </div>
                        <p className={styles.updating}>Updating...</p>
                        </div>
                    </div>
                    :
                    null
                }

                <Subtitle title="Preference"/>
                {/* <button onClick={()=>console.log(this.props.stateSnapshot)}>test</button> */}
                <div className={styles.preferenceContainer}>
                    {this.props.tier === 'standard' ? null
                    :
                    <MultiSelectOption 
                        title="Mode" 
                        options={['allchat', 'subonly', 'modonly']}
                        selected={this.props.modeSelection}
                        selectedColor={['#7288F6']}
                        setStore={async (option)=>{
                            await this.props.setModeSelection(option)
                            this.updateSettings()
                        }}
                    />
                    }

                    <TimeOption
                        title="Delay"
                        input={this.props.delay}
                        setTimeInput={async (delay)=> {
                            await this.props.setDelay(delay)
                            if(this.props.delay !== ''){
                                this.updateSettings()
                            }
                        }}
                        static='seconds'
                    />

                    <ToggleOption 
                        title="Target Requester"
                        highlight="(@viewer)"
                        toggleHandler={async ()=>{
                            await this.props.setTargetRequester()
                            this.updateSettings()
                        }} 
                        checked={this.props.targetRequester} 
                        option={'Target Requester'}
                    />
                </div>

                <div className={styles.spacer}></div>

                <Subtitle title="Access"/>
                <div className={styles.accessContainer}>
                    <HorizontalTextInput
                        title="Connected Channel"
                        textInput={(event)=>this.props.setChannelConnection(event.target.value)}
                        text={this.props.channelConnected}
                    />
                    <button className={styles.updateButton} onClick={this.updateChannel}>Update Channel</button>
                    {this.state.changeError ? <div className={styles.error}>Next change available {this.state.nextChange} </div> : null}
                    {this.state.updatedChannel ? <div className={styles.updatedMessage}>Channel Updated</div> : null}
                    <NoteText
                        text="Channel connected controls which channel Fleamarketbot will join. 
                        Can only be changed once per month. Should be the name displayed in your twitch
                        url. eg: twitch.tv/YourName"
                    />
                </div>
                </Auxiliary>
            }
            </AppLayout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        channel: state.applicationReducer.channel,
        jwtToken: state.applicationReducer.jwtToken,
        modeSelection: state.fleamarketbotReducer.modeSelection,
        delay: state.fleamarketbotReducer.delay, 
        targetRequester: state.fleamarketbotReducer.targetRequester,
        channelConnected: state.fleamarketbotReducer.channelConnected,
        lastChanged: state.fleamarketbotReducer.lastChanged,
        tier: state.fleamarketbotReducer.tier,
        stateSnapshot: state.fleamarketbotReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setModeSelection: (selection) => dispatch({type: 'SET_MODE_SELECTION', payload: selection}),
        setDelay: (input) => dispatch({type: 'SET_DELAY', payload: input}),
        setTargetRequester: () => dispatch({type: 'SET_TARGET_REQUESTER'}),
        setChannelConnection: (channelConnected) => dispatch({type: 'SET_CHANNEL_CONNECTION', payload: channelConnected}),
        setStorageState: (settings) => dispatch({type: 'SET_STORAGE_STATE', payload: settings}),
        setLastChanged: (date) => dispatch({type: 'SET_LAST_CHANGED', payload: date})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Fleamarketbot)
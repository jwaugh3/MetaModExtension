import React, { Component } from 'react'
import { deleteCustomReward } from '../../../../../api/channelPointsManagerApi'
import openSignInWindow from '../../../../../Login-Popup/openPopup'
//Style
import styles from './DiscordRankForm.module.scss'
//Components
import Subtitle from '../../../../../Components/OptionComponents/Subtitle/Subtitle'
import HorizontalTextInputCounter from '../../../../../Components/OptionComponents/HorizontalTextInputCounter/HorizontalTextInputCounter'
import HorizontalTextInputIcon from '../../../../../Components/OptionComponents/HorizontalTextInputIcon/HorizontalTextInputIcon'
import ListInput from './ListInput/ListInput'
import ColorSelect from '../../../../../Components/OptionComponents/ColorSelect/ColorSelect'
import TextAreaInput from '../../../../../Components/OptionComponents/TextAreaInput/TextAreaInput'
import FormButton from '../../../../../Components/OptionComponents/FormButton/FormButton'
import Disclaimer from '../../../../../Components/OptionComponents/Disclaimer/Disclaimer'
//Assets
import editIcon from '../../../../../resources/channelPointsManager/editEmoteIcon.png'
import channelPointsIcon from '../../../../../resources/channelPointsManager/customRewardIcon.png'
import discordIcon from '../../../../../resources/channelPointsManager/discordIcon.png'
import discordButton from '../../../../../resources/channelPointsManager/discordButton.png'
//State Management
import { connect } from 'react-redux'


export class DiscordRankForm extends Component {

    state = {
        serverName: '',
        serverID: '',
        ownerLogin: '',
        ownerID: ''
    }

    componentDidMount(){
        window.addEventListener("message", async (event)=>{
            console.log(event)
            let userData = event.data.split('&')
            let badgeNum = this.props.badgeNum

            if(event.data.substring(0,11) === '?discordID='){
                this.setStoreData(userData, badgeNum)
            }
        })
    }

    setStoreData = (userData, badgeNum) => { //set redux store 
        let discordID = userData[0].substring(11, userData[0].length)
        let discordLogin =  userData[1].substring(13, userData[1].length)
        let discriminator = userData[2].substring(14, userData[2].length)
        let serverName = userData[3].substring(11, userData[3].length)
        let serverID = userData[4].substring(9, userData[4].length)
console.log(userData, badgeNum)
        this.props.setInputValue(serverName, 'serverName', badgeNum)
        this.props.setInputValue(serverID, 'serverID', badgeNum)
        this.props.setInputValue(discordLogin, 'ownerLogin', badgeNum)
        this.props.setInputValue(discordID, 'ownerID', badgeNum)
        this.props.setInputValue(discriminator, 'discriminator', badgeNum)
    }

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

    checkDuplicates = (array) => {
        var valuesSoFar = [];
        for (var i = 0; i < array.length; ++i) {
            var value = array[i];
            if (valuesSoFar.indexOf(value) !== -1) {
                return true;
            }
            valuesSoFar.push(value);
        }
        return false;
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
                            this.props.setInputValue(event.target.value, 'rewardName', badgeNum)
                        }}
                    />

                    <div className={styles.formSpacer}></div>

                    <label id='discordServer' style={{width: 210-80 + 'px'}} className={styles.title}>Discord Server</label>
                    {customRewards.serverName === '' ?
                        <div className={styles.discordButtonContainer} onClick={()=>{
                            let backEndURL
                            if(window.location.origin.includes("localhost")){
                                backEndURL = 'http://localhost:5000'
                            } else {
                                backEndURL = 'https://api.metamoderation.com'
                            }
                            openSignInWindow(backEndURL + '/connect/discordBot', 'joinServer')
                        }}>
                            <img src={discordButton} className={styles.discordButton} alt='discord button'/>
                        </div>
                        :
                        <div>
                            <img src={discordIcon} className={styles.discordIcon} alt='discord'/>
                            <p className={styles.serverName}>{customRewards.serverName}</p>
                        </div>
                    }
                    
                    
                    <ListInput
                            inputPlaceholders={customRewards.rankNames}
                            title='Discord Role Names*'
                            maxCount='100'
                            max='10'
                            badgeNum={badgeNum}
                            customRewards={this.props.customRewards}
                            handleColorChangeComplete={(color, index)=>{this.props.setInputArrayValue(color, 'rankColors', index, badgeNum)}}
                            showCustomPicker={this.props.showCustomPicker}
                            toggleColorSelect={this.props.toggleColorSelect}
                            setInputValue={this.props.setInputValue}
                            setInputArrayValue={this.props.setInputArrayValue}
                            removeInputArrayValue={this.props.removeInputArrayValue}
                            insertInputArrayValue={this.props.insertInputArrayValue}
                    />

                    <div className={styles.formSpacer}></div>

                    <div className={styles.formGrid}>
                        <HorizontalTextInputIcon
                            title='Cost*'
                            maxCount='8'
                            width='110'
                            value={customRewards.cost}
                            action={(event)=>{
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
                            this.props.setInputValue(event.target.value, 'description', badgeNum)
                        }}
                    />

                    <div className={styles.formSpacer}></div>

                    <Disclaimer 
                        width='300'
                        disclaimerText='This channel point reward will automatically level the viewer to the next level in a discord server.
                        *Discord Role Name must NOT already exist in your 
                        discord server. Specific role permissions can be changed/managed within discord.'
                        color='white'
                    />

                    <div className={styles.formSpacer}></div>
                    
                    {this.props.alert ? <div className={styles.alert}>{this.props.alertMessage}<img style={{height: '24px'}} src="https://cdn.betterttv.net/emote/59f27b3f4ebd8047f54dee29/1x" alt="emote"/></div> : null}

                    <FormButton title='save' color='#90D48B' action={(event)=>{
                        event.preventDefault()
                        let duplicateStatus = this.checkDuplicates(customRewards.rankNames)
                        if(duplicateStatus === true){
                            this.props.setState({alert: true, alertMessage: 'Please remove duplicate rank names '})
                        } else if(customRewards.serverID === ''){
                            this.props.setState({alert: true, alertMessage: 'Please connect your Discord Server '})
                        } else {
                            this.props.submitForm(event, this.props.badgeNum)
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
        setInputArrayValue: (value, input, index, badgeNum) => dispatch({type: 'SET_INPUT_ARRAY_VALUE', payload: {value, input, index, badgeNum}}),
        removeInputArrayValue: (input, index, badgeNum) => dispatch({type: 'REMOVE_INPUT_ARRAY_VALUE', payload: { input, index, badgeNum}}),
        insertInputArrayValue: (value, input, badgeNum) => dispatch({type: 'INSERT_INPUT_ARRAY_VALUE', payload: { value, input, badgeNum}}),
        displayFormHandler: (status, badgeNum) => dispatch({type: 'DISPLAY_FORM', payload: {status, badgeNum}}),
        deleteFormHandler: (badgeNum) => dispatch({type: 'DELETE_FORM', payload: badgeNum})

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscordRankForm)
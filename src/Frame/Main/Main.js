import React, { Component } from 'react'
import { connect } from 'react-redux'
//Components
import SideNav from '../../Components/SideNav/SideNav'
import AppManager from '../AppManger/AppManger'
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'
//Functional Assets
import { getChannel } from '../../api/mainApi'
//Styles
import styles from './Main.module.scss'

export class Main extends Component {

    componentDidMount = async () => {
        let channelInfo = await getChannel(this.props.apiEndpoint, this.props.jwtToken)
        this.props.setChannel(channelInfo.channel)
        this.props.setBroadcasterType(channelInfo.type)
    }

    render() {
        return (
            <div className={styles.mainContainer}>
               <SideNav/>
               <div className={styles.contentArea}>
                   {this.props.channel ? 
                        <AppManager/>
                        :
                        <LoadingSpinner/>
                    }
               </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        jwtToken: state.applicationReducer.jwtToken,
        channel: state.applicationReducer.channel
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setChannel: (channel) => dispatch({type: 'SET_CHANNEL', payload: channel}),
        setBroadcasterType: (type) => dispatch({type: 'SET_BROADCASTER_TYPE', payload: type}),
        setJWTToken: (token) => dispatch({type: 'SET_JWT_TOKEN', payload: token})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

import React, { Component } from 'react'
import appsAvailable from './appsAvailable';
import myApps from './myApps';
//Components
import Auxiliary from '../../hoc/Auxiliary';
//State Management
import { connect } from 'react-redux'

export class AppManger extends Component {

    componentDidMount(){
        this.props.setMyApps(myApps)
        this.props.setAvailableApps(appsAvailable)
        this.props.setCurrentApp('ChannelPointsManager')
    }

    render() {

        let renderedApp = this.props.currentApp === '' ? null : this.props.appsAvailable[this.props.currentApp][0]
    
        return (
            <Auxiliary>
               {renderedApp}
            </Auxiliary>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentApp: state.applicationReducer.currentApp,
        myApps: state.appsReducer.myApps,
        appsAvailable: state.appsReducer.appsAvailable
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setAvailableApps: (apps) => dispatch({type: 'SET_AVAILABLE_APPS', payload: apps}),
        setMyApps: (apps) => dispatch({type: 'SET_MY_APPS', payload: apps}),
        setCurrentApp: (app) => dispatch({type: 'SET_CURRENT_APP', payload: app})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppManger)

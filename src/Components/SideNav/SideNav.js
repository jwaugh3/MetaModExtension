import React, { Component } from 'react'
//State Management
import { connect } from 'react-redux'
//Styles
import styles from './SideNav.module.scss'
//Assets

export class SideNav extends Component {

   

    
    render() {

        let appIcons = this.props.myApps.map((app)=>{
            if(this.props.appsAvailable[app]){
                return( 
                    <div key={app} className={styles.app} onClick={()=>this.props.setCurrentApp(app)}>
                        <img className={styles.navButtonImage} src={this.props.appsAvailable[app][1]} alt={app}/>
                    </div> 
                ) 
            } else {
                return null
            }
        })

        return (
            <div className={styles.navContainer}>
                <div className={styles.appContainer}>
                    {appIcons}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        myApps: state.appsReducer.myApps,
        appsAvailable: state.appsReducer.appsAvailable,
        currentApp: state.applicationReducer.currentApp
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setCurrentApp: (app) => dispatch({type: 'SET_CURRENT_APP', payload: app})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav)

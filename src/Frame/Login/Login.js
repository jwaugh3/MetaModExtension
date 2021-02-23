import React, { Component } from 'react'
import openSignInWindow from '../../Login-Popup/openPopup';
import { connect } from 'react-redux'
//Components
import loginButton from '../../resources/loginButton.png'
import loginLogo from '../../resources/loginLogo.png'
//Styles
import styles from './Login.module.scss'

export class Login extends Component {

    logUserIn = () => {
        openSignInWindow('http://localhost:5000/auth/login', 'authenticate')
    }

    render() {
        return (
            <div className={styles.mainContainer}>
                <img src={loginLogo} className={styles.loginLogo} alt='login'/>
               <button className={styles.loginButton}
                onClick={()=>this.logUserIn()}>
                    <img src={loginButton} className={styles.loginImage} alt='login'/>
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        jwtToken: state.applicationReducer.jwtToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setJWTToken: (token) => dispatch({type: 'SET_JWT_TOKEN', payload: token})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

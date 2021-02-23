import React, { Component } from 'react'
import FormButton from '../../../Components/OptionComponents/FormButton/FormButton'
//Resources
import patreonIcon from '../../../resources/patreonIcon.jpg'
//Functional Assets
import openSignInWindow from '../../../Login-Popup/openPopup'
//Style
import styles from './LinkPatreon.module.scss'
//State Management
import { connect } from 'react-redux'

export class LinkPatreon extends Component {

    connectPatreon = () => {
        console.log(this.props.jwtToken)
        openSignInWindow('http://localhost:5000/patreon/login?token=' + this.props.jwtToken, 'authenticate')
    }

    render() {
        return (
            <div className={styles.connectButtonContainer}>
                    <img src={patreonIcon} className={styles.patreonIcon}/>
                    <div className={styles.connectButton} onClick={()=>this.connectPatreon()}>
                        <FormButton
                            title="Link Your Patreon"
                            color="#F96854"
                        />
                    </div>
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkPatreon)

import React, { Component } from 'react'
//Styles
import styles from './HorizontalTextInputIcon.module.scss'

export default class HorizontalTextInputIcon extends Component {

    validate = (event) => {
        if(event.target.value === '' || /^\d+$/.test(event.target.value)){
            this.props.action(event)
        }
    }

    render() {
        return (
            <div className={styles.horizontalInputContainer}>
                <label htmlFor={this.props.title} id="costLabel">{this.props.title}</label>
                <input type="text" maxLength="8" id={this.props.title} value={this.props.value} style={{width: this.props.width + 'px'}} onChange={(event)=>{
                    if(this.props.type === 'number'){this.validate(event)}
                    else {this.props.action(event)}
                }} className={styles.costInput}/>
                <img src={this.props.icon} alt='icon' className={styles.icon} style={{left: this.props.width-24 + 'px'}}/>
            </div>
        )
    }
}

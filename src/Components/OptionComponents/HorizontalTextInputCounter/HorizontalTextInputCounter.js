import React, { Component } from 'react'
//Styles
import styles from './HorizontalTextInputCounter.module.scss'

export default class HorizontalTextInputCounter extends Component {
    render() {
        return (
            <div className={styles.inputContainer}>
                <label htmlFor={this.props.title} id="nameLabel">{this.props.title}</label>
                <label htmlFor={this.props.title} id="charCount" style={this.props.width > 150 ? {marginLeft: this.props.width-150-28 + 'px'} : {marginLeft: '8px'}}>{this.props.count}/45</label>
                <input type="text" maxLength={this.props.maxCount} style={{width: this.props.width + 'px'}} id={this.props.title} value={this.props.value} className={styles.inputBox} onChange={this.props.action}/>
            </div>
        )
    }
}

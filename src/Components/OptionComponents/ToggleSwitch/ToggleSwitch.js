import React, { Component } from 'react'
//Style
import styles from './ToggleSwitch.module.scss';

export default class ToggleSwitch extends Component {
    render() {
        return (
            <div className={styles['on-off-toggle']} style={this.props.visibility ? {visibility: 'visible'} : {visibility: 'hidden'}}>
                <input className={styles['on-off-toggle__input']} type="checkbox" id={this.props.option} checked={this.props.checked} onChange={()=>this.props.toggleHandler(this.props.option)}/>
                <label htmlFor={this.props.option} className={styles['on-off-toggle__slider']}></label>
            </div>
        )
    }
}

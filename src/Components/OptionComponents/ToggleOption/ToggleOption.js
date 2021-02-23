import React, { Component } from 'react'
//Style
import styles from './ToggleOption.module.scss'

export default class ToggleOption extends Component {
    render() {

        return (
            <div className={styles.toggleOptionContainer} style={{width: this.props.width + 'px'}}>
                <div className={styles.toggleOptionTitleContainer}>
                    <div className={styles.toggleOptionTitle}>{this.props.title} <p className={styles.highlight}>{this.props.highlight}</p></div>
                </div>
                <div className={styles['on-off-toggle']}>
                    <input className={styles['on-off-toggle__input']} type="checkbox" id={this.props.option} checked={this.props.checked} onChange={()=>this.props.toggleHandler()}/>
                    <label htmlFor={this.props.option} className={styles['on-off-toggle__slider']}></label>
                </div>
            </div>
        )
    }
}

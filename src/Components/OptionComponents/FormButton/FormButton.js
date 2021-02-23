import React, { Component } from 'react'
//Style
import styles from './FormButton.module.scss'

export default class FormButton extends Component {
    render() {
        return (
            <button 
                className={styles.formButton} 
                style={{backgroundColor: this.props.color, width: this.props.width + 'px'}}
                onClick={this.props.action}
                >
                    <p className={styles.text}>{this.props.title}</p>
            </button>
        )
    }
}

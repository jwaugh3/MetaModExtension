import React, { Component } from 'react'
//Styles
import styles from './Disclaimer.module.scss'

export default class Disclaimer extends Component {
    render() {
        return (
            <div className={styles.disclaimerContainer}>
                <p className={styles.disclaimerText} style={{color: this.props.color}}>
                    {this.props.disclaimerText}
                </p>
            </div>
        )
    }
}

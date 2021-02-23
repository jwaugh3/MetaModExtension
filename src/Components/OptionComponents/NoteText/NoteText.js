import React, { Component } from 'react'
//Style
import styles from './NoteText.module.scss'

export default class NoteText extends Component {
    render() {
        return (
            <div className={styles.noteContainer}>
                <p className={styles.noteText}>
                    {this.props.text}
                </p>
            </div>
        )
    }
}

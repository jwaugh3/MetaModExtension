import React, { Component } from 'react'
//Style
import styles from './Subtitle.module.scss'

class Subtitle extends Component {
    render() {
        return (
            <div className={styles.subtitleContainer}>
                <div className={styles.subtitle}>
                    {this.props.title}{this.props.children}
                </div>
            </div>
        )
    }
}

export default Subtitle;
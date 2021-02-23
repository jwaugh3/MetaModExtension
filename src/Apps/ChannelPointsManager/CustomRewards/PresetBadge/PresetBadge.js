import React, { Component } from 'react'
//Style
import styles from './PresetBadge.module.scss'

export default class PresetBadge extends Component {
    render() {
        return (
            <div className={styles.presetContainer} onClick={this.props.action}>
                <div className={styles.titleContainer}>
                    <p className={styles.title}>
                        {this.props.title}
                    </p>
                </div>
                
                <div className={styles.descContainer}>
                    <p className={styles.description}>
                        {this.props.description}
                    </p>
                </div>
            </div>
        )
    }
}

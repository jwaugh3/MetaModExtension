import React, { Component } from 'react'
//Style
import styles from './AppLayout.module.scss'

export class AppLayout extends Component {
    render() {
        return (
            <div className={styles.layoutContainer}>
                <div className={styles.headerContainer}>
                    <div className={styles.header}>
                        {this.props.title}
                    </div>
                </div>

                <div className={styles.appContentContainer}>
                    <div className={styles.appContent}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default AppLayout
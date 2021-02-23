import React, { Component } from 'react'
//Styling
import styles from './LoadingSpinner.module.scss';

export default class Loading extends Component {
    render() {
        return (
            <div className={styles['lds-ring']}><div></div><div></div><div></div><div></div></div>
        )
    }
}

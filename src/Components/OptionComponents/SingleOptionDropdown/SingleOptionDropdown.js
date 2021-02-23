import React, { Component } from 'react'
//Styles
import styles from './SingleOptionDropdown.module.scss'
//Components
import SingleSelectDropdown from '../SingleSelectDropdown/SingleSelectDropdown'

export default class SingleOptionDropdown extends Component {
    render() {
        return (
            <div className={styles.singleOptionContainer} style={{width: this.props.width + 'px'}}>

                <div className={styles.optionTitleContainer}>
                    <p className={styles.optionTitle}>{this.props.title}</p>
                </div>
                <div className={styles.dropdownContainer} style={{marginLeft: this.props.width*.5-80 + 'px'}}>
                    <SingleSelectDropdown
                        selected={this.props.selected} 
                        options={this.props.options} 
                        setTimeUnit={this.props.optionHandler}
                    />
                </div>
            </div>
        )
    }
}

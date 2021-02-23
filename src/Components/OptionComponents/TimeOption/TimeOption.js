import React, { Component } from 'react'
//Components
import SingleSelectDropdown from '../SingleSelectDropdown/SingleSelectDropdown'
//Style
import styles from './TimeOption.module.scss'

export default class TimeOption extends Component {

    validate = (event) => {
        if(event.target.value === '' || /^\d+$/.test(event.target.value)){
            this.props.setTimeInput(event.target.value)
        }
      }

    render() {
        return (
            <div className={styles.timeOptionContainer}>
                <div className={styles.optionTitle}>
                    {this.props.title}
                </div>

                <div className={styles.inputContainer}>
                    <div className={styles.optionGrid}>
                        <input type="text" maxLength={this.props.maxCount} id={this.props.title} value={this.props.input} onChange={(event)=>this.validate(event)} className={styles.delayInput}/>
                        {this.props.static ? <p className={styles.staticTitle}>{this.props.static}</p> 
                        : 
                            <SingleSelectDropdown selected={this.props.selected} options={['seconds', 'minutes', 'hours']} setTimeUnit={this.props.setTimeUnit}/>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

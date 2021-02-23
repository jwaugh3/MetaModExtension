import React, { Component } from 'react'
//Style
import styles from './HorizontalTextInput.module.scss'

export default class HorizontalTextInput extends Component {

    validate = (event) => {
        if(event.target.value === '' || /^\d+$/.test(event.target.value)){
            this.props.textInput(event.target.value)
        }
    }

    render() {
        return (
            <div className={styles.inputContainer} style={{width: this.props.width + 'px', gridTemplateColumns: this.props.width-80 + 'px ' + '80px'}}>
                <label htmlFor={this.props.title} id={this.props.title} style={{width: this.props.width-80 + 'px'}} className={styles.title}>{this.props.title}</label>
                {this.props.static ? 
                    <div className={styles.title}>
                        {this.props.text}
                    </div>
                    :
                    <input type="text" maxLength={this.props.maxCount} id={this.props.title} value={this.props.text} onChange={(event)=>{
                        if(this.props.type === 'number'){this.validate(event)}
                        else {this.props.textInput(event.target.value)}
                    }} className={styles.horizontalInput}/>
                }
            </div>
        )
    }
}

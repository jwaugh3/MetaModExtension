import React, { Component } from 'react'
//Style
import styles from './TextAreaInput.module.scss'

export default class TextAreaInput extends Component {
    render() {
        return (
            <div className={styles.textAreaContainer} style={{width: this.props.width + 'px'}}>
                <label htmlFor={this.props.title} id="descriptionTitle">{this.props.title}</label>
                {/* <label htmlFor="description" id="optional">(optional)</label> */}
                <label htmlFor={this.props.title} style={{marginLeft: this.props.width*.2*.5-10 + 'px'}} id="descCharCount">{this.props.count}/200</label>
                <textarea maxLength={this.props.maxCount} style={{width: this.props.width + 'px'}} id={this.props.title} value={this.props.value} onChange={this.props.action}/>
            </div>
        )
    }
}

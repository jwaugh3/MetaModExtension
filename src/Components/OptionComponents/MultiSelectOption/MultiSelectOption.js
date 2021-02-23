import React, { Component } from 'react'
//Style
import styles from './MultiSelectOption.module.scss'

class MultiSelectOption extends Component {

    state = {
        selected: 'allchat'
    }

    render() {

        let options = this.props.options.map((option, index)=>{
            return (
            <div className={styles.option} key={index + option}
                onClick={()=>{
                    this.props.setStore(option)
                    this.setState({selected: option})
                }}
                style={this.props.selected === option ? {backgroundColor: this.props.selectedColor} : {backgroundColor: '#6D6C6D'}}
                >
                <p className={styles.optionText}>
                    {option}
                </p>
            </div>)
        })

        return (
            <div className={styles.multiSelectContainer}>
                <div className={styles.optionTitle}>
                    {this.props.title}
                </div>

                <div className={styles.optionsContainer}>
                   {options}
                </div>
            </div>
        )
    }
}

export default MultiSelectOption
import React, { Component } from 'react'
//Style
import styles from './MultiSelectOption.module.scss'

class MultiSelectOption extends Component {


    render() {

        let options = this.props.options.map((option, index)=>{
            return (
            <div className={styles.option} key={index + option}
                onClick={()=>{
                    let newSelected = [...this.props.selected]
                    if(newSelected.includes(option)){
                        let index = newSelected.findIndex((x)=>x === option)
                        newSelected.splice(index, 1)
                        // console.log(index)
                    } else {
                        newSelected.push(option)
                    }
                    // console.log(newSelected)
                    this.props.setStore(newSelected)
                }}
                style={this.props.selected.includes(option) ? {backgroundColor: this.props.selectedColor} : {backgroundColor: '#6D6C6D'}}
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
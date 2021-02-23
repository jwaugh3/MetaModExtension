import React, { Component } from 'react'
import { BlockPicker, ChromePicker} from 'react-color'
//Styles
import styles from './ColorSelect.module.scss'
//Components
import Auxiliary from '../../../hoc/Auxiliary'

export default class ColorSelect extends Component {
    render() {

        let badgeNum = this.props.badgeNum
        let customRewards = this.props.customRewards[this.props.badgeNum]
        let renderedPicker = []
        let offClick = []

        if(customRewards.displayPicker === true && customRewards.showCustomizer === true){
            renderedPicker = [
                <Auxiliary key={'dispPickerAndShowCustomizer'}>
                    <ChromePicker
                        className={styles.chromeColorPicker}
                        color={ customRewards.backgroundColor }
                        disableAlpha={true}
                        onChangeComplete={(color)=>this.props.handleColorChangeComplete(color, badgeNum)}
                    />
                    <div className={styles.customColor} onClick={()=>this.props.showCustomPicker(customRewards.showCustomizer, badgeNum)} style={{backgroundColor: customRewards.backgroundColor}}>More Colors...</div>
                </Auxiliary>
            ]
            offClick = [
                <div key={'dispPickerAndShowCustomizerOffClick'} className={styles.offClick} onClick={()=>this.props.toggleColorSelect(customRewards.displayPicker, badgeNum)}></div>
            ]
        } else if(customRewards.displayPicker === true){
            renderedPicker = [
                <Auxiliary key={'dispPickerOnly'}>
                    <BlockPicker
                        className={styles.colorPicker}
                        color={ customRewards.backgroundColor }
                        colors={customRewards.colorSelect}
                        onChangeComplete={ (color)=>this.props.handleColorChangeComplete(color, badgeNum) }
                    /> 
                    <div className={styles.customColor} onClick={()=>this.props.showCustomPicker(customRewards.showCustomizer, badgeNum)} style={{backgroundColor: customRewards.backgroundColor}}>More Colors...</div>
                </Auxiliary>
            ]
            offClick = [
                <div key={'offClickDispOnly'} className={styles.offClick} onClick={()=>this.props.toggleColorSelect(customRewards.displayPicker, badgeNum)}></div>
            ]
        } else {
            renderedPicker = null
            offClick = null
        }

        return (
            <Auxiliary>
                {offClick}
                <div className={styles.colorSelectContainer}>
                <label htmlFor={this.props.title} id="colorLabel">{this.props.title}</label>
                <div className={styles.colorContainer} onClick={this.props.action} style={{backgroundColor: this.props.color}}>
                    <div className={styles.editButton}>
                        <img src={this.props.icon} className={styles.editIcon} alt="edit Icon"/>
                    </div>
                </div>
        
                {renderedPicker}
            </div>
            </Auxiliary>
        )
    }
}

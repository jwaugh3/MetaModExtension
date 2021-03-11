import React, { Component } from 'react'
import { BlockPicker, ChromePicker} from 'react-color'
//Styles
import styles from './ColorPicker.module.scss'
//Components
import Auxiliary from '../../../hoc/Auxiliary'

export default class ColorPicker extends Component {
    render() {

        let badgeNum = this.props.badgeNum
        let customRewards = this.props.customRewards[this.props.badgeNum]
        let renderedPicker = []
        let offClick = []

        if(this.props.showPicker === true && customRewards.showCustomizer === true){
            renderedPicker = [
                <Auxiliary key={'dispPickerAndShowCustomizer'}>
                    <ChromePicker
                        className={styles.chromeColorPicker}
                        color={ customRewards.rankColors[this.props.colorIndex] }
                        disableAlpha={true}
                        onChangeComplete={(color)=>this.props.handleColorChangeComplete(color.hex, this.props.colorIndex)}
                    />
                    <div className={styles.customContainer}>
                        <div className={styles.customColor} onClick={()=>this.props.showCustomPicker(customRewards.showCustomizer, badgeNum)} style={{backgroundColor: customRewards.rankColors[this.props.colorIndex]}}>More Colors...</div>
                    </div>
                </Auxiliary>
            ]
            offClick = [
                <div key={'dispPickerAndShowCustomizerOffClick'} className={styles.offClick} onClick={()=>this.props.toggleColorSelect()}></div>
            ]
        } else if(this.props.showPicker === true){
            renderedPicker = [
                <Auxiliary key={'dispPickerOnly'}>
                    <BlockPicker
                        triangle='hide'
                        className={styles.colorPicker}
                        color={ customRewards.rankColors[this.props.colorIndex] }
                        colors={customRewards.colorSelect}
                        onChangeComplete={ (color)=>this.props.handleColorChangeComplete(color.hex, this.props.colorIndex) }
                    /> 
                    <div className={styles.customContainer}>
                        <div className={styles.customColor} onClick={()=>this.props.showCustomPicker(customRewards.showCustomizer, badgeNum)} style={{backgroundColor: customRewards.rankColors[this.props.colorIndex]}}>More Colors...</div>
                    </div>
                </Auxiliary>
            ]
            offClick = [
                <div key={'offClickDispOnly'} className={styles.offClick} onClick={()=>this.props.toggleColorSelect()}></div>
            ]
        } else {
            renderedPicker = null
            offClick = null
        }

        return (
            <Auxiliary>
                {offClick}
                <div className={styles.colorSelectContainer}>       
                    {renderedPicker}
                </div>
            </Auxiliary>
        )
    }
}

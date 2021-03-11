import React, { Component } from 'react'
//Components
import ColorPicker from '../../../../../../Components/OptionComponents/ColorPicker/ColorPicker'
//Style
import styles from './ListInput.module.scss'
//Assets
import editIcon from '../../../../../../resources/channelPointsManager/editEmoteIcon.png'

export default class ListInput extends Component {

    state = {
        colorToPick: '',
        colorIndex: '',
        showPicker: false
    }

    render() {

        let customRewards = this.props.customRewards[this.props.badgeNum]
        console.log(customRewards.rankNames)
        let inputFields = []

        customRewards.rankIDs.map((id, index)=>{
            inputFields.push(
                <div key={index} className={styles.inputContainer}>
                    <input type="text" 
                        maxLength={this.props.maxCount} 
                        id={index} 
                        value={customRewards.rankNames[index]} 
                        style={customRewards.rewardID === '' ? {color: 'white', paddingBottom: '0px'} : {color: '#90D48B', paddingBottom: '0px'}}
                        onChange={(event)=>{
                            if(customRewards.rewardID === ''){
                                this.props.setInputArrayValue(event.target.value, 'rankNames', index, this.props.badgeNum)
                            }                                 
                        }} 
                        className={styles.horizontalInput}
                    />
                    <div className={styles.editButton} onClick={(event)=>{
                        if(customRewards.rewardID === ''){
                            this.setState({showPicker: !this.state.showPicker, colorToPick: customRewards.rankColors[index], colorIndex: index})
                        }
                        }} style={{backgroundColor: customRewards.rankColors[index]}}>
                        <img src={editIcon} className={styles.editIcon} alt="edit Icon"/>
                    </div>

                   {customRewards.rankNames.length === 1 || customRewards.rewardID !== '' ? 
                        null :
                        <button className={styles.removeButton}
                        onClick={(event)=>{
                            event.preventDefault()
                            this.props.removeInputArrayValue('rankNames', index, this.props.badgeNum)
                            this.props.removeInputArrayValue('rankColors', index, this.props.badgeNum)
                            this.props.removeInputArrayValue('rankIDs', index, this.props.badgeNum)
                            this.forceUpdate()
                        }}
                    ><p className={styles.buttonContent}>-</p></button>
                    } 
        
                    {id === customRewards.rankIDs[customRewards.rankIDs.length-1] && id !== this.props.max && customRewards.rewardID === '' ? 
                        <button className={styles.addButton} 
                            onClick={(event)=>{
                                event.preventDefault()
                                let targetRankName = customRewards.rankIDs[customRewards.rankIDs.length - 1]
                                let targetRankID = parseInt(customRewards.rankIDs[customRewards.rankIDs.length - 1]) + 1
                                this.props.insertInputArrayValue('New Rank ' + targetRankName , 'rankNames', this.props.badgeNum)
                                this.props.insertInputArrayValue('#05A1E5', 'rankColors', this.props.badgeNum)
                                this.props.insertInputArrayValue((targetRankID).toString(), 'rankIDs', this.props.badgeNum)
                                this.forceUpdate()
                            }}
                        ><p className={styles.buttonContent}>+</p></button>
                        :
                        null
                    }
                </div>
            )
        })

        return (
            <div className={styles.listContainer}>
                <label htmlFor={this.props.title} id={this.props.title} style={{width: this.props.width-80 + 'px'}} className={styles.title}>{this.props.title}</label>
                {inputFields}

                {this.state.showPicker ?
                    <ColorPicker 
                        icon={editIcon}
                        color={this.state.colorToPick}
                        colorIndex={this.state.colorIndex}
                        badgeNum={this.props.badgeNum}
                        showPicker={this.state.showPicker}
                        customRewards={this.props.customRewards}
                        showCustomPicker={this.props.showCustomPicker}
                        handleColorChangeComplete={this.props.handleColorChangeComplete}
                        toggleColorSelect={()=>{this.setState({showPicker: !this.state.showPicker})}}
                        action={()=>this.setState({showPicker: !this.state.showPicker})}
                    />
                    : null
                }

            </div>
        )
    }
}

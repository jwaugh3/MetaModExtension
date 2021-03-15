import React, { Component } from 'react'
//Style
import styles from './Subtitle.module.scss'

class Subtitle extends Component {
    render() {
        return (
            <div className={styles.subtitleContainer}>
                {this.props.backButton ? 
                    <div className={styles.backButton} onClick={this.props.action}>
                        <svg className={styles.svgButton} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    </div>
                    : null}
                    <div className={styles.subtitle} style={this.props.backButton ? {width: '84%'} : { width: '100%'}}>
                        {this.props.title}{this.props.children}
                    </div>
                
                
            </div>
        )
    }
}

export default Subtitle;
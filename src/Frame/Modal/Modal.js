import React, { Component } from 'react'
import { X } from 'react-feather';
import Draggable from 'react-draggable';
// import { connect } from 'react-redux'
//Resources
import handleLogo from '../../resources/handleLogo.png'

export class Modal extends Component {

    componentDidMount(){
       
        let modal = document.getElementsByClassName("modal-close-button")
        
        modal[0].addEventListener("click", () => {    
            let embeddedFrame = document.getElementById('modal-window')
            embeddedFrame.style.display = 'none'
        })
    }

    render() {
        return (
            <Draggable
                handle=".modal-handle"
                defaultPosition={{x: 100, y: 100}}
                >
                    <div id="modal" className="modal-window">
                    <div className="modal-body">
                        <div className="modal-handle">
                            <div className="handle-logo-container">
                                <img src={handleLogo} className="handle-logo" alt="logo"/>
                                <h1 className="handle-title">MetaMod</h1>
                            </div>
                            <div className="modal-close-button">
                                <X color="white" size="18"/>
                            </div>
                        </div>
                        <div className="modal-content">
                            {this.props.children}
                        </div>
                    </div>
                    </div>
        </Draggable>
        )
    } 
}

// const mapStateToProps = (state) => ({
    
// })

// const mapDispatchToProps = {
    
// }

export default Modal
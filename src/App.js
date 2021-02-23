import React, {Component} from 'react';
import './App.css';
import Modal from './Frame/Modal/Modal';
import Main from './Frame/Main/Main';
import Login from './Frame/Login/Login';
//API
import { verifyToken } from './api/mainApi';
//External Functions

//State Management
import { connect } from 'react-redux'

class App extends Component {

  componentDidMount = async () => {
    //window message handler
    window.addEventListener("message", async (event) => {
      // if(event.data.substring(0,6) === "mmtkn="){
      //   //handles verification of chrome.storage.sync jwt token 
      //   let token = event.data.split('mmtkn=').pop()
      //   let verification = await verifyToken('http://localhost:5000', token)
        
      //   verification.error ? window.postMessage('clear-token', '*') : await this.props.setJWTToken(token)
      // }

      if(event.data.substring(0,7) === '?token='){
        let token = event.data.split('?token=').pop()
        this.props.setJWTToken(token)
      }
      
      // if(event.data.substring(0,15) === 'mm_fmb_settings'){
      //   let settings = JSON.parse(decodeURI(event.data.split('mm_fmb_settings=').pop()))
      //   this.props.setStorageState(settings)
      // }

      })
    //notify content.js to send stored jwt token
    window.postMessage('mm-mounted', '*')
  }

  render() {

    let renderedApp = this.props.jwtToken === '' ? <Login/> : <Main/>

    return (
      <div className="flexModal">
        <Modal>
          {/* {window.location.origin === "http://localhost:3000" ?  */}
            {/* <Main/> */}
            {/* : */}
            {renderedApp}
        {/* } */}
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      jwtToken: state.applicationReducer.jwtToken
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
      setJWTToken: (token) => dispatch({type: 'SET_JWT_TOKEN', payload: token}),
      setStorageState: (settings) => dispatch({type: 'SET_STORAGE_STATE', payload: settings})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
 
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

//reducers
import applicationReducer from './store/reducers/application';
import appsReducer from './store/reducers/apps';
import fleamarketbotReducer from './store/reducers/fleamarketbot';
import channelPointsManagerReducer from './store/reducers/channelPointsManager'


const rootReducer = combineReducers({
  applicationReducer,
  appsReducer,
  fleamarketbotReducer,
  channelPointsManagerReducer
})

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
  );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('modal-window')
);

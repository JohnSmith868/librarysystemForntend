import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,HashRouter, Switch } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Provider } from 'react-redux';
// redux-logger is a middleware that lets you log every state change
import logger from 'redux-logger';

// redux-thunk is a middleware that lets you dispatch async actions
import thunk from 'redux-thunk';
import { createStore } from 'redux';
import * as serviceWorker from './serviceWorker';
const initialState = {
  contentData: <React.Fragment>test</React.Fragment>,
  isLogin: false,
  userid: null,
  otherid: -1,
  usertype: "unknown"
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'setIsLogin':
      return {
        isLogin: action.isLogin
      };
    default:
      return state;
  }

}
const store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
    
      <App />
    
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

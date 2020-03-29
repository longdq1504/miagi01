/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { sessionService, sessionReducer } from 'redux-react-session';
import thunkMiddleware from 'redux-thunk';
import App from './components/app/App';

// Add the sessionReducer

const reducer = combineReducers({ //ham combineReducers khai bao state cua redux, ca cuc  {} la state cua index
  session: sessionReducer
});

const store = createStore(reducer, undefined, compose(applyMiddleware(thunkMiddleware)));

// Init the session service
sessionService.initSessionService(store);

render(
  <Provider store={store}> 
    <App /> 
  </Provider>, document.getElementById("root")
);
//Provier khai bao ra state sessionReducer line 13
// import <App />, connect(mapState)(App);
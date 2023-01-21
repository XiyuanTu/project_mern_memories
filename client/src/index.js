import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import thunk from 'redux-thunk';
import App from './App';
import reducers from './reducers'
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <GoogleOAuthProvider clientId='224543344603-cdoj8lapcv184t9gcjrk2n1cu0elht9l.apps.googleusercontent.com'>
    <BrowserRouter> 
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>,
  document.getElementById('root'),
);
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './boot/apolloclient';
import { createStore } from 'redux';
import stores from './store';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={createStore(stores)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

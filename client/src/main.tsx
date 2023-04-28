import React from 'react';
import ReactDOM from 'react-dom/client';

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { reducers } from './reducers';

import App from './App';

import './index.css';

// separate store
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
    </Provider>
);
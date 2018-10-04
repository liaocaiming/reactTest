import * as React from "react";
import * as ReactDOM from "react-dom";
import App from '../shared/components/AppRoot/index';
import './index.css'
import { reducers, routes } from './config/boss/index';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
let store = createStore(reducers);
ReactDOM.render(
    <Provider store={store}>
        <App config={{ routes }}/>
    </Provider>
   ,
    document.getElementById("example")
);
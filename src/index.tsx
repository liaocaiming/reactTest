import * as React from "react";
import * as ReactDOM from "react-dom";
import App from './routes';
import './index.css'
import reducers from './reducers/index';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
let store = createStore(reducers);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
   ,
    document.getElementById("example")
);
import * as React from "react";

import * as ReactDOM from "react-dom";

import { LocaleProvider } from 'antd';

import zhCN from 'antd/lib/locale-provider/zh_CN';

import App from "./shared/components/AppRoot/index";

import "./index.css";

import { reducers, routes } from "./config/boss/index";

import { Provider } from "react-redux";

import { createStore } from "redux";

let store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <App config={{ routes }} />
    </LocaleProvider>
  </Provider>,
  document.getElementById("app")
);

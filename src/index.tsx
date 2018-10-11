import * as React from "react";

import * as ReactDOM from "react-dom";

import { LocaleProvider } from "antd";

import zhCN from "antd/lib/locale-provider/zh_CN";

import App from "./shared/components/AppRoot/index";

import { ConnectedRouter, connectRouter, routerMiddleware } from "connected-react-router";

import { createBrowserHistory } from "history";

import "./index.css";

import { reducers, routes } from "./config/boss/index";

import { Provider } from "react-redux";

import { createStore, applyMiddleware, combineReducers } from "redux";

export const history = createBrowserHistory();

const middleware = routerMiddleware(history);

const remoteActionMiddleware = applyMiddleware(middleware)(createStore);

const mountNode: HTMLElement = document.getElementById("app") as HTMLElement;

// Store
const store = remoteActionMiddleware(
  connectRouter(history)(
    combineReducers({
      ...reducers
    })
  ),

  // 支持 chrome 插件 Redux DevTools
  // tslint:disable-next-line:no-string-literal
  window["devToolsExtension"] ? window["devToolsExtension"]() : (f: any) => f
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <LocaleProvider locale={zhCN}>
        <App config={{ routes }} />
      </LocaleProvider>
    </ConnectedRouter>
  </Provider>,
  mountNode
);


import './test/index';
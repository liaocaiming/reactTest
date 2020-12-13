import * as React from "react";

import * as ReactDOM from "react-dom";

import App from "@components/AppRoot";

import { HashRouter as Router } from "react-router-dom";

import { reducers, routes } from "./config/";

import { Provider } from "react-redux";

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import '@utils/lib/rem';

import { createStore, applyMiddleware, combineReducers } from "redux";

import reduxThunk from "redux-thunk";

import './index.less';

const remoteActionMiddleware = applyMiddleware(reduxThunk)(createStore);

const mountNode: HTMLElement = document.getElementById("app") as HTMLElement;

// Store
const store = remoteActionMiddleware(
  combineReducers({
    ...reducers,
  }),

  // 支持 chrome 插件 Redux DevTools
  // tslint:disable-next-line:no-string-literal
  window["devToolsExtension"] ? window["devToolsExtension"]() : (f: any) => f
);

// const useStyles = makeStyles((theme) => ({
//   root: {
//     color: theme.status.danger,
//     '&$checked': {
//       color: theme.status.danger,
//     },
//   },
//   checked: {},
// }));

const theme = createMuiTheme({
  bg: '#111622'
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App config={{ routes }} />
      </Router>
    </ThemeProvider>

  </Provider>,
  mountNode
);

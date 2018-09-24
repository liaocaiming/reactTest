import * as React from 'react';
import { HashRouter, Switch, Route, Router } from 'react-router-dom'
import {createHashHistory} from 'history';
export const history = createHashHistory()
import routes from '../config/boss/routes'
export default class App extends React.PureComponent<any, any> {
  render () {
    return (
      <Router history={history}>
         <div>
            {
              routes.map((item:any, index:any) => {
                return <Route {...item} key={index}/>
              })
            }
         </div>
      </Router>
    )
  }
}
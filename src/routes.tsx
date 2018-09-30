import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';
// export const history = createBrowserHistory()
import routes from '../config/boss/routes'
export default class App extends React.PureComponent<any, any> {
  render () {
    return (
      <Router>
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
import * as React from 'react';
import { HashRouter as Router, Switch, Route} from 'react-router-dom';

interface Iprops{
  config: any;
}

interface Iroute {
  path: string;
  component: any;
  exact?: boolean;
  routes?:Iroute;
}


export default class AppRoot extends React.Component<Iprops> {
    render () {
      const { config } = this.props;
      return (
        <Router>
          <Switch>
            {
              config.routes.map((route:Iroute, index:number) => {
                 const RouteComponent = route.component;
                return (
                  <Route
                    exact={route.exact}
                    path={route.path}
                    key={index}
                    render = {(routeProps:any) => {
                      return  <RouteComponent {...routeProps} menu={config.menu} routes={route.routes}/>
                    }}
                  />
                )
              })
            }
          </Switch>
        </Router>
      )
    }
}
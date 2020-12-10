import * as React from "react";

import { connect } from "@containers/app";

import { renderRoutes } from "react-router-config";

import IProps from '@typings/react.d'

@connect()
export default class App extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);
  }
  public render() {
    return <div className="layout">{renderRoutes(this.props.routes)}</div>;
  }
}

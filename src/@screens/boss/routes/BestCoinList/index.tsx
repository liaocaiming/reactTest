import * as React from "react";

import { connect } from "@shared/containers/appScreen";

import './index.less';

import IProps from '@typings/react.d';

import { api } from '@src/config/boss/';

@connect()
export default class App extends React.PureComponent<IProps> {

  public componentDidMount () {
    this.getList();
  }

  private getList () {
    const { actions } = this.props;
    actions.get(`${api.get_indicators}?indicators[]=ema_25&indicators[]=ema_7&interval=1w`)
  }

  public render () {
    return <span>1111</span>
  }
}
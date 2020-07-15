import * as React from "react";

import { connect } from "@src/@screens/boss/reducers/index";

import dateFormat from "@utils/lib/dateFormat";

import { Select, Card } from 'antd';

import { api } from '@src/config/boss'

import IProps from '@typings/react';

import { GroupSearch } from '@components/index'

interface IState {
  forceOrders: any;
  openInterest: any;
  [key:string]: any;
}

interface IPort {
  url: string;
  key: 'forceOrders' | 'openInterest';
  params: any;
}

@connect()
export default class App extends React.PureComponent<IProps, IState> {
  private symbol = {
    title: '交易币',
    dataIndex: 'symbol',
    fieldNames: { value: 'symbol', label: 'symbol' }

  }
  constructor(props: IProps) {
    super(props);
    this.state = {
      forceOrders: {},
      openInterest: {}
    };
  }
  public componentDidMount() {
    const { actions } = this.props;
    actions.getSymbol();
  }

  private getData = (data: IPort[]) => {
    const { actions } =this.props;
    data.forEach((item) => {
      actions.get(item.url, item.params).then((res: any) => {
        if (res) {
          this.setState({
            [item.key]: res
          })
        }
      })
    })
  }

  private handleSearch1 = (params: any) => {
    const list: IPort[] = [
      {
        url: api.force_orders,
        key: 'forceOrders',
        params
      },
      {
        url: api.open_interest,
        key: 'openInterest',
        params
      }
    ]

    this.getData(list);
  }

  private renderForceOrdersAndOpens() {
    const symbolList = this.props.$$boss.getIn(['symBolList']).toJS() || [];
    console.log(symbolList,'symbolList')
    return (
      <div>
        <GroupSearch
          rowData={[this.symbol]}
          handleSearch={this.handleSearch1}
          selectMap={{
            symbol: symbolList
          }}
        />
      </div>
    )
  }

  public render() {

    return (
      <div>
        <Card title='市场强平订单和未平合约数'>
          {this.renderForceOrdersAndOpens()}
        </Card>
      </div>
    );
  }
}

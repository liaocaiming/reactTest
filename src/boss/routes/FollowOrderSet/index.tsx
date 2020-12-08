import React from "react";

import { Button } from "antd";

import OrderSet from './orderMange';

import OrderList from './OrderList';

import './index.less'

export default class App extends React.PureComponent {

  public renderTabBarExtraContent = () => {
    return (
      <div className='btn-content boundary'>
        <Button className='margin_left_10' style={{ marginRight: 20 }}>开启跟单</Button>
        <Button danger>取消跟单</Button>
      </div>
    )
  }

  public render() {
    return (
      <div className='follow-order-set'>
        {this.renderTabBarExtraContent()}
        <div className='order-set boundary'>
          <OrderSet />
        </div>
        <div>
          <OrderList />
        </div>
      </div>
    );
  }
}

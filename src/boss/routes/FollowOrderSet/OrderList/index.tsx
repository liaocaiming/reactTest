import React from 'react';

import { Tabs, List, Button } from 'antd';

const { TabPane } = Tabs;

const { Item } = List;

import { currentList } from './constants';

export default class App extends React.PureComponent {

  private renderCurrent() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={currentList}
        renderItem={(item) => {
          return (
            <div>
              <div>
                <span>{item.directionName}</span>
                <span>{item.coin}</span>
              </div>

              <div>
                <span>{item.isAllName}</span>
                <span>{item.multiple}X</span>
              </div>

              <div>
                <span><span>持仓数（{item.coin}）:</span> <span>{item.number}</span></span>
                <span><span>未实现盈亏:</span> <span>{item.profitAndLossPrice}({item.profitAndLossperc})</span></span>
                <span><span>保证金:</span> <span>{item.bond}</span></span>
              </div>

              <div>
                <span><span>开仓价格:</span> <span>{item.openPrice}</span></span>
                <span><span>标记价格:</span> <span>{item.signPrice}</span></span>
                <span><span>强平价格:</span> <span>{item.forcePrice}</span></span>
              </div>

              <div>
                <Button>取消跟单</Button>  
              </div>

            </div>
          )
        }}
      />
    )
  }

  private renderWill() {

  }

  public render() {
    return (
      <div>
        <Tabs>
          <TabPane key='current' tab='当前持仓'>
            {this.renderCurrent()}
          </TabPane>

          <TabPane key='will' tab='当前委托'>
            已挂的单
          </TabPane>

          <TabPane key='finished' tab='已完成'>
            已完成的单
          </TabPane>

        </Tabs>

      </div>
    )
  }
}
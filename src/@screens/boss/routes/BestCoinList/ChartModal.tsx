import * as React from 'react';


import { Modal } from 'antd';

import loadScript from '@utils/lib/loadScript';

interface IProps  {
  isShow: boolean;
  interval: string;
  symbol: string;
  onClose: () => void;
}

export default class App extends React.PureComponent<IProps> {

  public componentDidMount () {
    const {  interval, symbol } = this.props;
    loadScript('https://s3.tradingview.com/tv.js').then(() => {
      new TradingView.widget({
        width: 1200,
        height: 710,
        symbol: `BINANCE:${symbol.toUpperCase()}`,
        interval: 'D',
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: "zh_CN",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: "tradingView",
        hide_side_toolbar: false,
        studies: [
          "MACD@tv-basicstudies",
          "StochasticRSI@tv-basicstudies"
        ],
      });
    })
  }

  public render () {
    return (
      <Modal
        title='TradingView图标'
        width={1500}
        visible={true}
        footer={null}
        onCancel={this.props.onClose}
      >
        <div id="tradingView" className='tradingView'>
        </div>
      </Modal>
    )
  }
}
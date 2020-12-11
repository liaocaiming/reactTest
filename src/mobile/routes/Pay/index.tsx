import { Button } from "antd";
import React from "react";
import { copy } from '@utils/index'
import IProps from '@typings/react.d'
import "./index.less";

export default class App extends React.PureComponent<IProps> {
  private copy = () => {
    copy('account');
  };

  private goTo = (url: string) => {
    const { history } = this.props;
    return () => {
      history.push(url)
    }
  }

  public render() {
    return (
      <div>
        <div>
          <img src="" alt="usdt收款码" />
        </div>
        <div>
          <input type="text" style={{ display: "none" }} id="input" />
          <span>
            收款地址: <span id="account">4343434</span>
          </span>
          <Button onClick={this.copy}>复制</Button>
        </div>

        <div><Button>下一步</Button> <Button onClick={this.goTo('/mobile/home')}>跳过</Button></div>
      </div>
    );
  }
}

import React from "react";
import { InputItem, Button } from "antd-mobile";
import IProps from "@typings/react.d";
// import { createForm } from "rc-form";
import { connect } from "@containers/appScreen";

@connect()
export default class App extends React.PureComponent<IProps> {
  private goNext = () => {
    const { history } = this.props;
    history.push("/mobile/pay");
  };

  public render() {
    return (
      <div>
        <InputItem
          placeholder="start from left"
          clear
          moneyKeyboardAlign="left"
        >
          uid
        </InputItem>

        <InputItem
          placeholder="start from left"
          clear
          moneyKeyboardAlign="left"
        >
          账户名
        </InputItem>

        <InputItem
          placeholder="start from left"
          clear
          moneyKeyboardAlign="left"
        >
          密码
        </InputItem>
        <Button onClick={this.goNext}>下一步</Button>
      </div>
    );
  }
}

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
        home
      </div>
    );
  }
}

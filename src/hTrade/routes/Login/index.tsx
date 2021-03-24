import * as React from "react";

import { Form, Input, Button, Checkbox, message } from "antd";

import { AppForm } from "@components/index";

import { AppFormItemOptions } from "@components/AppForm/interface";

import User from "@utils/lib/User";

import "./index.less";

import IProps from "@typings/react.d";

import { connect } from "@containers/app";

const obj = {
  username: "admin",
  password: "111",
};

@connect()
export default class App extends React.PureComponent<IProps> {
  onFinish = (values) => {
    if (values.username !== obj.username || values.password !== obj.password) {
      message.error("请输入正确的密码或用户名");
      return;
    }
    User.saveUserInfo(values);
    const { history } = this.props;
    history.push("/hTrade/moreUser");
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  renderForm = () => {
    const width = 200;
    const formItems: AppFormItemOptions[] = [
      {
        label: "用户名",
        name: "username",
        rules: [
          {
            required: true,
            message: "请输入用户名",
            whitespace: true,
          },
        ],
        eleAttr: {
          placeholder: "请输入用户名",
          style: {
            width,
          },
        },
      },
      {
        label: "密码",
        name: "password",
        type: "password",

        rules: [
          {
            required: true,
            message: "请输入密码",
            whitespace: true,
          },
        ],
        eleAttr: {
          placeholder: "请输入密码",
          style: {
            width,
          },
        },
      },
    ];

    return (
      <AppForm
        formItems={formItems}
        labelCol={{ span: 8 }}
        submitButton={{ text: "登录", type: "primary" }}
        onFinish={this.onFinish}
        footerStyle={{
          marginTop: 20,
          textIndent: 134,
        }}
      />
    );
  };

  render() {
    return (
      <div className="Htrade-form">
        <h4 className="title">H-Tade</h4>
        {this.renderForm()}
      </div>
    );
  }
}

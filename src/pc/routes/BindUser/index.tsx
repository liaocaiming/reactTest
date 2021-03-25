import { Card, message } from "antd";

import React from "react";

import { AppForm } from "@components/index";

import { AppFormItemOptions } from "@components/AppForm/interface";

import { constants } from "@utils/index";

import { connect } from "@containers/app";

import IProps from "@typings/react.d";

import { api } from "@src/pc/config";

const width = 300;

@connect()
export default class App extends React.PureComponent<IProps> {
  public renderForm = () => {
    const formData: AppFormItemOptions[] = [
      {
        name: "type",
        label: "校验类型",
        type: "select",
        list: [
          {
            value: "-1",
            label: "全部",
          },
          {
            value: "1",
            label: "现货",
          },

          {
            value: "3",
            label: "合约",
          },
        ],
        rules: [
          {
            required: true,
            message: "请输入",
          },
        ],
        eleAttr: {
          placeholder: "请输入账户",
          style: {
            width,
          },
        },
      },
      {
        name: "账户",
        label: "userName",

        rules: [
          {
            required: true,
            message: "请输入",
          },
          {
            pattern: constants.pattern.alphabetOrNumber,
            message: "请输入数字和字母",
          },
        ],
        eleAttr: {
          placeholder: "请输入账户",
          style: {
            width,
          },
        },
      },
      {
        name: "API",
        label: "API Key",
        rules: [
          {
            required: true,
            message: "请输入",
          },
        ],
        eleAttr: {
          placeholder: "请输入API Key",
          style: {
            width,
          },
        },
      },
      {
        name: "Secret",
        label: "Secret Key",
        rules: [
          {
            required: true,
            message: "请输入",
          },
        ],
        eleAttr: {
          placeholder: "请输入API Key",
          style: {
            width,
          },
        },
      },
    ];

    return (
      <AppForm
        formItems={formData}
        labelCol={{ span: 3 }}
        submitButton={{ text: "保存", type: "primary" }}
        onFinish={this.onFinish}
      />
    );
  };

  public onFinish = (params: any) => {
    const { actions } = this.props;
    actions.post(api.bindUser, params).then((res) => {
      message.success("绑定成功");
    });
  };

  public render() {
    return (
      <Card title="账户api绑定" bordered={false}>
        <div style={{ width: 800 }}>{this.renderForm()}</div>
      </Card>
    );
  }
}

import { Card } from "antd";

import React from "react";

import { AppForm } from "@components/index";

import { AppFormItemOptions } from "@components/AppForm/interface";

import { UploadImage } from "@components/index";

import IProps from '@typings/react.d';

const width = 300;

export default class App extends React.PureComponent<IProps> {
  private renderForm = () => {
    const editable = this.props.match.params.id !== 'show';

    const formData: AppFormItemOptions[] = [

      {
        label: "预警内容",
        name: "content",
        type: 'textArea',
        editable,
        rules: [
          {
            required: true,
            message: "请输入",
          },
        ],
        eleAttr: {
          placeholder: "请输入",
          style: {
            width,
          },
        },
      },



      {
        label: "预警图片",
        name: "invite_url",
        editable,
        // rules: [
        //   {
        //     required: true,
        //     message: "请上传",
        //   },
        // ],
        render: () => {
          return <UploadImage />;
        },
      },

      {
        label: "推送时间",
        name: "post_time",
        type: 'rangePicker',
        editable,
        rules: [
          {
            required: true,
            message: "请输入",
          },
        ],
        eleAttr: {
          showTime: true,
        },
      },

    ];

    return (
      <AppForm
        formItems={formData}
        labelCol={{ span: 6 }}
        submitButton={{ text: "保存", type: "primary" }}
        onFinish={this.onFinish}
        editable={editable}
      />
    );
  };

  public onFinish = (params: any) => {
    console.log(params);
  };

  public render() {
    console.log(22222);

    return (
      <Card title="预警设置" bordered={false}>
        <div style={{ width: 800 }}>{this.renderForm()}</div>
      </Card>
    );
  }
}

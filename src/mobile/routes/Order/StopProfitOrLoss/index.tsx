import React from "react";

import { AppForm } from "@src/mobile/components/index";

import { FormItemOptions } from "@src/mobile/components/Form/interface";

const isShow = (data: any) => {
  return;
};

const formData: FormItemOptions[] = [
  {
    label: "目标1",
    name: "task_profit_present@1",
    type: "input",
    eleAttr: {
      children: <span className="unit">%</span>,
    },
    rules: [
      // {
      //   required: true,
      //   message: "请输入目标一",
      // },
    ],
  },

  {
    label: "目标2",
    name: "task_profit_present@2",
    type: "input",
    eleAttr: {
      children: <span className="unit">%</span>,
    },
    rules: [
      // {
      //   required: true,
      //   message: "请输入目标一",
      // },
    ],
  },

  {
    label: "目标3",
    name: "task_profit_present@3",
    type: "input",
    eleAttr: {
      children: <span className="unit">%</span>,
    },
    rules: [
      // {
      //   required: true,
      //   message: "请输入目标一",
      // },
    ],
  },

  {
    label: "目标4",
    name: "task_profit_present@4",
    type: "input",
    eleAttr: {
      children: <span className="unit">%</span>,
    },
    rules: [
      // {
      //   required: true,
      //   message: "请输入目标一",
      // },
    ],
  },

  {
    label: "移动止盈",
    name: "margin_type",
    type: "switch",
  },

  {
    label: "跟随系统止损",
    name: "loss_flow_system",
    type: "switch",
  },
];

interface IProps {
  detail?: any;
  onFinish?: (params: any) => void;
}

export default (props: IProps) => {
  const { detail = {}, onFinish } = props;

  const onMulSelectFinish = (params) => {
    onFinish && onFinish(params);
    console.log(params);
  };

  return (
    <AppForm
      formItems={formData}
      onFinish={onMulSelectFinish}
      initialValues={{ detail }}
      submitOptions={{
        text: "完成",
      }}
    />
  );
};

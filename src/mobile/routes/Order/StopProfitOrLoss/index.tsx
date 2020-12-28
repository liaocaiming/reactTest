import React from "react";

import { AppForm } from "@src/mobile/components/index";

import { FormItemOptions } from "@src/mobile/components/Form/interface";

const formData: FormItemOptions[] = [
  {
    label: "目标1",
    name: "take_profit_present@0",
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
    name: "take_profit_present@1",
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
    name: "take_profit_present@2",
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
    name: "take_profit_present@3",
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
    name: "move_take_profit",
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
      initialValues={{ ...detail }}
      submitOptions={{
        text: "完成",
      }}
    />
  );
};

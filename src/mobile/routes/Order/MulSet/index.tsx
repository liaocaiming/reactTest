import React from "react";

import { marginType } from "../constants";

import { creatArrayByLen } from "@utils/index";

import { AppForm } from "@src/mobile/components/index";

import { FormItemOptions } from "@src/mobile/components/Form/interface";

const leverageArr = creatArrayByLen(50).map((value) => {
  return { value, label: `${value}X` };
});

const formData: FormItemOptions[] = [
  {
    label: "开仓模式",
    name: "margin_type",
    type: "select",
    data: marginType,
    rules: [
      {
        required: true,
        message: "请选择开仓模式",
      },
    ],
  },
  {
    label: "开仓倍数",
    name: "leverage",
    type: "select",
    data: leverageArr,
    rules: [
      {
        required: true,
        message: "请选择开仓倍数",
      },
    ],
  },

  {
    label: "每单保证金",
    name: "open_margin",
    type: "input",
    eleAttr: {
      children: <span className="unit">$</span>,
    },
    rules: [
      {
        required: true,
        message: "请输入全仓每单保证金",
      },
    ],
  },

  {
    label: "逐仓每单开仓保证金",
    name: "isolated_max_margin",
    type: "input",
    isShow: (data) => {
      return data.margin_type == "2";
    },
    eleAttr: {
      children: <span className="unit">$</span>,
    },
    rules: [
      {
        required: true,
        message: "请输入全仓每单保证金",
      },
    ],
  },
  {
    label: "是否限制开单数量",
    name: "is_limit_num",
    type: "switch",
  },
  {
    label: "限制开单数量",
    isShow: (data: any) => {
      return data.is_limit_num;
    },
    name: "max_follow_sum",
    type: "input",
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
      initialValues={{ is_limit_num: true, ...detail }}
      submitOptions={{
        text: "下一步",
      }}
    />
  );
};

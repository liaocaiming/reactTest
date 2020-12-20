import React from "react";

import { marginType, openType } from "../constants";

import { creatArrayByLen } from "@utils/index";

import { AppForm } from "@src/mobile/components/index";

import { FormItemOptions } from "@src/mobile/components/Form/interface";

const leverageArr = creatArrayByLen(50).map((value) => {
  return { value, label: `${value}X` };
});

const formData: FormItemOptions[] = [
  {
    label: "开单方式",
    name: "entry_type",
    type: "select",
    data: openType,
    rules: [
      {
        required: true,
        message: "请选择开单方式",
      },
    ],
  },

  {
    label: "第一批",
    name: "entry_present@0",
    type: "input",
    eleAttr: {
      children: <span className="unit">$</span>,
    },
  },

  {
    label: "第二批",
    name: "entry_present@1",
    type: "input",
    eleAttr: {
      children: <span className="unit">$</span>,
    },
  },

  {
    label: "第三批",
    name: "entry_present@2",
    type: "input",
    eleAttr: {
      children: <span className="unit">$</span>,
    },
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
      initialValues={{ ...detail, entry_type: "1" }}
      submitOptions={{
        text: "下一步",
      }}
    />
  );
};

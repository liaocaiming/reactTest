import React from "react";

import MulSet from "./MulSet";

import OpenSet from "./OpenSet";

import StopLoss from "./StopLoss";

import StopProfit from "./StopProfit";

import Steps from "./Steps";

import { Select, AppForm, Input } from "@src/mobile/components/index";

import { FormItemOptions } from '@src/mobile/components/Form/interface';

import "./index.less";

import { marginType } from './constants';

export default () => {
  const renderSteps = () => {
    return (
      <div>
        <Steps current={1} />
      </div>
    );
  };

  const onFinish = (params) => {
    console.log(params);
  }

  const formData: FormItemOptions[] = [
    {
      label: '开仓模式',
      name: 'margin_type',
      type: 'select',
      data: marginType,
      rules: [
        {
          required: true,
          message: '请选择开仓模式'
        }
      ]
    },
    {
      label: '开仓倍数',
      name: 'leverage',
      type: 'select',
      data: marginType,
      rules: [
        {
          required: true,
          message: '请选择开仓倍数'
        }
      ]
    }
  ]

  return (
    <div className="mb-order">
      {renderSteps()}
      <div className="form-container">
        <AppForm
          formItems={formData}
          onFinish={onFinish}
          initialValues={{ margin_type: '1' }}
        />
      </div>
    </div>
  );
};

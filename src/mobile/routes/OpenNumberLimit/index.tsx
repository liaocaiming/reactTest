import React from "react";

import { AppForm } from "@src/mobile/components/index";

import { FormItemOptions } from "@src/mobile/components/Form/interface";

import { constants, fetch } from "@utils/index";

import { Toast } from 'antd-mobile';

import { pageUrlsMap } from "@src/mobile/config/routes";

import './index.less'

import IProps from '@typings/react.d'
import { api } from "@src/mobile/config";

export default (props: IProps) => {
  const { detail = {} } = props;

  const formData: FormItemOptions[] = [
    {
      label: "交易类型",
      name: "set_type",
      type: 'select',
      // initialValue: '3',
      rules: [
        {
          required: true,
          message: '请选择交易类型'
        }
      ],
      data: constants.ORDER_TYPE
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
      rules: [
        {
          pattern: constants.pattern.positiveNum,
          message: "限制开单数量请输入正整数",
        },
      ],
      eleAttr: {
        type: "number",
      },
    },
  ];

  const onMulSelectFinish = (params) => {

    fetch.post(api.orderOpenSettingsUpdate, params).then((res) => {
      if (res.message) {
        Toast.success(res.message, 1, () => {
          const { history } = props;
          history.push(pageUrlsMap.home);
        });
      }
    });
  };

  return (
    <div className='openNumberLimit'>
      <AppForm
        formItems={formData}
        onFinish={onMulSelectFinish}
        initialValues={{
          is_limit_num: detail.max_follow_sum == -1,
          max_follow_sum:
            detail.max_follow_sum == -1 ? "" : detail.max_follow_sum,
          ...detail,
        }}
        submitOptions={{
          text: "确定",
        }}
      />
    </div>
  );
};

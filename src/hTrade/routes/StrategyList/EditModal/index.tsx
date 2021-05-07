import React, { memo, useState } from "react";

import { message, Modal } from "antd";

import { ModalProps } from "antd/lib/modal";

import { AppForm } from "@components/index";

import { FormInstance } from "antd/lib/form";

import { AppFormItemOptions } from "@components/AppForm/interface.d";

import { IActions } from "@shared/containers";
import { api } from "@src/hTrade/config";
import { isOrNot } from "@utils/lib/constants";

import { constants } from "@utils/index";

const feiboArr = [1, 2, 3, 4];

const distFormItems = (dist: number[]): AppFormItemOptions[] => {
  return dist.map((item, index) => {
    return {
      name: ["feibo", index],
      label: `第${item}菲波指数`,
      rules: [
        {
          pattern: constants.pattern.positiveNumFloat,
          message: "请输入数据",
        },
      ],
      eleAttr: {
        placeholder: "请输入",
        style: {
          width,
        },
      },
    };
  });
};

interface IProps extends ModalProps {
  actions: IActions;
  detail: any;
  onSuccess: () => void;
}
const width = 250;

export default memo((props: IProps) => {
  const [form, setForm] = useState<FormInstance>();
  const { actions, detail, onSuccess } = props;

  const formItems: AppFormItemOptions[] = [
    {
      label: "涨跌幅",
      name: "change_rate",
      rules: [
        {
          pattern: constants.pattern.positiveNumFloat,
          message: "请输入数据",
        },
      ],
      afterDOM: <span className="margin_left_5">%</span>,
      eleAttr: {
        style: {
          width,
        },
      },
    },

    {
      label: "最小交易量",
      name: "min_volume",
      rules: [
        {
          pattern: constants.pattern.positiveNumFloat,
          message: "请输入数据",
        },
      ],
      afterDOM: <span className="margin_left_5">USDT</span>,
      eleAttr: {
        style: {
          width,
        },
      },
    },

    ...distFormItems(feiboArr),

    {
      label: "是否推送",
      name: "start",
      type: "radio",
      list: isOrNot,
      rules: [
        {
          required: true,
          message: "请选择",
        },
      ],
    },
    {
      label: "是否推送至机器人",
      name: "push_bot",
      type: "radio",
      list: isOrNot,
      rules: [
        {
          required: true,
          message: "请选择",
        },
      ],
    },

    {
      label: "是否推送至soso",
      name: "push_soso",
      type: "radio",
      list: isOrNot,
      rules: [
        {
          required: true,
          message: "请选择",
        },
      ],
    },

    {
      label: "是否推送到app",
      name: "push_app",
      type: "radio",
      list: isOrNot,
      rules: [
        {
          required: true,
          message: "请选择",
        },
      ],
    },

    {
      label: "是否程序全程控制",
      name: "bot_control",
      type: "radio",
      list: isOrNot,
      rules: [
        {
          required: true,
          message: "请选择",
        },
      ],
    },

  ];

  const onFinish = (params: any) => {
    const { feibo } = params;

    actions
      .post(api.trade_signals_update, {
        ...params,
        id: detail.id,
        feibo: Array.isArray(feibo) && feibo.join(","),
      })
      .then((res) => {
        message.success(res.message || "修改成功", 1, () => {
          onSuccess();
        });
      });
  };

  const onOk = () => {
    form?.submit();
  };

  const { feibo = "" } = detail;

  return (
    <Modal visible title="编辑策略" {...props} onOk={onOk}>
      <AppForm
        labelCol={{ span: 8 }}
        formItems={formItems}
        onFinish={onFinish}
        submitButton={null}
        initialValues={{ ...detail, feibo: feibo.split(",") }}
        updateStore={{ ...detail, feibo: feibo.split(",") }}
        onReady={(form) => {
          setForm(form);
        }}
      />
    </Modal>
  );
});

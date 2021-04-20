import React, { memo, useState } from "react";

import { message, Modal } from "antd";

import { ModalProps } from "antd/lib/modal";

import { AppForm } from "@components/index";

import { FormInstance } from "antd/lib/form";

import { AppFormItemOptions } from "@components/AppForm/interface.d";

import { IActions } from "@shared/containers";
import { api } from "@src/hTrade/config";
import { isOrNot } from "@utils/lib/constants";

interface IProps extends ModalProps {
  actions: IActions;
  detail: any;
  onSuccess: () => void;
}

export default memo((props: IProps) => {
  const [form, setForm] = useState<FormInstance>();
  const { actions, detail, onSuccess } = props;
  const formItems: AppFormItemOptions[] = [
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
  ];

  const onFinish = (params: any) => {
    actions
      .post(api.trade_signals_update, {
        ...params,
        id: detail.id,
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

  return (
    <Modal visible title="编辑策略" {...props} onOk={onOk}>
      <AppForm
        labelCol={{ span: 8 }}
        formItems={formItems}
        onFinish={onFinish}
        submitButton={null}
        initialValues={detail}
        updateStore={detail}
        onReady={(form) => {
          setForm(form);
        }}
      />
    </Modal>
  );
});

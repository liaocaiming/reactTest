import React, { memo, useState } from 'react';
import { Modal } from 'antd'

import { ModalProps } from 'antd/lib/modal'

import { AppForm } from '@components/index';

import { AppFormItemOptions } from '@components/AppForm/interface'

import { IActions } from '@containers/index.d'

import api from '@src/hTrade/config/api';

import { FormInstance } from 'antd/lib/form';

import { getFormItems } from '../utils';

interface IProps extends ModalProps {
  detail?: any;
  actions: IActions;
}

export default memo((props: IProps) => {
  const { detail, visible, actions, onCancel } = props;
  const [form, setForm] = useState<FormInstance>();

  const formData: AppFormItemOptions[] = getFormItems();

  const onFinish = (params: any) => {
    actions.post(api.addAndUpdateUser, params).then(() => {
      onCancel && onCancel(params);
    })
  }

  const onOK = () => {
    form?.submit()
  }

  return (
    <Modal visible={visible} onCancel={onCancel} width={600} title='新增用户' onOk={onOK}>
      <AppForm
        formItems={formData}
        labelCol={{ span: 6 }}
        submitButton={null}
        onFinish={onFinish}
        initialValues={detail}
        onReady={(form) => {
          setForm(form)
        }} />
    </Modal>
  )
})
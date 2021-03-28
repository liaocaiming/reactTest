import React, { memo, useState } from 'react';
import { Modal } from 'antd'
import moment from 'moment';
import { ModalProps } from 'antd/lib/modal'

import { AppForm } from '@components/index';

import { AppFormItemOptions } from '@components/AppForm/interface'

import { IActions } from '@containers/index.d'

import api from '@src/hTrade/config/api';

import { FormInstance } from 'antd/lib/form';

import { getFormItems } from '../utils';

interface IProps extends ModalProps {
  detail?: any;
  operateType?: 'edit' | 'add'
  actions: IActions;
  onSuccess: () => void;
}

export default memo((props: IProps) => {
  const { detail, visible, actions, onCancel, operateType, onSuccess } = props;
  const [form, setForm] = useState<FormInstance>();

  const formData: AppFormItemOptions[] = getFormItems({ operateType });

  const onFinish = (params: any) => {
    actions.post(api.addAndUpdateUser, params).then(() => {
      onSuccess();
    })
  }

  const onOK = () => {
    form?.submit()
  }

  const values = { ...detail };
  if (values.addTime) {
    values.addTime = moment(values.addTime)
  }

  if (values.due_day) {
    values.due_day = moment(values.due_day)
  }

  return (
    <Modal visible={visible} onCancel={onCancel} width={600} title='新增用户' onOk={onOK} destroyOnClose>
      <AppForm
        formItems={formData}
        labelCol={{ span: 6 }}
        submitButton={null}
        onFinish={onFinish}
        updateStore={values}
        onReady={(form) => {
          setForm(form)
        }} />
    </Modal>
  )
})
import React, { memo, useState } from 'react';
import { Modal } from 'antd'

import { ModalProps } from 'antd/lib/modal'

import { AppForm } from '@components/index';

import { AppFormItemOptions } from '@components/AppForm/interface'

import { IActions } from '@containers/index.d'

import api from '@src/hTrade/config/api';

import { FormInstance } from 'antd/lib/form';

interface IProps extends ModalProps {
  detail?: any;
  actions: IActions;
}

export default memo((props: IProps) => {
  const { detail, visible, actions, onCancel } = props;
  const [form, setForm] = useState<FormInstance>();

  const width = 300;
  const formData: AppFormItemOptions[] = [
    {
      name: 'userName',
      label: '用户名称',
      rules: [
        {
          required: true,
          message: '请输入',
          whitespace: true
        }
      ],
      eleAttr: {
        placeholder: '请输入',
        style: {
          width
        }
      }
    },


    {
      name: 'biance_user_id',
      label: '币安id',
      eleAttr: {
        placeholder: '请输入',
        style: {
          width
        }
      }
    },

    {
      name: 'API',
      label: 'API Key',
      rules: [
        {
          required: true,
          message: '请输入',
          whitespace: true
        }
      ],
      eleAttr: {
        placeholder: '请输入API Key',
        style: {
          width
        }
      }
    },
    {
      name: 'Secret',
      label: 'Secret Key',
      rules: [
        {
          required: true,
          message: '请输入',
          whitespace: true
        }
      ],
      eleAttr: {
        placeholder: '请输入API Key',
        style: {
          width
        }
      }
    },

    {
      name: 'remart',
      label: '备注',
      type: 'textArea',
      eleAttr: {
        placeholder: '请输入',
        style: {
          width
        }
      }
    }
  ]


  const onFinish = (params: any) => {
    actions.post(api.addAndUpdateUser, params).then(() => {
      onCancel && onCancel(params);
    })
  }

  const onOK = () => {
    form?.submit()
  }

  return (
    <Modal visible={visible} onCancel={onCancel} width={800} title='新增用户' onOk={onOK}>
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
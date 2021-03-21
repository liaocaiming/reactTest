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
      name: 'strategyName',
      label: '策略名称',
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
      name: 'strategyType',
      label: '策略类型',
      type: 'select',
      list: [
        {
          value: 'rf4',
          label: 'rf4'
        }
      ],
      rules: [
        {
          required: true,
          message: '请选择',
        }
      ],
      eleAttr: {
        placeholder: '请选择',
        style: {
          width
        }
      }
    },


    {
      name: 'tradingVolume',
      label: '交易量',
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
      name: 'upRate',
      label: '涨幅',
      afterDOM: <span className='margin_left_5'>%</span>,
      rules: [
        {
          required: true,
          message: '请输入',
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
      name: 'time',
      label: '时间周期',
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
      name: 'ema',
      label: 'ema',
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
    <Modal visible={visible} onCancel={onCancel} width={600} title='新增策略' onOk={onOK}>
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
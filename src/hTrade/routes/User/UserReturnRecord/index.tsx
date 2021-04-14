import React, { memo, useState, useEffect } from 'react';
import { message, Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'

import { IActions } from '@containers/index.d'

import api from '@src/hTrade/config/api';

import { TableComponent } from '@components/index'

import { AppForm } from '@components/index';

import { AppFormItemOptions } from '@components/AppForm/interface.d'
import { constants } from '@utils/index';


interface IProps extends ModalProps {
  detail: any; // 
  actions: IActions;
}

const rowData = [
  {
    title: '邀请人邮箱',
    dataIndex: 'email'
  },
  {
    title: '邀请人id',
    dataIndex: 'user_id'
  },
  {
    title: '被邀请者的邮箱',
    dataIndex: 'to_email'
  },
  {
    title: '被邀请者的id',
    dataIndex: 'binance_user_id'
  },

  {
    title: '佣金',
    dataIndex: 'commission'
  },
  {
    title: '佣金币种',
    dataIndex: 'asset'
  },
  {
    title: '佣金发放时间',
    dataIndex: 'commission_date'
  }
]


export default memo((props: IProps) => {
  const { visible, actions, onCancel, detail } = props;

  const [list, setList] = useState({});

  const [form, setForm] = useState({});

  const getList = (params = {}) => {
    console.log(api.invite_records, 'invite_records')
    actions.get(api.invite_records, { page: 1, user_id: detail.id, ...params }).then((res) => {
      setList(res)
    })
  }

  useEffect(() => {
    getList()
  }, [detail])

  const { count, data = [] } = list as any;

  const onSave = (params: any) => {
    actions.post(api.invite_records_update, params).then(() => {
      message.success('添加成功');
      getList({ page: 1 });
    })
  }

  const renderForm = () => {
    const width = 200
    const formItems: AppFormItemOptions[] = [
      {
        name: 'commission',
        label: '佣金',
        rules: [
          {
            required: true,
            message: '请输入'
          },
          {
            pattern: constants.pattern.positiveNumFloat,
            message: '请输入正数'
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
        name: 'asset',
        label: '佣金币种',
        rules: [
          {
            required: true,
            message: '请输入'
          },
          {
            pattern: constants.pattern.alphabetOrNumber,
            message: '请输入正确的币种'
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
        name: 'commission_date',
        label: '返佣时间',
        type: 'datePicker',
        rules: [
          {
            required: true,
            message: '请选择'
          },
        ],
        eleAttr: {
          placeholder: '请选择',
          showTime: true,
          style: {
            width
          }
        }
      }

    ]
    return <AppForm
      formItems={formItems}
      colSpan={2}
      submitButton={{ type: 'primary', text: '保存', style: { marginLeft: 50 } }}
      onFinish={onSave}
      labelCol={{ span: 6 }}
      onReady={(form) => {
        setForm(form)
      }}
    />
  }

  return (
    <Modal visible={visible} onCancel={onCancel} width={800} title='用户返佣详情' onOk={onCancel} destroyOnClose footer={null}>
      <div className='margin_bottom_20'>
        {renderForm()}
      </div>
      <TableComponent
        columns={rowData}
        dataSource={data}
        pagination={{
          total: count,
          // current: ,
          // pageSize: page.pageSize,
          pageSizeOptions: ["10", "20", "50", "100"],
          showQuickJumper: true,
          onChange: (pageNo: number, pageSize?: number) => {
            getList({ page: pageNo });
          },
          onShowSizeChange: (current: number, pageSize: number) => {

            getList({ page: 1, pageSize });
          },
        }}
      />
    </Modal>
  )
})
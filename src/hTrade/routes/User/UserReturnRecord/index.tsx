import React, { memo, useState, useEffect } from 'react';
import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'

import { IActions } from '@containers/index.d'

import api from '@src/hTrade/config/api';

import { TableComponent } from '@components/index'


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

  const [list, setList] = useState({})
  const getList = (params = {}) => {
    console.log(api.invite_records, 'invite_records')
    debugger
    actions.get(api.invite_records, { page: 1, user_id: detail.id, ...params }).then((res) => {
      setList(res)
    })
  }

  useEffect(() => {
    getList()
  }, [detail])

  const { count, data = [] } = list as any;

  return (
    <Modal visible={visible} onCancel={onCancel} width={600} title='用户操作记录' onOk={onCancel} destroyOnClose footer={null}>
      <TableComponent
        columns={rowData}
        dataSource={data}
        pagination={{
          total: count,
          onchange: (pageNo: number, pageSize) => {
            getList({
              page: pageNo,
              pageSize
            })
          }
        }}
      />
    </Modal>
  )
})
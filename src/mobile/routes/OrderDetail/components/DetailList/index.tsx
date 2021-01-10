import React from 'react';

import { Steps } from 'antd-mobile';

const { Step } = Steps;

import './index.less';

interface IProps {
  list: any[];

}
export default (props: IProps) => {
  const icon = (
    <span className='cir'></span>
  )

  const { list = [] } = props;

  const description = (item: any) => {
    const { remark, created_at } = item;

    return (
      <div className='description'>
        <div>{created_at}</div>
        <div>{remark}</div>
      </div>
    )
  }

  const title = (side: boolean) => {
    if (side) {
      return <span className='buy'>买</span>
    }
    return <span className='sale'>卖</span>
  }

  return (
    <div className='orderDetail-detailList'>
      <h1 className='title'>最新操作</h1>
      <Steps size="small">
        {
          list.map((item: any) => {
            const { side, id } = item;
            return <Step key={id} title={title(side)} description={description(item)} icon={icon} />
          })
        }
      </Steps>
    </div>
  )
}
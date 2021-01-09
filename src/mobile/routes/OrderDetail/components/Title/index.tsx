import { helpers } from '@utils/index';
import React from 'react';
import { constants, arrToObj } from '@utils/index'
import { Toggle } from "@shared/components";
import './index.less';
import { Detail } from '@src/mobile/components/index';
import { IRow } from '@src/mobile/components/Detail/interface';


const ORDER_TYPE_MAP: any = arrToObj(constants.ORDER_TYPE);

interface IProps {
  detail: any;
}

export default (props: IProps) => {
  const { detail = {} } = props;


  const renderTitle = (detail: any) => {
    const {
      side,
      symbol,
      leverage,
      order_type = 3,
    } = detail;

    return (
      <div className='orderDetail-symbol'>
        <span
          className={helpers.reactClassNameJoin([
            "margin_right_5 direction",
            "direction",
            side ? "buy" : "sale",
          ])}
        >
          <span>{side ? "买" : "卖"}</span>
          <Toggle isShow={leverage}>
            <span>{leverage}倍</span>
          </Toggle>
        </span>
        <span className="icon">{symbol}</span>
        <span className='margin_right_5 orderType'>{ORDER_TYPE_MAP[order_type]}</span>
        {/* <span className='status'><span className='text'>平</span></span> */}
        <span className='status'><span className='hold text'>持</span></span>
      </div>

    )
  }

  const renderEndTotal = (detail: any) => {
    const rowData: IRow[] = [
      {
        label: '总收益',
        name: 'profit_loss',
        afterDOM: 'usdt'
      },
      {
        label: '持仓量',
        name: 'quantity',
        afterDOM: '张'
      },
      {
        label: '保证金',
        name: 'quantity',
        afterDOM: 'usdt'
      }
    ]


    return (
      <div className='end-total'>
        <Detail detail={detail} rowData={rowData} />
      </div>
    )
  }

  const renderHoldingTotal = (detail: any) => {
    return (
      <div>renderHoldingTotal</div>
    )
  }


  const renderList = (data: any[]) => {

  }

  return (
    <div className="orderDetail-detail">
      {renderTitle(detail)}
      {renderEndTotal(detail)}
    </div>
  )
}
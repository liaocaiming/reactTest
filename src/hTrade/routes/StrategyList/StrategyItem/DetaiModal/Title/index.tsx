import { helpers } from '@utils/index';
import React from 'react';
import { constants, arrToObj } from '@utils/index'
import { Toggle } from "@shared/components";
import './index.less';


const ORDER_TYPE_MAP: any = arrToObj(constants.ORDER_TYPE);

interface IProps {
  detail: any;
}

const formatDetail = (detail: any) => {
  const { dist_profit_rate, dist, entry: entry_price } = detail;
  const dist_profit_rate_arr = dist_profit_rate && dist_profit_rate.split(',') || [];
  const dist_arr = dist && dist.split(',') || [];
  const entry = entry_price && entry_price.replace(',', '-');
  const profit_arr = Array.isArray(dist_arr) && dist_arr.map((value: string, index: any) => {
    return `${value} (${dist_profit_rate_arr[index]})`
  })
  return { ...detail, entry, profit_arr }
}

export default (props: IProps) => {
  const { detail = {} } = props;

  const obj = formatDetail(detail) || {};

  const { profit_arr, entry, set_type, signal_type, loss, symbol } = obj;

  return (
    <div className="strategyItem-title">
      <div className='title'>
        <div>{signal_type}{ORDER_TYPE_MAP[set_type]}</div>
        <h3>{symbol}</h3>
        {/* <p>利润空间: 50% - 60%</p> */}
      </div>

      <div className='open-space margin_bottom_30'><span className='margin_right_10'>挂单区间</span><span>{entry}</span></div>
      <div className='target'>
        {
          profit_arr.map((value: string, index: number) => {
            return <p>第{index + 1}目标 <span>{value}</span></p>
          })
        }
        {/* <p>第1目标 <span>0.008</span><span>(5%)</span></p>
        <p>第2目标 <span>0.008</span><span>(5%)</span></p>
        <p>第3目标 <span>0.008</span><span>(5%)</span></p>
        <p>第4目标 <span>0.008</span><span>(5%)</span></p> */}
      </div>
      <div className='los'>
        <p>止损点位: {loss}</p>
      </div>
    </div>
  )
}
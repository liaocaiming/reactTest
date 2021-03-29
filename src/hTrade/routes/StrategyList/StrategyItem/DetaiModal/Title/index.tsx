import { helpers } from '@utils/index';
import React from 'react';
import { constants, arrToObj } from '@utils/index'
import { Toggle } from "@shared/components";
import './index.less';


const ORDER_TYPE_MAP: any = arrToObj(constants.ORDER_TYPE);

interface IProps {
  detail: any;
}

export default (props: IProps) => {
  const { detail = {} } = props;

  return (
    <div className="strategyItem-title">
      <div className='title'>
        <div>H-A201币安现货</div>
        <h3>NPXUSDT</h3>
        <p>利润空间: 50% - 60%</p>
      </div>

      <div className='open-space'><span>挂单区间</span><span>0.005-0.007</span></div>
      <div className='target'>
        <p>第1目标 <span>0.008</span><span>(5%)</span></p>
        <p>第2目标 <span>0.008</span><span>(5%)</span></p>
        <p>第3目标 <span>0.008</span><span>(5%)</span></p>
        <p>第4目标 <span>0.008</span><span>(5%)</span></p>
      </div>
      <div className='los'>
        <p>止损点位: 0.004</p>
      </div>
    </div>
  )
}
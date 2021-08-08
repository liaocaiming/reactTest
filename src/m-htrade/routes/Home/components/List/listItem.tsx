import React, { memo } from 'react';
import { Toggle } from '@components/index';
import './listItem.less';
import starWhite from './images/icon-star-white.png'
import statusImgYes from './images/icon-cir-yes.png';
import statusImgNo from './images/icon-cir-no.png';
import { formatDetail, orderStatus, getLabel } from './utils';

interface Props {
  item: any
}

const rowData = [
  {
    title: '序号',
    dataIndex: 'index'
  },
  {
    title: '目标价位',
    dataIndex: 'target'
  },
  {
    title: '盈利率',
    dataIndex: 'pross'
  },
  {
    title: '触发耗时',
    dataIndex: 'time'
  },
  {
    title: '状态',
    dataIndex: 'status'
  }
]

const renderTable = (data: any) => {
  const { dist_profit_rate_arr = [], dist_arr = [], dist_time_arr = [], dist_index } = data || {}
  return (
    <div className='table'>
      <div className="th flex row">
        {
          rowData.map((item, index) => {
            return <div className={`td td-${index} `} key={item.dataIndex}>{item.title}</div>
          })
        }
      </div>

      {
        dist_arr.map((item, index) => {
          const img = dist_index >= index ? statusImgYes : statusImgNo;

          return (
            <div key={`${index}`} className="tr flex row" >
              <p><span className='sort td-0'>{index + 1}</span></p>
              <p className='td-1'> {item}</p>
              <p className='td-2'>{dist_profit_rate_arr[index]}</p>
              <p className='td-3'>{dist_time_arr[index]}</p>
              <p className='status td-4'><img className='status-img' src={img} /></p>
            </div>
          )
        })
      }

    </div>
  )
}


export default memo((props: Props) => {
  const item = formatDetail(props.item || {});
  const { leverage, created_at, updated_at, symbol, signal_type, p_type, dist, spend_time, loss, entry, dist_profit_rate_arr } = item;
  const statusLabel = getLabel(orderStatus, p_type);
  return (
    <section className='home-list-item'>
      <section className='symbol-container'>
        <div className="img"><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201109%2F24%2F142408pbzsivq493j4ssjq.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630944622&t=9d54b80235678e770e7e675de1a5a31a" /></div>

        <div className='icon'>
          <div className='icon-name'>{symbol}</div>
          <div className="s_type"><Toggle isShow={leverage > 1}><span>合约</span></Toggle> {signal_type}</div>
        </div>

        <div className="time">
          <div className="star">
            <img src={starWhite} />
          </div>
          <div className="stime">开始时间：{created_at}</div>
          <div className="update-time">最近更新：{updated_at}</div>
        </div>
      </section>

      <section className="list-item">
        <Toggle isShow={leverage > 1}>
          <p className="mul list-item-label"><span className="label">方向/倍数：</span><span className="value leverage">做多/{leverage}倍</span></p>
        </Toggle>
        <p className="mul list-item-label"><span className="label">挂单区间：</span><span className='value'>{entry}</span></p>
        <p className="mul list-item-label"><span className="label">利润空间：</span><span className='value'>{dist_profit_rate_arr[0]} ~ {dist_profit_rate_arr[dist_profit_rate_arr.length - 1]}</span></p>
        <p className="mul list-item-label"><span className="label">止损点数：</span><span className='value'>{loss}</span><span>（{statusLabel}）</span></p>
      </section>

      <section className="table ">
        <div className="table-success">
          {renderTable(item)}
        </div>
      </section>
    </section>
  )
})
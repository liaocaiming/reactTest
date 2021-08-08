import React, { memo } from 'react';
import './listItem.less';
import starWhite from './images/icon-star-white.png'
import statusImgYes from './images/icon-cir-yes.png';
import statusImgNo from './images/icon-cir-no.png';

interface Props {
  item: any
}

const rowData = [
  {
    title: '',
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

const renderTable = (data: any[]) => {
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
        data.map((item, index) => {
          return (
            <p className="tr flex row">
             <div><span className='sort'>{index+1}</span></div>
             <div>7,6</div>
             <div>+38.8%</div>
             <div>8时23分</div>
             <div className='status'><img className='status-img' src={statusImgYes} /></div>
            </p>
          )
        })
      }

    </div>
  )
}


export default memo((props: Props) => {
  return (
    <section className='home-list-item'>
      <section className='symbol-container'>
        <div className="img"><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201109%2F24%2F142408pbzsivq493j4ssjq.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630944622&t=9d54b80235678e770e7e675de1a5a31a" /></div>

        <div className='icon'>
          <div className='icon-name'>BCT/USDT</div>
          <div className="s_type">币安合约 B104</div>
        </div>

        <div className="time">
          <div className="star">
            <img src={starWhite} />
          </div>
          <div className="stime">开始时间：2021/04/12</div>
          <div className="update-time">最近更新：2021/04/12</div>
        </div>
      </section>

      <section className="list-item">
        <p className="mul list-item-label"><span className="label">方向/倍数：</span><span className="value">做多/5倍</span></p>
        <p className="mul list-item-label"><span className="label">挂单区间：</span><span className='value'>7,431.54 ~ 7,431.53</span></p>
        <p className="mul list-item-label"><span className="label">利润空间：</span><span className='value'>12.8%~13.8%</span></p>
        <p className="mul list-item-label"><span className="label">止损点数：</span><span className='value'>12,862.36</span></p>
      </section>

      <section className="table ">
        <div className="table-success">
          {renderTable([{}, {}, {}, {}])}
        </div>
      </section>
    </section>
  )
})
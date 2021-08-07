import React, { memo } from 'react';
import './listItem.less';
import starWhite from './images/icon-star-white.png'

interface Props {
  item: any
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

      <section className="table">

      </section>
    </section>
  )
})
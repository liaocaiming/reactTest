import React, { memo } from 'react';
import './index.less';

interface Props {
  onChange?: (values: any) => void;
  
}


export default memo((props: Props) => {
  return (
    <div className='m-search'>
      <div className="left btn"><span className="text">全部信号</span></div>
      <div className="right btn"><span className="text">全部周期</span></div>
    </div>
  )
})
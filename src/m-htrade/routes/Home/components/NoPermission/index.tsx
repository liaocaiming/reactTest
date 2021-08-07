import React, { memo } from 'react';
import './index.less';
import noPermission from './icon-no-permission.png';

export default memo(() => {

  return (
    <div className='m-no-permission'>
      <img src={noPermission} className='img'/>
      <div className='text'>暂无权限，您可以：</div>
      <div className="btn">开通会员</div>
    </div>
  )
})
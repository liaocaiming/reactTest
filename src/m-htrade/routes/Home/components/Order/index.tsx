import React, { memo, useState, useCallback } from 'react';

import Drawer from '@components/Drawer';

import './index.less';

interface OrderProps {
  visibility: boolean
  onClose?: () => void;
  detail: any;
}

export default memo((props: OrderProps) => {
  const { visibility, onClose, detail } = props;
  const onDrawerClose = useCallback(
    () => {
      console.log(detail, 'detail');
      console.log(visibility);

      onClose && onClose();
    },
    [visibility],
  )


  return (
    <Drawer visibility={visibility} onClose={onDrawerClose}>
      <div>ffff</div>
    </Drawer>
  )
})
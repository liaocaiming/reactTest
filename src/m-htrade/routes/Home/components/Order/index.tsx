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
      onClose && onClose();
    },
    [],
  )


  return (
    <section className='order-component'>
      <Drawer visibility={visibility || true} onClose={onDrawerClose}>
        <div>ffff</div>
      </Drawer>
    </section>
  )
})
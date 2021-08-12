import React, { memo, useState, useEffect } from 'react';

import { Drawer } from 'antd-mobile';

import { DrawerWebProps } from 'antd-mobile/lib/drawer/PropsType.d';

import './index.less';

interface Props {
  drawerWebProps?: DrawerWebProps
}

export default memo((props: Props) => {
  const { drawerWebProps } = props;
  return (
    <section className="m-drawer">
      <Drawer
        sidebar={(
          <div>hahah</div>
        )}
        {...drawerWebProps}
      />
    </section>
  )
})
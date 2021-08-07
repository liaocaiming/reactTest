import React, { memo, useState, useCallback } from 'react';
import { Tabs, Search, NoPermission, List } from './components'
import { tabs } from './constants';
import header from './images/icon-header.png';
import './index.less';

type Tab = '1' | '2' | '3' | '4';

export default memo(() => {
  const [tab, setTab] = useState<Tab>('1');

  const tabOnchange = useCallback(
    (item) => {
      setTab(item.name)
    },
    [tab],
  )


  return (
    <section className='m-home'>
      <div className='head'>
        <img src={header} className='icon' />
      </div>
      <section className='tabs'>
        <Tabs
          list={tabs}
          activeKey={tab}
          onChange={tabOnchange}
        />
      </section>

      <section className="search">
        <Search />
      </section>

      <section className='home-list'>
        <List list={[{}, {}]}></List>
      </section>

      {/* <section className='no-permisssion'>
        <NoPermission />
      </section> */}

    </section>
  )
})
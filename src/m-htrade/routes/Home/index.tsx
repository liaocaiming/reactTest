import React, { memo, useState, useCallback, useEffect } from 'react';
import { Tabs, Search, NoPermission, List } from './components'
import { tabs } from './constants';
import header from './images/icon-header.png';
import { fetch } from '@utils/index';
import './index.less';
import { api } from '@src/m-htrade/config';

type Tab = '1' | '2' | '3' | '4';

export default memo(() => {
  const [tab, setTab] = useState<Tab>('1');
  const [list, setList] = useState([]);


  const tabOnchange = useCallback(
    (item) => {
      setTab(item.name)
    },
    [tab],
  )

  const getList = useCallback(() => {
    fetch.get(api.push_records).then((res) => {
      setList(res.data || [])
    })
  }, [])

  useEffect(() => {
    getList()
  }, [])

  return (
    <section className='m-home'>
      <section className='header-fixed'>
        
        <section className='head'>
          <img src={header} className='icon' />
        </section>

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

      </section>

      <section className='home-list'>
        <List list={list}></List>
      </section>
      {/* <section className='no-permisssion'>
        <NoPermission />
      </section> */}

    </section>
  )
})
import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import { Tabs, Search, NoPermission, List, Drawer } from './components'
import { tabs } from './constants';
import header from './images/icon-header.png';
import { fetch } from '@utils/index';
import './index.less';
import { api } from '@src/m-htrade/config';
import { PullToRefresh, Toast } from 'antd-mobile';

type Tab = '1' | '2' | '3' | '4';

const height = document.body.clientHeight;

console.log(height, 'height');


export default memo(() => {
  const [tab, setTab] = useState<Tab>('1');
  const [list, setList] = useState<any[]>([]);
  const ref = useRef(null);
  const [showDrawer, setShowDrawer] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false);
  let [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [searchparams, setSearchparams] = useState({})

  const tabOnchange = useCallback(
    (item) => {
      setTab(item.name)
    },
    [tab],
  )

  const getList = useCallback((params: any, showLoading: boolean = true) => {
    if (count > 0 && count <= list.length) {
      refreshing && setRefreshing(false);
      return;
    }
    fetch.get(api.push_records, { pageSize: 10, page, ...params, ...searchparams }, { showLoading }).then((res) => {
      if (count !== res.count && res.count) {
        setCount(res.count)
      }
      const data: any[] = res.data || []
      setList([...list, ...data])
      setRefreshing(false);
    })
  }, [page, refreshing, searchparams])

  const onSearch = useCallback((values: any) => {
    setSearchparams(values);
    setPage(1);
    getList({
      ...values
    })
  }, [page, refreshing, searchparams])

  useEffect(() => {
    getList({
      page: 1
    })
  }, [])

  const toggle = useCallback(() => {
    setShowDrawer(showDrawer ? false : true)
  }, [showDrawer])


  return (
    <section className='m-home'>
      <section className='header-fixed'>

        <section className='head'>
          <img src={header} className='icon' onClick={toggle} />
        </section>

        <section className='tabs'>
          <Tabs
            list={tabs}
            activeKey={tab}
            onChange={tabOnchange}
          />
        </section>

        <section className="search">
          <Search
            onChange={onSearch}
          />
        </section>

      </section>


      <section className='home-list-container' >
        {/* <List list={list}></List> */}
        <PullToRefresh
          ref={ref}
          direction='up'
          refreshing={refreshing}
          indicator={{ deactivate: '下拉加载更多' }}
          distanceToRefresh={80}
          getScrollContainer={() => {
            return document.body
          }}
          style={{
            overflow: 'auto',
            height: height
          }}
          onRefresh={() => {
            let pageNo = page + 1
            setPage(pageNo);
            setRefreshing(true);
            getList({
              page: pageNo
            }, false)
          }}
          damping={100}
        >
          <List list={list}></List>
        </PullToRefresh>

      </section>
      {/* <section className='home-list'>
        <List list={list}></List>
      </section> */}
      {/* <section className='no-permisssion'>
        <NoPermission />
      </section> */}

      <section>
        <Drawer drawerWebProps={{ open: showDrawer, onOpenChange: toggle }}></Drawer>
      </section>
    </section>
  )
})
import React, { memo } from 'react';

import ListItem from './listItem';

import './index.less';

import useSystemInfo from '@src/m-htrade/hooks/useSystemInfo';

interface Props {
  list: any[];
  onSuccess?: (item: any) => void;
}

export default memo((props: Props) => {
  const { list, onSuccess } = props;
  const [system] = useSystemInfo();
  
  return (
    <section className="home-list" id='scroll'>
      {
        list.map((item, index) => {
          return (
            <div className='item' key={item.id || index}>
              <ListItem item={{ ...item, index }} onSuccess={onSuccess} host={system?.host?.value}/>
            </div>
          )
        })
      }
    </section>
  )
})